import React, { useEffect, useState, useContext } from 'react';
import { Search, Filter, Calendar, Users, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import { getEvents, joinEvent } from '../services/api';
import { Link } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const categories = ['All', 'Sports', 'Study', 'Arts', 'Music', 'Hangout', 'Other'];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const EventFeed = () => {
  const { user, token } = useContext(UserContext);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joiningId, setJoiningId] = useState(null);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const [category, setCategory] = useState('All');
  const [showPast, setShowPast] = useState(true);

  const loadEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const filters = {
        category: category !== 'All' ? category : undefined,
      };

      const data = await getEvents(filters);
      const now = new Date();

      const normalizedSearch = debouncedSearch.trim().toLowerCase();
      
      const filtered = data.filter((event) => {
        const isExpired = event.date ? new Date(event.date) < now : false;
        if (!showPast && isExpired) return false;
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
      setEvents((prev) => prev.map((e) => (e._id === updated._id ? updated : e)));
    } catch (err) {
      console.error('Failed to join event:', err);
      setError(err?.msg || 'Failed to join event. Please try again.');
    } finally {
      setJoiningId(null);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [category, showPast, debouncedSearch]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    loadEvents();
  };

  return (
    <div className="min-h-screen relative bg-[#f9fafc] overflow-hidden pb-20">
      
      {/* 🧠 Dynamic Ambient Background Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-purple-400/20 blur-[130px]" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 80, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-pink-400/20 blur-[150px]" 
        />
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[40%] w-[35vw] h-[35vw] rounded-full bg-yellow-300/15 blur-[120px]" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16">
        
        {/* 🔥 3D Enhanced Header Section */}
        <div className="mb-14 relative flex flex-col items-center justify-center text-center">
          
          {/* 3D Floating Diamond Geo Element */}
          <motion.div
            animate={{ y: [-15, 15, -15], rotateZ: [0, 90, 180] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="hidden lg:block absolute left-20 top-2 z-0"
          >
            <Tilt tiltMaxAngleX={30} tiltMaxAngleY={30} perspective={1000} transitionSpeed={2000}>
              <div className="w-24 h-24 bg-gradient-to-tr from-purple-500/80 to-pink-500/80 rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.4)] border-2 border-white/60 backdrop-blur-md opacity-90 block" />
            </Tilt>
          </motion.div>

          {/* 3D Floating 3D Sphere Geo Element */}
          <motion.div
            animate={{ y: [15, -20, 15], x: [-10, 10, -10] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:block absolute right-24 top-0 z-0"
          >
            <Tilt tiltMaxAngleX={40} tiltMaxAngleY={40} perspective={800} scale={1.1} transitionSpeed={1500}>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.1),0_20px_40px_rgba(251,191,36,0.5)] border border-white/50 opacity-90 backdrop-blur-lg block" />
            </Tilt>
          </motion.div>

          {/* Main Title text block */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: "spring" }} className="relative z-10">
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 mb-6 tracking-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.05)]">
              Discover the Vibe
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-xl font-bold">
              Find exactly what excites you. Connect with people, explore local gems, and create memories.
            </p>
          </motion.div>
        </div>

        {/* 🎛️ Interactive 3D Search & Filter Board */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: "spring", bounce: 0.3 }} className="mb-16 relative z-30">
          <Tilt 
            tiltMaxAngleX={3} 
            tiltMaxAngleY={3} 
            perspective={1800} 
            scale={1.01} 
            transitionSpeed={3000}
            className="w-full"
            glareEnable={true}
            glareMaxOpacity={0.07}
            glarePosition="all"
            glareBorderRadius="2.5rem"
            tiltReverse={true}
          >
            <form
              onSubmit={handleFilterSubmit}
              className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 md:p-10 border-2 border-white relative overflow-hidden"
            >
              {/* Inner ambient light over the glass board */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[80%] bg-gradient-to-b from-white/90 to-transparent -z-10 blur-[30px]" />

              <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-6 md:space-y-0">
                <div className="flex-1 relative group w-full">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-7 h-7 group-focus-within:text-purple-600 transition-colors" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by event name, description, city, or tags..."
                    className="w-full pl-16 pr-6 py-5 bg-white/80 border-2 border-gray-100 rounded-3xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-400 focus:bg-white outline-none transition-all duration-300 text-xl font-bold shadow-inner placeholder-gray-400 text-gray-800"
                  />
                </div>
              </div>

              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mt-8 pt-8 border-t-2 border-gray-100/60">
                <div className="flex items-start md:items-center space-x-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <Filter className="w-6 h-6 text-purple-500" />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`px-5 py-2.5 rounded-2xl text-sm font-black uppercase tracking-wider transition-all duration-300 ${
                          category === cat
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_10px_20px_rgba(168,85,247,0.3)] scale-105 border border-purple-400/50'
                            : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-700 border border-gray-100 shadow-sm hover:shadow-md'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm self-start xl:self-auto">
                  <span className="mr-5 text-sm font-black text-gray-400 uppercase tracking-widest">Past Events</span>
                  <button
                    type="button"
                    onClick={() => setShowPast(!showPast)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none shadow-inner ${
                      showPast ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                        showPast ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </form>
          </Tilt>
        </motion.div>

        {/* 🚨 States */}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center p-16 text-purple-500">
             <Loader2 className="animate-spin w-16 h-16 mb-6" />
             <p className="text-2xl font-black tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Fetching the Vibe...</p>
          </motion.div>
        )}

        {error && !loading && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-50/90 backdrop-blur-xl border-2 border-red-200 text-red-700 rounded-3xl p-8 mb-4 shadow-lg font-bold text-center text-lg">
            {error}
          </motion.div>
        )}

        {!loading && !error && events.length === 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/70 backdrop-blur-2xl rounded-[3rem] p-16 text-center text-gray-500 border border-white shadow-2xl">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-gray-100">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-3xl font-black text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500">No events found.</p>
            <p className="text-xl font-medium max-w-lg mx-auto leading-relaxed">Try adjusting your category filters or type a different keyword to discover more local gems!</p>
          </motion.div>
        )}

        {/* 🎬 EVENT GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-4 relative z-20"
        >
          {events.map((event) => {
            const isExpired = event.date ? new Date(event.date) < new Date() : false;

            return (
              <motion.div variants={cardVariants} key={event._id} className="h-full">
                <Tilt 
                  tiltMaxAngleX={isExpired ? 0 : 5} 
                  tiltMaxAngleY={isExpired ? 0 : 5} 
                  scale={isExpired ? 1 : 1.03} 
                  transitionSpeed={2500}
                  className="h-full parallax-effect-glare-scale"
                  tiltEnable={!isExpired}
                  glareEnable={!isExpired}
                  glareMaxOpacity={0.2}
                  glareColor="#ffffff"
                  glarePosition="all"
                  glareBorderRadius="2rem"
                >
                  <div
                    className={`h-full bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_10px_30px_rgb(0,0,0,0.04)] transition-all duration-300 p-8 border border-white flex flex-col justify-between group ${
                      isExpired ? 'opacity-70 grayscale-[0.3]' : 'hover:shadow-[0_25px_50px_rgba(168,85,247,0.15)] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex gap-2">
                          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 shadow-sm border border-white">
                            {event.category}
                          </span>
                          {isExpired && (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gray-200 text-gray-500 shadow-sm border border-white">
                              Past
                            </span>
                          )}
                        </div>
                        <span className={`inline-flex items-center text-xs font-bold uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 ${isExpired ? 'text-gray-400' : 'text-purple-600'}`}>
                          <Calendar className="w-4 h-4 mr-2" />
                          {event.date ? new Date(event.date).toLocaleDateString() : 'TBD'}
                        </span>
                      </div>

                      <Link to={`/events/${event._id}`} className="block">
                        <h2 className={`text-3xl font-black mb-3 line-clamp-2 transition-colors tracking-tight ${
                          isExpired ? 'text-gray-500' : 'text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600'
                        }`}>
                          {event.title}
                        </h2>
                      </Link>

                      <p className="text-gray-600 text-lg mb-8 line-clamp-3 leading-relaxed font-medium">
                        {event.description}
                      </p>

                      <div className="flex items-center justify-between mb-2 text-sm text-gray-600 font-bold bg-gray-50/80 p-4 rounded-2xl border border-gray-100/50">
                        <span className="inline-flex items-center">
                          <MapPin className="w-5 h-5 mr-2 text-pink-500" />
                          {event.city}
                        </span>
                        <span className="inline-flex items-center">
                          <Users className="w-5 h-5 mr-2 text-purple-500" />
                          {event.participants?.length || 0}
                          {event.participantLimit ? ` / ${event.participantLimit}` : ''}
                        </span>
                      </div>

                      {event.host && (
                        <div className="flex items-center justify-between mt-6 pt-6 border-t-2 border-gray-100 w-full">
                          <div className="flex items-center text-xs text-gray-500 font-black uppercase tracking-widest">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mr-3 text-white shadow-md border-2 border-white text-sm">
                              {event.host.name[0]}
                            </div>
                            <span className="truncate max-w-[120px]">By {event.host.name}</span>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => handleJoin(event)}
                            disabled={
                              isExpired ||
                              !user ||
                              joiningId === event._id ||
                              (user && (event.host?._id === user._id || event.host === user._id)) ||
                              (event.participants?.length >= event.participantLimit) ||
                              (user && event.participants?.some(p => p === user._id || p?._id === user._id)) ||
                              (user && event.joinRequests?.some(r => r === user._id || r?._id === user._id))
                            }
                            className={`inline-flex items-center px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-md ${
                              isExpired 
                                ? 'bg-gray-200 text-gray-400 shadow-none cursor-not-allowed' 
                                : 'bg-gray-900 text-white hover:bg-purple-600 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:scale-100'
                            }`}
                          >
                            <span>
                              {isExpired ? 'Ended' : 
                               !user ? 'Join' :
                               (user && event.participants?.some(p => p === user._id || p?._id === user._id)) ? 'Joined' : 
                               (user && event.joinRequests?.some(r => r === user._id || r?._id === user._id)) ? 'Sent' : 
                               'Join'}
                            </span>
                            {!isExpired && <ArrowRight className="w-4 h-4 ml-2" />}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default EventFeed;