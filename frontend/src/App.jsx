import React from 'react';
import Register from './components/Register';
import AuthModal from './components/AuthModal';

const App = () => {
  return (
    <div className="bg-gray-200 text-center p-8">
      <AuthModal/>
    </div>
  );
};

export default App;