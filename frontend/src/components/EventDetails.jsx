import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Info, ArrowLeft, Tag, ShieldCheck } from 'lucide-react';
import { getEventById, joinEvent } from '../services/api';
import { UserContext } from '../context/UserContext';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

const EventDetails = () => {
  const { id } = useParams();
  const { token, user } = useContext(UserContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        setError(err.msg || 'Failed to load event');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const isExpired = event ? new Date(event.date) < new Date() : false;
  const isHost = user && event && event.host?._id === user._id;
  const isParticipant = user && event && event.participants?.some(p => p._id === user._id);
  const spotsLeft = event ? event.participantLimit - (event.participants?.length || 0) : 0;

  if (loading) return <div className="text-center mt-20 text-purple-600 animate-pulse font-bold text-xl">Materializing Event...</div>;
  if (error) return <div className="text-center mt-20 text-red-500 bg-red-50 p-6 rounded-2xl inline-block mx-auto shadow-lg font-semibold">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-100/50 rounded-full blur-[100px] -z-10" />

      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-purple-600 mb-8 transition-colors font-bold tracking-wide">
        <ArrowLeft className="w-5 h-5 mr-2" /> Explore More Events
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 40 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden border border-white flex flex-col md:flex-row relative z-10"
      >
        
        {/* Left Side: Image/Color Block & Info */}
        <div className="md:w-2/3 p-8 lg:p-14">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-8">
            
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="px-5 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
                {event.category}
              </span>
              <span className={`px-5 py-2 rounded-full text-xs font-black uppercase shadow-sm tracking-widest ${
                  isExpired 
                  ? 'bg-gray-100 text-gray-500' 
                  : event.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {isExpired ? 'Completed' : event.status}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 leading-tight">
              {event.title}
            </motion.h1>

            <motion.section variants={fadeUp} className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
              <h2 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-3 text-purple-500" /> The Vibe
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">{event.description}</p>
            </motion.section>

            <motion.section variants={fadeUp}>
              <h2 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-3 text-purple-500" /> Tags
              </h2>
              <div className="flex flex-wrap gap-3">
                {event.tags.map((tag, index) => (
                  <span key={index} className="bg-white border border-gray-200 shadow-sm text-gray-600 px-4 py-1.5 rounded-xl text-sm font-medium hover:bg-purple-50 hover:text-purple-600 transition-colors cursor-default">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.section>

            <motion.section variants={fadeUp}>
              <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center">
                <Users className="w-5 h-5 mr-3 text-purple-500" /> Confirmed Attendees ({event.participants?.length})
              </h2>
              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {event.participants.map((p) => (
                  <motion.div variants={fadeUp} key={p._id} className="flex items-center p-4 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl border border-gray-50 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold text-lg mr-4 shadow-lg shadow-purple-500/30">
                      {p.name[0]}
                    </div>
                    <div>
                        <p className="text-sm font-extrabold text-gray-900 truncate">{p.name}</p>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">{p.city || 'Member'}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

          </motion.div>
        </div>

        {/* Right Side: Interactive Action Card */}
        <div className="md:w-1/3 p-8 border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50/50">
          <div className="sticky top-8 space-y-6">
            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glareEnable={true}
              glareMaxOpacity={0.15}
              glareColor="white"
              glarePosition="all"
              glareBorderRadius="2rem"
              transitionSpeed={2500}
              scale={1.02}
            >
              <div className="bg-white p-8 rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-white space-y-8">
                <div className="space-y-6">
                  <div className="flex items-start text-gray-700">
                    <div className="p-3 bg-purple-50 rounded-2xl mr-4 text-purple-600">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-purple-400 font-extrabold uppercase tracking-widest mb-1">Date & Time</p>
                      <p className="font-bold text-gray-900">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start text-gray-700">
                    <div className="p-3 bg-pink-50 rounded-2xl mr-4 text-pink-600">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-pink-400 font-extrabold uppercase tracking-widest mb-1">Location</p>
                      <p className="font-bold text-gray-900">{event.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700 pt-6 border-t border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mr-4 flex items-center justify-center font-black text-gray-400 border-2 border-white shadow-sm">
                      {event.host?.name[0]}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-extrabold uppercase tracking-widest mb-0.5">Hosted by</p>
                      <p className="font-bold text-gray-900">{event.host?.name}</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar for Limit */}
                <div className="space-y-3 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <div className="flex justify-between text-sm font-bold uppercase tracking-wide">
                    <span className="text-gray-500">Capacity</span>
                    <span className={spotsLeft <= 2 ? 'text-red-500' : 'text-purple-600'}>
                      {spotsLeft} spots left
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${((event.participants?.length || 0) / event.participantLimit) * 100}%` }}
                      transition={{ duration: 1, type: "spring" }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" 
                    />
                  </div>
                </div>

                {!isHost && !isParticipant && (
                  <button 
                    onClick={() => {
                      if (user) joinEvent(event._id, token).then(() => alert('Request Sent!'))
                    }}
                    disabled={spotsLeft === 0 || isExpired || !user}
                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-lg hover:shadow-2xl hover:bg-gray-800 transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed uppercase tracking-wider"
                  >
                    {!user ? 'Sign In to Join' : isExpired ? 'Event Ended' : spotsLeft === 0 ? 'Event Full' : 'Request to Join'}
                  </button>
                )}
                
                {isHost && (
                  <div className="flex items-center justify-center p-4 bg-purple-50 text-purple-700 rounded-2xl font-black border border-purple-200 uppercase tracking-wide shadow-inner">
                    <ShieldCheck className="w-5 h-5 mr-3" /> You are the Host
                  </div>
                )}
              </div>
            </Tilt>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default EventDetails;