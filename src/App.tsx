/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Home,
  User as UserIcon,
  KeyRound,
  BadgePercent,
  MessageSquare,
  Package,
  Menu,
  X,
  Printer,
  Phone,
  Mail,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RequestPage from './pages/RequestPage';
import KeychainsPage from './pages/KeychainsPage';
import ClubPricingPage from './pages/ClubPricingPage';
import ReviewsPage from './pages/ReviewsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
          <Printer className="h-10 w-10 text-primary-600 mb-3" />
          <p className="text-slate-500 text-sm font-medium">Carregant...</p>
        </div>
      </div>
    );
  }

  const navigation = [
    { id: 'home', name: 'Inici', icon: Home },
    { id: 'keychains', name: 'Clauers 3D', icon: KeyRound },
    { id: 'club-pricing', name: 'Tarifes Clubs', icon: BadgePercent },
    { id: 'reviews', name: 'Opinions', icon: MessageSquare },
    { id: 'about', name: 'Qui Sóc', icon: UserIcon },
  ];

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'keychains':
        return <KeychainsPage onNavigate={handleNavigate} />;
      case 'club-pricing':
        return <ClubPricingPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'about':
        return <AboutPage />;
      case 'request':
        return <RequestPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navigation Bar — 3-Zone Contract */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-16">
            {/* Zone 1: Brand Wordmark (Single Line) */}
            <button
              type="button"
              onClick={() => handleNavigate('home')}
              className="flex items-center gap-2 text-left whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
            >
              <Printer className="h-6 w-6 text-primary-600 shrink-0" />
              <span className="text-lg font-bold font-heading text-slate-900 tracking-tight whitespace-nowrap shrink-0">
                Hablack's 3d
              </span>
            </button>

            {/* Zone 2: Clean Single-Line Nav Links */}
            <nav className="hidden md:flex items-center gap-7" aria-label="Navegació principal">
              {navigation.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className={`py-1 text-sm font-medium border-b-2 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action + Mobile Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleNavigate('request')}
                className={`hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  currentPage === 'request'
                    ? 'bg-primary-700 text-white'
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }`}
              >
                <Package className="w-4 h-4 mr-1.5 shrink-0" />
                Demanar Figura
              </button>

              <button
                type="button"
                onClick={() => handleNavigate('profile')}
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 hover:border-slate-300 bg-slate-50 transition-colors shrink-0 cursor-pointer"
                title="El teu perfil"
                aria-label="El teu perfil"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Usuari'}
                    className="w-9 h-9 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-xs font-bold text-slate-700">
                    {(user?.displayName || user?.email || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg md:hidden text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                aria-label={isMobileMenuOpen ? 'Tancar menú' : 'Obrir menú'}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.15 }}
              className="md:hidden overflow-hidden bg-white border-b border-slate-200"
            >
              <div className="px-4 py-3 space-y-1">
                {navigation.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {item.name}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => handleNavigate('request')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 'request'
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <Package className="w-4 h-4 shrink-0" />
                  Demanar Figura
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate('profile')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 border-t border-slate-100 mt-2 pt-3"
                >
                  <UserIcon className="w-4 h-4 shrink-0" />
                  El meu perfil
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Hablack's 3d. Tots els drets reservats.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="mailto:hablackplus@gmail.com"
              className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors"
            >
              <Mail className="w-4 h-4" />
              hablackplus@gmail.com
            </a>
            <a
              href="tel:+34606519975"
              className="inline-flex items-center gap-1.5 font-mono tabular-nums hover:text-slate-900 transition-colors"
            >
              <Phone className="w-4 h-4" />
              +34 606 51 99 75
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
