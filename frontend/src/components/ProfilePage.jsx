import React, { useState, useContext, useEffect } from 'react';
import { User, Mail, MapPin, Edit3, Save, X, Camera, Heart, Star } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import { updateUserProfile } from '../services/api';

const ProfilePage = () => {
    const { user, token, setUser } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [customHobby, setCustomHobby] = useState('');
    const [editData, setEditData] = useState({});

    useEffect(() => {
        if (user) {
            setEditData({
                name: user.name || '',
                email: user.email || '',
                city: user.city || '',
                bio: user.bio || '',
                hobbies: user.hobbies || [],
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        });
    };

    const handleHobbyChange = (hobby) => {
        const updatedHobbies = editData.hobbies.includes(hobby)
            ? editData.hobbies.filter(h => h !== hobby)
            : [...editData.hobbies, hobby];

        setEditData({
            ...editData,
            hobbies: updatedHobbies
        });
    };

    const handleAddCustomHobby = () => {
        if (customHobby.trim() && !editData.hobbies.includes(customHobby.trim())) {
            setEditData({
                ...editData,
                hobbies: [...editData.hobbies, customHobby.trim()]
            });
            setCustomHobby('');
        }
    };

    const handleRemoveHobby = (hobbyToRemove) => {
        setEditData({
            ...editData,
            hobbies: editData.hobbies.filter(hobby => hobby !== hobbyToRemove)
        });
    };

    const handleCustomHobbyKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCustomHobby();
        }
    };

    const handleSave = async () => {
        try {
            const updatedUser = await updateUserProfile(editData, token);
            setUser(updatedUser);
            setIsEditing(false);
            setCustomHobby('');
        } catch (err) {
            console.error('Failed to save profile:', err.response.data);
        }
    };

    const handleCancel = () => {
        setEditData({
            name: user.name || '',
            email: user.email || '',
            city: user.city || '',
            bio: user.bio || '',
            hobbies: user.hobbies || [],
        });
        setIsEditing(false);
        setCustomHobby('');
    };

    const availableHobbies = [
        'Music', 'Photography', 'Tech', 'Travel', 'Food & Drink', 'Sports',
        'Arts', 'Reading', 'Gaming', 'Fitness', 'Cooking', 'Dancing'
    ];

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl mx-auto my-8">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="relative inline-block mb-4">
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                {user.name?.[0].toUpperCase() || '?'}
                            </div>
                            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                <Camera className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                        <div className="flex items-center justify-center space-x-3">
                            <h2 className="text-3xl font-bold text-gray-900">
                                {isEditing ? 'Edit Profile' : 'My Profile'}
                            </h2>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors duration-200"
                                >
                                    <Edit3 className="w-5 h-5 text-purple-600" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <User className="w-4 h-4 inline mr-2" />
                                Full Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                                />
                            ) : (
                                <div className="bg-gray-50 px-4 py-3 rounded-xl text-gray-900 font-medium">
                                    {user.name}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <Mail className="w-4 h-4 inline mr-2" />
                                Email Address
                            </label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={editData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                                />
                            ) : (
                                <div className="bg-gray-50 px-4 py-3 rounded-xl text-gray-900 font-medium">
                                    {user.email}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <MapPin className="w-4 h-4 inline mr-2" />
                                City
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="city"
                                    value={editData.city}
                                    onChange={handleInputChange}
                                    placeholder="Enter your city"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                                />
                            ) : (
                                <div className="bg-gray-50 px-4 py-3 rounded-xl text-gray-900 font-medium">
                                    {user.city || 'Not specified'}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <Heart className="w-4 h-4 inline mr-2" />
                                Bio
                            </label>
                            {isEditing ? (
                                <textarea
                                    name="bio"
                                    value={editData.bio}
                                    onChange={handleInputChange}
                                    placeholder="Tell us about yourself..."
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                                />
                            ) : (
                                <div className="bg-gray-50 px-4 py-3 rounded-xl text-gray-700 leading-relaxed">
                                    {user.bio || 'No bio provided.'}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <Star className="w-4 h-4 inline mr-2" />
                                Hobbies & Interests
                            </label>
                            {isEditing ? (
                                <div className="space-y-3">
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={customHobby}
                                            onChange={(e) => setCustomHobby(e.target.value)}
                                            onKeyPress={handleCustomHobbyKeyPress}
                                            placeholder="Add your own hobby..."
                                            className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddCustomHobby}
                                            disabled={!customHobby.trim()}
                                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {editData.hobbies.map((hobby) => (
                                            <span
                                                key={hobby}
                                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium shadow-lg group"
                                            >
                                                {hobby}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveHobby(hobby)}
                                                    className="ml-2 w-4 h-4 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {availableHobbies.map((hobby) => (
                                            <button
                                                key={hobby}
                                                type="button"
                                                onClick={() => handleHobbyChange(hobby)}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                                                    editData.hobbies.includes(hobby)
                                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-600'
                                                }`}
                                                disabled={editData.hobbies.includes(hobby)}
                                            >
                                                {hobby}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {user.hobbies.map((hobby) => (
                                        <span
                                            key={hobby}
                                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium shadow-lg"
                                        >
                                            {hobby}
                                        </span>
                                    ))}
                                    {user.hobbies.length === 0 && (
                                        <span className="text-gray-500">No hobbies specified.</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {isEditing ? (
                        <div className="flex space-x-4 mt-8">
                            <button
                                onClick={handleCancel}
                                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <Save className="w-5 h-5 inline mr-2" />
                                Save Changes
                            </button>
                        </div>
                    ) : (
                        <div className="mt-8">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <Edit3 className="w-5 h-5 inline mr-2" />
                                Edit Profile
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
                        <div className="text-center">
                            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                0
                            </div>
                            <div className="text-gray-600 text-sm">Events Attended</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                                0
                            </div>
                            <div className="text-gray-600 text-sm">Events Created</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                                0
                            </div>
                            <div className="text-gray-600 text-sm">Connections</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;