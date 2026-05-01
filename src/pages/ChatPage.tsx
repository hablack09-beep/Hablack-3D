import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Send, User as UserIcon, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRequests, FigureRequest, ChatMessage } from '../hooks/useRequests';

export default function ChatPage() {
  const { user } = useAuth();
  const { requests, addMessage } = useRequests();
  const [selectedRequest, setSelectedRequest] = useState<FigureRequest | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter requests to only show the curren user's ones
  const userRequests = requests.filter(req => req.userId === (user?.uid || 'anonymous'));

  useEffect(() => {
    // If we have selected a request, keep it up to date
    if (selectedRequest) {
      const updated = requests.find(r => r.id === selectedRequest.id);
      if (updated) setSelectedRequest(updated);
    } else if (userRequests.length > 0) {
      // Auto select the first request if none is selected
      setSelectedRequest(userRequests[0]);
    }
  }, [requests, selectedRequest, userRequests.length]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedRequest?.messages]);

  if (!user && userRequests.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 font-heading">Cap Xat Encara</h2>
          <p className="text-gray-500 mt-2">Dona d'alta una petició i apareixerà aquí.</p>
        </div>
      </div>
    );
  }

  if (userRequests.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 font-heading">Encara no has demanat cap figura</h2>
          <p className="text-gray-500 mt-2">Fes una petició des de l'apartat Demanar Figura.</p>
        </div>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedRequest) return;
    
    addMessage(selectedRequest.id, {
      senderId: user?.uid || 'anonymous',
      senderName: user?.displayName || 'Usuari',
      text: newMessage.trim(),
    });
    setNewMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto py-8 lg:py-12 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-gray-900">Els Meus Xats</h1>
        <p className="text-gray-600">Parla amb mi sobre la teva petició.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row h-[600px]">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/50">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold font-heading text-gray-900">Les teves peticions</h3>
          </div>
          <div className="overflow-y-auto flex-1">
            {userRequests.map((req) => (
              <button
                key={req.id}
                onClick={() => setSelectedRequest(req)}
                className={`w-full text-left p-4 border-b border-gray-50 transition-colors ${selectedRequest?.id === req.id ? 'bg-white border-l-4 border-l-primary-500' : 'hover:bg-white'}`}
              >
                <div className="font-medium text-gray-900 mb-1 line-clamp-1">{req.description}</div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">{new Date(req.date).toLocaleDateString()}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    req.status === 'budgeted' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {req.status === 'pending' ? 'Pendent' : req.status === 'budgeted' ? 'Pressupostat' : 'Completat'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-full md:w-2/3 flex flex-col h-full bg-white">
          {selectedRequest ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 shadow-sm">
                <div className="flex gap-4 items-center">
                  {selectedRequest.fileData && (
                    <img src={selectedRequest.fileData} alt="Ref" className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0" />
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900">Xat associat a la petició</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{selectedRequest.description}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50/30 flex flex-col gap-4">
                {selectedRequest.messages.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                    No hi ha missatges encara. Comença la conversa!
                  </div>
                ) : (
                  selectedRequest.messages.map((msg) => {
                    const isAdmin = msg.senderId === 'admin_id'; // We will define admin ID for admin replies
                    const isMe = msg.senderId === (user?.uid || 'anonymous');
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${isMe ? 'bg-primary-600 text-white rounded-br-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm'}`}>
                          <div className={`text-xs mb-1 font-medium ${isMe ? 'text-primary-100' : 'text-gray-500'}`}>
                            {isMe ? 'Tu' : msg.senderName}
                          </div>
                          <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
                          <div className={`text-[10px] mt-2 block text-right ${isMe ? 'text-primary-200' : 'text-gray-400'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escriu un missatge..."
                    className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center shrink-0"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Selecciona una petició per veure el xat.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
