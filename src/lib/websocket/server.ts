import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { prisma } from '@/lib/prisma';

export interface ServerToClientEvents {
  // HYPE events
  hypeUpdate: (data: {
    userId: string;
    amount: number;
    totalHype: number;
    event: string;
  }) => void;
  
  // Live activity feed
  liveActivity: (data: {
    id: string;
    type: string;
    message: string;
    userId: string;
    userName: string;
    schoolName?: string;
    timestamp: Date;
    metadata?: any;
  }) => void;
  
  // Chat messages
  chatMessage: (data: {
    id: string;
    roomId: string;
    userId: string;
    userName: string;
    message: string;
    timestamp: Date;
  }) => void;
  
  // Game/Event updates
  gameUpdate: (data: {
    eventId: string;
    type: 'score' | 'quarter' | 'highlight' | 'final';
    homeScore?: number;
    awayScore?: number;
    quarter?: string;
    message?: string;
  }) => void;
  
  // System notifications
  notification: (data: {
    id: string;
    type: string;
    title: string;
    message: string;
    link?: string;
  }) => void;
}

export interface ClientToServerEvents {
  // Join rooms
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  
  // Chat
  sendMessage: (data: {
    roomId: string;
    message: string;
  }) => void;
  
  // HYPE reactions
  sendHype: (data: {
    targetUserId: string;
    amount: number;
  }) => void;
  
  // Live reactions
  sendReaction: (data: {
    eventId: string;
    reaction: string;
  }) => void;
  
  // Status updates
  updateStatus: (status: 'online' | 'away' | 'offline') => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userId: string;
  userName: string;
  userRole: string;
  schoolId?: string;
}

let io: SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export function initializeWebSocket(httpServer: HTTPServer) {
  io = new SocketIOServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? process.env.NEXTAUTH_URL 
        : 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('🔌 New WebSocket connection:', socket.id);

    // Handle room joining
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
      console.log(`Socket ${socket.id} left room ${roomId}`);
    });

    // Handle chat messages
    socket.on('sendMessage', async ({ roomId, message }) => {
      const messageData = {
        id: `msg_${Date.now()}`,
        roomId,
        userId: socket.data.userId || 'anonymous',
        userName: socket.data.userName || 'Anonymous',
        message,
        timestamp: new Date(),
      };

      // Broadcast to room
      io.to(roomId).emit('chatMessage', messageData);

      // Store in database (optional)
      // await prisma.chatMessage.create({ data: messageData });
    });

    // Handle HYPE sending
    socket.on('sendHype', async ({ targetUserId, amount }) => {
      try {
        // Here you would integrate with your HYPE economy system
        // For now, just broadcast the update
        io.emit('hypeUpdate', {
          userId: targetUserId,
          amount,
          totalHype: 0, // Would be calculated from database
          event: `Received ${amount} HYPE from ${socket.data.userName}`,
        });
      } catch (error) {
        console.error('Error sending HYPE:', error);
      }
    });

    // Handle reactions
    socket.on('sendReaction', ({ eventId, reaction }) => {
      io.to(`event_${eventId}`).emit('liveActivity', {
        id: `reaction_${Date.now()}`,
        type: 'reaction',
        message: `${socket.data.userName} reacted with ${reaction}`,
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
        message: `${socket.data.userName} is now ${status}`,
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

  return io;
}

// Helper functions to emit events from other parts of the application
export function emitHypeUpdate(update: {
  userId: string;
  amount: number;
  totalHype: number;
  type: string;
  description: string;
}) {
  if (io) {
    io.emit('hypeUpdate', update);
    
    // Also emit to user's room for targeted updates
    io.to(`user_${update.userId}`).emit('personalHypeUpdate', update);
  }
}

export function emitLiveActivity(activity: {
  type: string;
  message: string;
  userId: string;
  userName: string;
  schoolName?: string;
  metadata?: any;
}) {
  if (io) {
    io.emit('liveActivity', {
      id: `activity_${Date.now()}`,
      ...activity,
      timestamp: new Date(),
    });
  }
}

export function emitGameUpdate(eventId: string, update: any) {
  if (io) {
    io.to(`event_${eventId}`).emit('gameUpdate', {
      eventId,
      ...update,
    });
  }
}

export function emitNotification(userId: string, notification: {
  type: string;
  title: string;
  message: string;
  link?: string;
}) {
  if (io) {
    io.to(`user_${userId}`).emit('notification', {
      id: `notif_${Date.now()}`,
      ...notification,
    });
  }
}

export function getIO() {
  return io;
}