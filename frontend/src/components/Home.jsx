import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, Star, Check } from 'lucide-react';
import { getEvents } from '../services/api';
import { UserContext } from '../context/UserContext';

const Home = () => {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (e) {
        console.error('Failed to load events for home:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-800">
          {/* Decorative dots */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Glassmorphism Card */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Side - Content */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                  Your Next Adventure Awaits
                </h1>
                <ul className="space-y-4 mb-8">
                  {[
                    'Connect with like-minded people',
                    'Discover hidden gems in your city',
                    'Create lasting memories',
                    'Share your own events',
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center text-white/90 text-lg">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    if (user) {
                      navigate('/events');
                    } else {
                      navigate('/events');
                    }
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-xl"
                >
                  Join the Community
                </button>
              </div>

              {/* Right Side - Decorative Elements */}
              <div className="relative hidden md:block">
                <div className="relative w-full h-96">
                  {/* Layered translucent rectangles */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-3xl transform rotate-12" />
                  <div className="absolute top-8 right-8 w-56 h-56 bg-white/10 rounded-3xl transform -rotate-6" />
                  <div className="absolute top-16 right-16 w-48 h-48 bg-white/10 rounded-3xl transform rotate-12" />
                  
                  {/* Colored circles */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-400 rounded-full opacity-80" />
                  <div className="absolute top-32 right-20 w-20 h-20 bg-blue-400 rounded-full opacity-80" />
                  <div className="absolute bottom-8 right-12 w-24 h-24 bg-teal-400 rounded-full opacity-80" />
                  
                  {/* Heart icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Heart className="w-24 h-24 text-white/30" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Active Members */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">50,000+</div>
              <div className="text-white/80 text-sm">Active Members</div>
            </div>

            {/* Connections Made */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">100,000+</div>
              <div className="text-white/80 text-sm">Connections Made</div>
            </div>

            {/* Community Rating */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-white/80 text-sm">Community Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find exactly what excites you from our diverse range of event categories
            </p>
          </div>

          {loading ? (
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center text-gray-500">
              Loading events...
            </div>
          ) : events.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center text-gray-500">
              No events yet. Be the first to{' '}
              {user ? (
                <button
                  onClick={() => navigate('/events/new')}
                  className="text-purple-600 font-medium hover:text-purple-700 underline"
                >
                  create one
                </button>
              ) : (
                <span className="text-purple-600 font-medium">create one</span>
              )}
              !
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {events.slice(0, 3).map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-200 p-6 border border-gray-100 cursor-pointer"
                  onClick={() => navigate('/events')}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-600">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{event.city}</span>
                    <span>
                      {Array.isArray(event.participants) ? event.participants.length : 0} participants
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/events')}
              className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-200"
            >
              View all events →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
