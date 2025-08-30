import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 p-7">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-600 mb-2">
            {isLogin ? 'Welcome Back' : 'Join Vibely'}
          </h2>
          <p className="text-gray-600">
            {isLogin
              ? 'Sign in to your account to continue your journey'
              : 'Create your account and start discovering amazing events'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              !isLogin ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isLogin ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Sign In
          </button>
        </div>

        {isLogin ? <Login onSwitch={handleSwitch} /> : <Register onSwitch={handleSwitch} />}
      </div>
    </div>
  );
};

export default AuthModal;