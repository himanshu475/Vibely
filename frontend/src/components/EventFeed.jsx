import React, { useEffect, useState, useContext } from 'react';
import { Search, Filter, Calendar, Users, MapPin, Map, ArrowRight } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import { getEvents, joinEvent } from '../services/api';
import { Link } from 'react-router-dom';

const categories = ['All', 'Sports', 'Study', 'Arts', 'Music', 'Hangout', 'Other'];

const EventFeed = () => {
  const { user, token } = useContext(UserContext);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joiningId, setJoiningId] = useState(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  
  // 1. ADDED STATE FOR TOGGLE
  const [showPast, setShowPast] = useState(true);

  // 2. UPDATED FILTERING LOGIC
  const loadEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const filters = {
        category: category !== 'All' ? category : undefined,
      };

      const data = await getEvents(filters);
      const now = new Date();

      const normalizedSearch = search.trim().toLowerCase();
      
      const filtered = data.filter((event) => {
        // Check for Expiry
        const isExpired = event.date ? new Date(event.date) < now : false;
        
        // If "Show Past" is OFF, hide expired events
        if (!showPast && isExpired) return false;

        // Apply Search Logic
        const haystack = `${event.title} ${event.description} ${event.city} ${event.category} ${(event.tags || []).join(' ')}`.toLowerCase();
        return haystack.includes(normalizedSearch);
      });

      setEvents(filtered);
    } catch (err) {
      console.error('Failed to load events:', err);
      setError(typeof err === 'string' ? err : err?.msg || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (event) => {
    if (!token) {
      setError('Please sign in to join events.');
      return;
    }
    setError(null);
    setJoiningId(event._id);

    try {
      const updated = await joinEvent(event._id, token);
      setEvents((prev) =>
        prev.map((e) => (e._id === updated._id ? updated : e))
      );
    } catch (err) {
      console.error('Failed to join event:', err);
      setError(err?.msg || 'Failed to join event. Please try again.');
    } finally {
      setJoiningId(null);
    }
  };

  // 3. UPDATED USEEFFECT DEPENDENCIES
  useEffect(() => {
    loadEvents();
  }, [category, showPast]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    loadEvents();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Discover Events
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find people to vibe with in your city, based on your interests.
        </p>
      </div>

      <form
        onSubmit={handleFilterSubmit}
        className="bg-white rounded-3xl shadow-lg p-4 md:p-6 mb-6 space-y-4"
      >
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by event name, description, city, or tags"
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* 4. UPDATED FILTER BAR WITH TOGGLE */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    category === cat
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 self-start md:self-auto">
            <span className="mr-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Show Past</span>
            <button
              type="button"
              onClick={() => setShowPast(!showPast)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                showPast ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showPast ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </form>

      {/* ERROR & LOADING STATES */}
      {loading && (
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center text-gray-500 animate-pulse">
          Loading events...
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 mb-4">
          {error}
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center text-gray-500">
          <p className="mb-2 font-semibold">No events found.</p>
          <p className="text-sm">Try adjusting your filters to discover more events.</p>
        </div>
      )}

      {/* EVENT GRID */}
      <div className="grid gap-4 md:gap-6 md:grid-cols-2 mt-4">
        {events.map((event) => {
          const isExpired = event.date ? new Date(event.date) < new Date() : false;

          return (
            <div
              key={event._id}
              className={`bg-white rounded-3xl shadow-md transition-all duration-200 p-5 border border-gray-100 flex flex-col justify-between ${
                isExpired ? 'opacity-75 grayscale-[0.2]' : 'hover:shadow-xl'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 border border-purple-100">
                      {event.category}
                    </span>
                    {isExpired && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200">
                        Past Event
                      </span>
                    )}
                  </div>
                  <span className={`inline-flex items-center text-xs ${isExpired ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Calendar className="w-4 h-4 mr-1" />
                    {event.date ? new Date(event.date).toLocaleDateString() : 'TBD'}
                  </span>
                </div>

                <Link to={`/events/${event._id}`} className="block group">
                  <h2 className={`text-xl font-bold mb-1 line-clamp-1 transition-colors ${
                    isExpired ? 'text-gray-500' : 'text-gray-900 group-hover:text-purple-600'
                  }`}>
                    {event.title}
                  </h2>
                </Link>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 italic">
                  {event.description}
                </p>

                <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.city}
                    </span>
                    <span className="inline-flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {event.participants?.length || 0}
                      {event.participantLimit ? ` / ${event.participantLimit}` : ''}
                    </span>
                  </div>
                </div>

                {event.host && (
                  <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-50">
                    <div className="flex items-center text-xs text-gray-400 font-medium">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-[10px] font-bold">
                        {event.host.name[0]}
                      </div>
                      <span>Hosted by {event.host.name}</span>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleJoin(event)}
                      disabled={
                        isExpired ||
                        !user ||
                        joiningId === event._id ||
                        (event.host?._id === user?._id || event.host === user?._id) ||
                        (event.participants?.length >= event.participantLimit) ||
                        (event.participants?.some(p => p === user._id || p?._id === user._id)) ||
                        (event.joinRequests?.some(r => r === user._id || r?._id === user._id))
                      }
                      className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow ${
                        isExpired 
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-xl'
                      }`}
                    >
                      <span>
                        {isExpired ? 'Ended' : 
                         event.participants?.some(p => p === user?._id || p?._id === user?._id) ? 'Joined' : 
                         event.joinRequests?.some(r => r === user?._id || r?._id === user?._id) ? 'Sent' : 
                         'Join'}
                      </span>
                      {!isExpired && <ArrowRight className="w-3 h-3 ml-1" />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventFeed;