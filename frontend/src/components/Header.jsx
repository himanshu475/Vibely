import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Zap, User } from 'lucide-react';
import { UserContext } from '../context/UserContext';

const Header = ({ onAuthClick, onProfileClick }) => {
  const { user } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Vibely
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
            Home
          </NavLink>
          <NavLink to="/profile" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
            Profile
          </NavLink>
        </nav>

        {/* Sign In Button */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <button 
              onClick={onProfileClick}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <User className="w-4 h-4" />
              <span>{user.name}</span>
            </button>
          ) : (
            <button 
              onClick={onAuthClick}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Sign In / Join
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-100">
          <nav className="flex flex-col space-y-4">
            <NavLink to="/" className="text-gray-700 hover:text-purple-600 font-medium">
              Home
            </NavLink>
            <NavLink to="/profile" className="text-gray-700 hover:text-purple-600 font-medium">
              Profile
            </NavLink>
            {user ? (
                <button 
                  onClick={onProfileClick}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium mt-4 w-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </button>
              ) : (
                <button 
                  onClick={onAuthClick}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium mt-4 w-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  Sign In / Join
                </button>
              )}
          </nav>
        </div>
      )}
    </div>
    </header>
  );
};

export default Header;