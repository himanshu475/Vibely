import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Zap, User, Plus } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onAuthClick, onProfileClick }) => {
  const { user } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="relative z-50 flex justify-center w-full px-4 pt-4 md:pt-6 pb-2">
        <motion.div 
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="w-full max-w-6xl bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_15px_40px_rgba(0,0,0,0.05)] rounded-full px-4 md:px-8 py-2 md:py-3 transition-all"
        >
          <div className="flex justify-between items-center h-12">
            
            {/* 💎 Premium Animated Logo */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <Zap className="w-5 h-5 text-white animate-pulse" fill="currentColor" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 bg-clip-text text-transparent tracking-tighter">
                Vibely
              </span>
            </div>

            {/* 🖥️ Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-2 bg-gray-50/50 px-2 py-1.5 rounded-full border border-gray-100">
              {['Home', 'Events', 'About'].map((item) => (
                <NavLink 
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  className={({ isActive }) => `
                    px-5 py-2 rounded-full font-bold text-sm tracking-wide transition-all duration-300
                    ${isActive ? 'bg-white text-purple-600 shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}
                  `}
                >
                  {item}
                </NavLink>
              ))}
              {user && (
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => `
                    px-5 py-2 rounded-full font-bold text-sm tracking-wide transition-all duration-300
                    ${isActive ? 'bg-white text-purple-600 shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}
                  `}
                >
                  Dashboard
                </NavLink>
              )}
            </nav>

            {/* 🎭 Auth / Profile Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <>
                  <button
                    onClick={() => navigate('/events/new')}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-purple-50 text-purple-700 font-bold text-sm hover:bg-purple-100 transition-all duration-300 border border-purple-100"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Event</span>
                  </button>
                  <button 
                    onClick={onProfileClick}
                    className="flex items-center space-x-2 bg-gray-900 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-gray-800 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-gray-200"
                  >
                    <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-[10px] font-black border border-white/50">
                      {user.name[0]}
                    </div>
                    <span>{user.name.split(' ')[0]}</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={onAuthClick}
                  className="bg-gray-900 text-white px-7 py-2.5 flex items-center gap-2 rounded-full font-bold text-sm hover:bg-gray-800 transform hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-gray-200/50 uppercase tracking-widest"
                >
                  <User className="w-4 h-4" /> Sign In
                </button>
              )}
            </div>

            {/* 📱 Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 bg-gray-50 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* 📱 Mobile Menu Overlay Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-24 left-4 right-4 z-40 bg-white/95 backdrop-blur-2xl border border-gray-100 rounded-3xl shadow-2xl p-6"
          >
            <nav className="flex flex-col space-y-2">
              <NavLink onClick={() => setIsMenuOpen(false)} to="/" className="text-gray-800 font-extrabold text-lg p-3 rounded-2xl hover:bg-gray-50">Home</NavLink>
              <NavLink onClick={() => setIsMenuOpen(false)} to="/events" className="text-gray-800 font-extrabold text-lg p-3 rounded-2xl hover:bg-gray-50">Explore Events</NavLink>
              <NavLink onClick={() => setIsMenuOpen(false)} to="/about" className="text-gray-800 font-extrabold text-lg p-3 rounded-2xl hover:bg-gray-50">About</NavLink>
              {user ? (
                <>
                  <NavLink onClick={() => setIsMenuOpen(false)} to="/profile" className="text-gray-800 font-extrabold text-lg p-3 rounded-2xl hover:bg-gray-50">Dashboard</NavLink>
                  <div className="h-px bg-gray-100 my-4" />
                  <button onClick={() => { setIsMenuOpen(false); navigate('/events/new'); }} className="flex justify-center items-center w-full px-6 py-4 bg-purple-50 text-purple-700 rounded-2xl font-bold">
                    <Plus className="w-5 h-5 mr-2" /> Create Event
                  </button>
                </>
              ) : (
                <>
                  <div className="h-px bg-gray-100 my-4" />
                  <button onClick={() => { setIsMenuOpen(false); onAuthClick(); }} className="w-full px-6 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg">
                    Sign In / Join
                  </button>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;