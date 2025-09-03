import React, { useState, useContext } from 'react';
import { User, Heart } from 'lucide-react';
import { updateUserProfile } from '../services/api';
import { UserContext } from '../context/UserContext';

const ProfileSetup = () => {
  const { token, setUser, user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    city: '',
    hobbies: '',
  });

  const { city, hobbies } = formData;

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hobbiesArray = hobbies.split(',').map(tag => tag.trim());
      const updatedUser = await updateUserProfile({ city, hobbies: hobbiesArray }, token);
      setUser(updatedUser);
      console.log('Profile updated successfully:', updatedUser);
      // We will handle redirection here later
    } catch (err) {
      console.error('Profile update failed:', err.response.data);
    }
  };

  if (!user || user.city) {
      // This component will only render if a user exists and their city is missing
      return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Profile
          </h2>
          <p className="text-gray-600">
            Tell us a little more about yourself to get started.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your City
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="city"
                value={city}
                onChange={handleInputChange}
                placeholder="e.g. Surat"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Hobbies
            </label>
            <div className="relative">
              <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="hobbies"
                value={hobbies}
                onChange={handleInputChange}
                placeholder="e.g. coding, hiking, cooking"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Save and Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;