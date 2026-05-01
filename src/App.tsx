/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Home, User as UserIcon, MessageSquare, Package, Menu, X, Printer, LogIn, LogOut, Settings, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RequestPage from './pages/RequestPage';
import ReviewsPage from './pages/ReviewsPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const { user, isAdmin, loading, signIn, signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Printer className="h-12 w-12 text-primary-600 animate-pulse mb-4" />
          <p className="text-gray-500 font-medium">Carregant...</p>
        </div>
      </div>
    );
  }

  const navigation = [
    { id: 'home', name: 'Inici', icon: Home },
    { id: 'request', name: 'Demanar Figura', icon: Package },
    { id: 'chat', name: 'Els Meus Xats', icon: MessageCircle },
    { id: 'about', name: 'Qui Sóc', icon: UserIcon },
    { id: 'reviews', name: 'Opinions', icon: MessageSquare },
  ];

  if (isAdmin) {
    navigation.push({ id: 'admin', name: "Tauler d'Admin", icon: Settings });
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'request':
        return <RequestPage onNavigate={setCurrentPage} />;
      case 'chat':
        return <ChatPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'admin':
        return <AdminPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
              <Printer className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold font-heading text-gray-900 tracking-tight">Hablack's 3d</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden sm:flex sm:space-x-8 items-center">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    currentPage === item.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </button>
              ))}
            </div>

            {/* User Menu & Mobile Toggle */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center gap-3">
                <button 
                  onClick={() => setCurrentPage('profile')}
                  className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors"
                  title="El teu perfil"
                >
                  <span className="text-sm font-medium text-gray-700">{user.displayName || 'Usuari'}</span>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-gray-200" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                </button>
                <button 
                  onClick={signOut}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                  title="Tancar sessió"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md sm:hidden text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden overflow-hidden bg-white border-b border-gray-200"
            >
              <div className="pt-2 pb-3 space-y-1 block">
                <button 
                  className="flex items-center px-4 py-3 border-b border-gray-100 mb-2 w-full text-left hover:bg-gray-50 focus:outline-none"
                  onClick={() => { setCurrentPage('profile'); setIsMobileMenuOpen(false); }}
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-10 h-10 rounded-full border border-gray-200 mr-3" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold mr-3">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.displayName || 'Usuari'}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px]">{user.email}</p>
                  </div>
                </button>

                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`nav-item w-full flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                      currentPage === item.id
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                ))}
                
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut();
                  }}
                  className="nav-item w-full flex items-center pl-3 pr-4 py-3 mt-2 border-l-4 border-transparent text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Tancar sessió
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Hablack's 3d. Tots els drets reservats.
          </p>
        </div>
      </footer>
    </div>
  );
}
