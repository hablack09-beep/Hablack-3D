import { useState, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
}

export interface FigureRequest {
  id: string;
  userId: string;
  userName: string;
  email: string;
  description: string;
  fileName: string | null;
  fileData?: string | null;
  status: 'pending' | 'budgeted' | 'completed';
  date: number;
  messages: ChatMessage[];
}

const STORAGE_KEY = 'hablack_requests';

export function useRequests() {
  const [requests, setRequests] = useState<FigureRequest[]>([]);

  const loadRequests = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRequests(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse requests from local storage");
      }
    }
  };

  useEffect(() => {
    loadRequests();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        loadRequests();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    const handleCustomChange = () => loadRequests();
    window.addEventListener('requests_updated', handleCustomChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('requests_updated', handleCustomChange);
    };
  }, []);

  const saveRequests = (newRequests: FigureRequest[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRequests));
    setRequests(newRequests);
    window.dispatchEvent(new Event('requests_updated'));
  };

  const addRequest = (request: Omit<FigureRequest, 'id' | 'date' | 'status' | 'messages'>) => {
    const newRequest: FigureRequest = {
      ...request,
      id: Math.random().toString(36).substring(2, 9),
      date: Date.now(),
      status: 'pending',
      messages: []
    };
    saveRequests([newRequest, ...requests]);
    return newRequest;
  };

  const addMessage = (requestId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const updatedRequests = requests.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          messages: [
            ...req.messages,
            {
              ...message,
              id: Math.random().toString(36).substring(2, 9),
              timestamp: Date.now()
            }
          ]
        };
      }
      return req;
    });
    saveRequests(updatedRequests);
  };

  const updateStatus = (requestId: string, status: FigureRequest['status']) => {
    const updatedRequests = requests.map(req => 
      req.id === requestId ? { ...req, status } : req
    );
    saveRequests(updatedRequests);
  };

  return {
    requests,
    addRequest,
    addMessage,
    updateStatus
  };
}
