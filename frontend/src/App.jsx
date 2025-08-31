import React from 'react';
import Register from './components/Register';
import AuthModal from './components/AuthModal';
import { UserProvider } from './context/UserContext';

const App = () => {
  return (
    <UserProvider>
      <AuthModal/>
    </UserProvider>
  );
};

export default App;