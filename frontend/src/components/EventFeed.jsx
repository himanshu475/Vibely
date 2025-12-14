import React, { useEffect, useState, useContext } from 'react';
import { Search, Filter, Calendar, Users, MapPin, Map, ArrowRight } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import { getEvents, joinEvent } from '../services/api';

const categories = ['All', 'Sports', 'Study', 'Arts', 'Music', 'Hangout', 'Other'];

const EventFeed = () => {
  const { user, token } = useContext(UserContext);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joiningId, setJoiningId] = useState(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const loadEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const filters = {
        category: category !== 'All' ? category : undefined,
      };

      const data = await getEvents(filters);

      const normalizedSearch = search.trim().toLowerCase();
      const filtered = normalizedSearch
        ? data.filter((event) => {
            const haystack = `${event.title} ${event.description} ${event.city} ${event.category} ${(event.tags || []).join(' ')}`.toLowerCase();
            return haystack.includes(normalizedSearch);
          })
        : data;

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

  useEffect(() => {
    loadEvents();
    
  }, []);

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

        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
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

          <button
            type="submit"
            className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <span>Apply Filters</span>
          </button>
        </div>
      </form>

      {loading && (
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center text-gray-500">
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
          <p className="text-sm">
            Try changing the category or search text to discover more events.
          </p>
        </div>
      )}

      <div className="grid gap-4 md:gap-6 md:grid-cols-2 mt-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-200 p-5 border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 border border-purple-100">
                  {event.category}
                </span>
                <span className="inline-flex items-center text-xs text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {event.date ? new Date(event.date).toLocaleString() : 'TBD'}
                </span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                {event.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
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
                    {Array.isArray(event.participants) ? event.participants.length : 0}
                    {event.participantLimit ? ` / ${event.participantLimit}` : ''}
                  </span>
                </div>
                {event.participantLimit && (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    Array.isArray(event.participants) && event.participants.length >= event.participantLimit
                      ? 'bg-red-50 text-red-600'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {Array.isArray(event.participants) && event.participants.length >= event.participantLimit
                      ? 'Full'
                      : 'Spots available'}
                  </span>
                )}
              </div>

              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {event.host && (
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <Map className="w-4 h-4 mr-1" />
                    <span>Hosted by {event.host.name}</span>
                    {event.host.city && <span className="ml-1">· {event.host.city}</span>}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleJoin(event)}
                    disabled={
                      !user ||
                      joiningId === event._id ||
                      (event.host && (event.host._id === user?._id || event.host === user?._id)) ||
                      (Array.isArray(event.participants) &&
                        event.participantLimit &&
                        event.participants.length >= event.participantLimit) ||
                      (Array.isArray(event.participants) &&
                        user &&
                        event.participants.some(
                          (p) => p === user._id || p?._id === user._id
                        )) ||
                      (Array.isArray(event.joinRequests) &&
                        user &&
                        event.joinRequests.some(
                          (r) => r === user._id || r?._id === user._id
                        ))
                    }
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow hover:from-purple-600 hover:to-pink-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <span>
                      {Array.isArray(event.participants) &&
                      user &&
                      event.participants.some(
                        (p) => p === user._id || p?._id === user._id
                      )
                        ? 'Joined'
                        : Array.isArray(event.joinRequests) &&
                          user &&
                          event.joinRequests.some(
                            (r) => r === user._id || r?._id === user._id
                          )
                        ? 'Request sent'
                        : joiningId === event._id
                        ? 'Joining...'
                        : 'Join'}
                    </span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventFeed;


