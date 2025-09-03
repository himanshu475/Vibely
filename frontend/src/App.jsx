import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { UserProvider, UserContext } from './context/UserContext';
import { getUserProfile } from './services/api';
import AuthModal from './components/AuthModal';
import Header from './components/Header';
import ProfilePage from './components/ProfilePage';
import ProfileSetup from './components/ProfileSetup';

// The main application component with all of our routing logic
const App = () => {
  const { user, token, setToken, setUser } = useContext(UserContext);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const userProfile = await getUserProfile(token);
          setUser(userProfile);
          // Redirect a new user to the profile setup page
          if (!userProfile.city && window.location.pathname !== '/onboarding') {
            navigate('/onboarding');
          }
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
          setToken(null);
          localStorage.removeItem('token');
        }
      }
    };
    fetchUser();
  }, [token, navigate, setUser]);

  return (
    <>
      <Header
        onAuthClick={() => setIsAuthModalOpen(true)}
      />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" />} />
        <Route path="/onboarding" element={<ProfileSetup />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <AuthModal
        isOpen={isAuthModalOpen && !user}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

// The top-level component that wraps the entire app
const AppWrapper = () => (
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>
);

export default AppWrapper; 