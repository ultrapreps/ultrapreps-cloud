const { createServer } = require('http');
const { Server } = require('socket.io');

const port = process.env.SOCKET_PORT || 3001;

// Create HTTP server
const httpServer = createServer();

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.NEXTAUTH_URL 
      : ['http://localhost:3000', 'http://localhost:3002'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('🔌 New WebSocket connection:', socket.id);

  // Extract user data from auth
  const { userId, userName, userRole, schoolId } = socket.handshake.auth;
  socket.data = { userId, userName, userRole, schoolId };

  // Handle room joining
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
    
    // Notify room members
    socket.to(roomId).emit('liveActivity', {
      id: `join_${Date.now()}`,
      type: 'user_joined',
      message: `${socket.data.userName || 'Someone'} joined the room`,
      userId: socket.data.userId || 'anonymous',
      userName: socket.data.userName || 'Anonymous',
      timestamp: new Date(),
    });
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  });

  // Handle chat messages
  socket.on('sendMessage', ({ roomId, message }) => {
    const messageData = {
      id: `msg_${Date.now()}`,
      roomId,
      userId: socket.data.userId || 'anonymous',
      userName: socket.data.userName || 'Anonymous',
      message,
      timestamp: new Date(),
    };

    // Broadcast to room including sender
    io.to(roomId).emit('chatMessage', messageData);
  });

  // Handle HYPE sending
  socket.on('sendHype', ({ targetUserId, amount }) => {
    // Broadcast HYPE update to all connected clients
    io.emit('hypeUpdate', {
      userId: targetUserId,
      amount,
      totalHype: 0, // Would be calculated from database
      event: `Received ${amount} HYPE from ${socket.data.userName || 'Someone'}`,
      fromUser: socket.data.userName,
      timestamp: new Date(),
    });

    // Also send as live activity
    io.emit('liveActivity', {
      id: `hype_${Date.now()}`,
      type: 'hype_sent',
      message: `${socket.data.userName || 'Someone'} sent ${amount} HYPE!`,
      userId: socket.data.userId || 'anonymous',
      userName: socket.data.userName || 'Anonymous',
      timestamp: new Date(),
      metadata: { amount, targetUserId },
    });
  });

  // Handle reactions
  socket.on('sendReaction', ({ eventId, reaction }) => {
    io.to(`event_${eventId}`).emit('liveActivity', {
      id: `reaction_${Date.now()}`,
      type: 'reaction',
      message: `${socket.data.userName || 'Someone'} reacted with ${reaction}`,
      userId: socket.data.userId || 'anonymous',
      userName: socket.data.userName || 'Anonymous',
      timestamp: new Date(),
      metadata: { eventId, reaction },
    });
  });

  // Handle status updates
  socket.on('updateStatus', (status) => {
    socket.broadcast.emit('liveActivity', {
      id: `status_${Date.now()}`,
      type: 'status',
      message: `${socket.data.userName || 'Someone'} is now ${status}`,
      userId: socket.data.userId || 'anonymous',
      userName: socket.data.userName || 'Anonymous',
      timestamp: new Date(),
      metadata: { status },
    });
  });

  socket.on('disconnect', () => {
    console.log('🔌 WebSocket disconnected:', socket.id);
  });
});

// Start the server
httpServer.listen(port, () => {
  console.log(`🔌 WebSocket server running on port ${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  httpServer.close(() => {
    console.log('HTTP server closed');
  });
});