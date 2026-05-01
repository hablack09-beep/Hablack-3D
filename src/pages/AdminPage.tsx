import React, { useState, useRef, useEffect } from 'react';
import { Package, CheckCircle, Clock, Send, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRequests, FigureRequest, ChatMessage } from '../hooks/useRequests';

export default function AdminPage() {
  const { user, isAdmin } = useAuth();
  const { requests, updateStatus, addMessage } = useRequests();
  const [activeTab, setActiveTab] = useState<'requests' | 'chats'>('requests');
  const [selectedRequest, setSelectedRequest] = useState<FigureRequest | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedRequest) {
      const updated = requests.find(r => r.id === selectedRequest.id);
      if (updated) setSelectedRequest(updated);
    }
  }, [requests, selectedRequest]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedRequest?.messages]);

  if (!isAdmin) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold font-heading text-red-600">Accés Denegat</h2>
        <p className="text-gray-600 mt-2">No tens permisos d'administrador per veure aquesta pàgina.</p>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedRequest) return;
    
    addMessage(selectedRequest.id, {
      senderId: 'admin_id',
      senderName: 'Hablack Admin',
      text: newMessage.trim(),
    });
    setNewMessage('');
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const budgetedCount = requests.filter(r => r.status === 'budgeted').length;
  const completedCount = requests.filter(r => r.status === 'completed').length;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-10">
        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-4">Tauler d'Administrador</h1>
        <p className="text-lg text-gray-600">Gestiona les peticions i els xats amb els clients.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total</p>
            <p className="text-2xl font-bold text-gray-900 font-heading">{requests.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pendents</p>
            <p className="text-2xl font-bold text-gray-900 font-heading">{pendingCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pressupostats</p>
            <p className="text-2xl font-bold text-gray-900 font-heading">{budgetedCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Completats</p>
            <p className="text-2xl font-bold text-gray-900 font-heading">{completedCount}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => { setActiveTab('requests'); setSelectedRequest(null); }}
          className={`px-6 py-3 rounded-full font-medium transition-colors ${activeTab === 'requests' ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
        >
          Llista de Peticions
        </button>
        <button 
          onClick={() => setActiveTab('chats')}
          className={`px-6 py-3 rounded-full font-medium transition-colors ${activeTab === 'chats' ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
        >
          Xats de Peticions
        </button>
      </div>

      {activeTab === 'requests' && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
            <h3 className="text-lg font-bold font-heading text-gray-900">Totes les Peticions</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {requests.length === 0 ? (
              <div className="p-8 text-center text-gray-500">Encara no hi ha cap petició.</div>
            ) : (
              requests.map(req => (
                <div key={req.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">De: {req.userName}</h4>
                      <p className="text-sm text-gray-500 mb-2">{req.email} • {new Date(req.date).toLocaleDateString()}</p>
                      <p className="text-gray-600">{req.description}</p>
                      {req.fileName && (
                        <div className="mt-3">
                          <p className="text-xs text-primary-600 font-medium mb-2">Fitxer adjunt: {req.fileName}</p>
                          {req.fileData && (
                            <div className="flex flex-col items-start gap-2">
                              <img src={req.fileData} alt="Referència" className="w-32 h-32 object-cover rounded-lg border border-gray-200" />
                              <a 
                                href={req.fileData} 
                                download={req.fileName}
                                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md font-medium transition-colors"
                              >
                                Descarregar Imatge
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <select 
                      value={req.status}
                      onChange={(e) => updateStatus(req.id, e.target.value as FigureRequest['status'])}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium outline-none cursor-pointer border-r-4 border-transparent ${
                        req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        req.status === 'budgeted' ? 'bg-indigo-100 text-indigo-800' : 
                        'bg-green-100 text-green-800'
                      }`}
                    >
                      <option value="pending">Pendent</option>
                      <option value="budgeted">Pressupostat</option>
                      <option value="completed">Completat</option>
                    </select>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button 
                      onClick={() => { setActiveTab('chats'); setSelectedRequest(req); }}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 bg-primary-50 px-4 py-2 rounded-lg transition-colors flex items-center"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Obrir Xat ({req.messages.length})
                    </button>
                    {req.status === 'pending' && (
                      <button 
                        onClick={() => updateStatus(req.id, 'budgeted')}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-4 py-2 rounded-lg transition-colors"
                      >
                        Marcar Pressupostat
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'chats' && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row h-[700px]">
          {/* Chats Sidebar */}
          <div className="w-full md:w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/50">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold font-heading text-gray-900">Peticions amb Xat</h3>
            </div>
            <div className="overflow-y-auto flex-1">
              {requests.length === 0 ? (
                <div className="p-4 text-sm text-gray-500 text-center">No hi ha peticions.</div>
              ) : (
                requests.map((req) => (
                  <button
                    key={req.id}
                    onClick={() => setSelectedRequest(req)}
                    className={`w-full text-left p-4 border-b border-gray-50 transition-colors ${selectedRequest?.id === req.id ? 'bg-white border-l-4 border-l-primary-500' : 'hover:bg-white'}`}
                  >
                    <div className="font-bold text-gray-900 mb-1 line-clamp-1">{req.userName}</div>
                    <div className="text-sm text-gray-500 line-clamp-1 mb-2">{req.description}</div>
                    <div className="flex justify-between items-center mt-2">
                       <span className="text-xs text-gray-400">{req.messages.length} missatges</span>
                       <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        req.status === 'budgeted' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {req.status === 'pending' ? 'Pendent' : req.status === 'budgeted' ? 'Pressupostat' : 'Completat'}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="w-full md:w-2/3 flex flex-col h-full bg-white">
            {selectedRequest ? (
              <>
                <div className="p-4 border-b border-gray-100 flex items-start justify-between bg-white z-10 shadow-sm">
                  <div className="flex gap-4 items-center">
                    {selectedRequest.fileData && (
                      <img src={selectedRequest.fileData} alt="Ref" className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0" />
                    )}
                    <div>
                      <h3 className="font-bold text-gray-900">Xat amb {selectedRequest.userName}</h3>
                      <p className="text-sm text-gray-500">{selectedRequest.email}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto bg-gray-50/30 flex flex-col gap-4">
                  {selectedRequest.messages.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                      No hi ha missatges. Escriu el primer pressupost o pregunta!
                    </div>
                  ) : (
                    selectedRequest.messages.map((msg) => {
                      const isAdminMsg = msg.senderId === 'admin_id';
                      return (
                        <div key={msg.id} className={`flex ${isAdminMsg ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${isAdminMsg ? 'bg-primary-600 text-white rounded-br-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm'}`}>
                            <div className={`text-xs mb-1 font-medium ${isAdminMsg ? 'text-primary-100' : 'text-gray-500'}`}>
                              {isAdminMsg ? 'Tu (Admin)' : msg.senderName}
                            </div>
                            <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
                            <div className={`text-[10px] mt-2 block text-right ${isAdminMsg ? 'text-primary-200' : 'text-gray-400'}`}>
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-white border-t border-gray-100">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Escriu una resposta al client..."
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
                Selecciona una petició per obrir el xat.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
