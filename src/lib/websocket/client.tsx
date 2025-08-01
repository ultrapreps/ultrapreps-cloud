'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import type { ServerToClientEvents, ClientToServerEvents } from './server';

interface WebSocketContextValue {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  isConnected: boolean;
  
  // Methods
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendMessage: (roomId: string, message: string) => void;
  sendHype: (targetUserId: string, amount: number) => void;
  sendReaction: (eventId: string, reaction: string) => void;
  updateStatus: (status: 'online' | 'away' | 'offline') => void;
  
  // Event listeners
  onHypeUpdate: (callback: (data: any) => void) => () => void;
  onLiveActivity: (callback: (data: any) => void) => () => void;
  onChatMessage: (callback: (data: any) => void) => () => void;
  onGameUpdate: (callback: (data: any) => void) => () => void;
  onNotification: (callback: (data: any) => void) => () => void;
}

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!session?.user) return;

    // Initialize socket connection
    const socketInstance = io(
      process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:3001',
      {
        auth: {
          userId: session.user.id,
          userName: session.user.name,
          userRole: session.user.role,
          schoolId: session.user.schoolId,
        },
        transports: ['websocket', 'polling'],
      }
    );

    socketInstance.on('connect', () => {
      console.log('🔌 WebSocket connected');
      setIsConnected(true);
      
      // Join user's personal room
      socketInstance.emit('joinRoom', `user_${session.user.id}`);
      
      // Join school room if applicable
      if (session.user.schoolId) {
        socketInstance.emit('joinRoom', `school_${session.user.schoolId}`);
      }
    });

    socketInstance.on('disconnect', () => {
      console.log('🔌 WebSocket disconnected');
      setIsConnected(false);
    });

    setSocket(socketInstance);

    // Cleanup
    return () => {
      socketInstance.disconnect();
    };
  }, [session]);

  // Room management
  const joinRoom = useCallback((roomId: string) => {
    socket?.emit('joinRoom', roomId);
  }, [socket]);

  const leaveRoom = useCallback((roomId: string) => {
    socket?.emit('leaveRoom', roomId);
  }, [socket]);

  // Actions
  const sendMessage = useCallback((roomId: string, message: string) => {
    socket?.emit('sendMessage', { roomId, message });
  }, [socket]);

  const sendHype = useCallback((targetUserId: string, amount: number) => {
    socket?.emit('sendHype', { targetUserId, amount });
  }, [socket]);

  const sendReaction = useCallback((eventId: string, reaction: string) => {
    socket?.emit('sendReaction', { eventId, reaction });
  }, [socket]);

  const updateStatus = useCallback((status: 'online' | 'away' | 'offline') => {
    socket?.emit('updateStatus', status);
  }, [socket]);

  // Event listeners with cleanup
  const onHypeUpdate = useCallback((callback: (data: any) => void) => {
    if (!socket) return () => {};
    
    socket.on('hypeUpdate', callback);
    return () => {
      socket.off('hypeUpdate', callback);
    };
  }, [socket]);

  const onLiveActivity = useCallback((callback: (data: any) => void) => {
    if (!socket) return () => {};
    
    socket.on('liveActivity', callback);
    return () => {
      socket.off('liveActivity', callback);
    };
  }, [socket]);

  const onChatMessage = useCallback((callback: (data: any) => void) => {
    if (!socket) return () => {};
    
    socket.on('chatMessage', callback);
    return () => {
      socket.off('chatMessage', callback);
    };
  }, [socket]);

  const onGameUpdate = useCallback((callback: (data: any) => void) => {
    if (!socket) return () => {};
    
    socket.on('gameUpdate', callback);
    return () => {
      socket.off('gameUpdate', callback);
    };
  }, [socket]);

  const onNotification = useCallback((callback: (data: any) => void) => {
    if (!socket) return () => {};
    
    socket.on('notification', callback);
    return () => {
      socket.off('notification', callback);
    };
  }, [socket]);

  const value: WebSocketContextValue = {
    socket,
    isConnected,
    joinRoom,
    leaveRoom,
    sendMessage,
    sendHype,
    sendReaction,
    updateStatus,
    onHypeUpdate,
    onLiveActivity,
    onChatMessage,
    onGameUpdate,
    onNotification,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within WebSocketProvider');
  }
  return context;
}

// Custom hooks for specific features
export function useLiveActivities() {
  const { onLiveActivity } = useWebSocket();
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const cleanup = onLiveActivity((activity) => {
      setActivities((prev) => [activity, ...prev].slice(0, 50)); // Keep last 50
    });

    return cleanup;
  }, [onLiveActivity]);

  return activities;
}

export function useHypeUpdates(userId?: string) {
  const { onHypeUpdate } = useWebSocket();
  const [hypeUpdates, setHypeUpdates] = useState<any[]>([]);

  useEffect(() => {
    const cleanup = onHypeUpdate((update) => {
      if (!userId || update.userId === userId) {
        setHypeUpdates((prev) => [update, ...prev].slice(0, 20)); // Keep last 20
      }
    });

    return cleanup;
  }, [onHypeUpdate, userId]);

  return hypeUpdates;
}

export function useChatRoom(roomId: string) {
  const { joinRoom, leaveRoom, sendMessage, onChatMessage } = useWebSocket();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // Join room
    joinRoom(roomId);

    // Listen for messages
    const cleanup = onChatMessage((message) => {
      if (message.roomId === roomId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    // Cleanup
    return () => {
      leaveRoom(roomId);
      cleanup();
    };
  }, [roomId, joinRoom, leaveRoom, onChatMessage]);

  return {
    messages,
    sendMessage: (message: string) => sendMessage(roomId, message),
  };
}

export function useGameUpdates(eventId: string) {
  const { joinRoom, leaveRoom, onGameUpdate } = useWebSocket();
  const [updates, setUpdates] = useState<any[]>([]);
  const [currentState, setCurrentState] = useState<any>({});

  useEffect(() => {
    const room = `event_${eventId}`;
    
    // Join event room
    joinRoom(room);

    // Listen for updates
    const cleanup = onGameUpdate((update) => {
      if (update.eventId === eventId) {
        setUpdates((prev) => [...prev, update]);
        
        // Update current state
        setCurrentState((prev: any) => ({
          ...prev,
          homeScore: update.homeScore ?? prev.homeScore,
          awayScore: update.awayScore ?? prev.awayScore,
          quarter: update.quarter ?? prev.quarter,
        }));
      }
    });

    // Cleanup
    return () => {
      leaveRoom(room);
      cleanup();
    };
  }, [eventId, joinRoom, leaveRoom, onGameUpdate]);

  return {
    updates,
    currentState,
  };
}