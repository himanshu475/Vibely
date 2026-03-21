import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, Star, Check } from 'lucide-react';
import { getEvents } from '../services/api';
import { UserContext } from '../context/UserContext';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

// Animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 12 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

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
        {/* Animated Gradient Background */}
        <motion.div 
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-br from-purple-800 via-pink-600 to-indigo-900 bg-[length:200%_200%]"
        >
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
        </motion.div>

        {/* Glassmorphism Card */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              
              {/* Left Side - Content (Staggered Animation) */}
              <motion.div variants={staggerContainer} initial="hidden" animate="show">
                <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">
                  Your Next <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Adventure</span> Awaits
                </motion.h1>
                <motion.ul variants={fadeUpVariants} className="space-y-4 mb-10">
                  {[
                    'Connect with like-minded people',
                    'Discover hidden gems in your city',
                    'Create lasting memories',
                    'Share your own experiences',
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center text-white/95 text-xl font-medium">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4 flex-shrink-0 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </motion.ul>
                <motion.div variants={fadeUpVariants}>
                  <button
                    onClick={() => navigate('/events')}
                    className="relative group bg-white text-purple-700 px-8 py-4 rounded-full font-extrabold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Join the Community <Check className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </motion.div>
              </motion.div>

              {/* Right Side - 3D Interactive Hero Element */}
              <div className="relative hidden md:flex justify-center items-center h-[500px]">
                <Tilt
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  perspective={1000}
                  scale={1.05}
                  transitionSpeed={2500}
                  className="parallax-effect-glare-scale w-full h-full flex justify-center items-center"
                  glareEnable={true}
                  glareMaxOpacity={0.4}
                  glareColor="white"
                  glarePosition="all"
                  glareBorderRadius="3rem"
                >
                  <div className="relative w-[350px] h-[400px] bg-white/10 backdrop-blur-md rounded-[3rem] border border-white/30 shadow-[0_0_40px_rgba(236,72,153,0.3)] flex items-center justify-center overflow-hidden">
                    
                    {/* Floating Geometric Shapes */}
                    <motion.div 
                      animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }} 
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/20 to-transparent rounded-3xl transform rotate-12 backdrop-blur-sm" 
                    />
                    <motion.div 
                      animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }} 
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-pink-400/30 to-purple-500/30 rounded-full transform -rotate-6 blur-md" 
                    />
                    
                    {/* Floating Orbs */}
                    <motion.div 
                      animate={{ x: [0, 20, 0], y: [0, -20, 0] }} 
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-12 right-12 w-20 h-20 bg-yellow-400 rounded-full opacity-90 shadow-[0_0_30px_rgba(250,204,21,0.8)]" 
                    />
                    <motion.div 
                      animate={{ x: [0, -20, 0], y: [0, 20, 0] }} 
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                      className="absolute bottom-16 left-12 w-24 h-24 bg-cyan-400 rounded-full opacity-90 shadow-[0_0_30px_rgba(34,211,238,0.8)]" 
                    />
                    
                    {/* Center Pulsing Heart */}
                    <motion.div 
                      animate={{ scale: [1, 1.15, 1] }} 
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="z-10"
                    >
                      <Heart className="w-32 h-32 text-pink-500 drop-shadow-[0_0_25px_rgba(236,72,153,1)]" fill="currentColor" strokeWidth={1} />
                    </motion.div>
                  </div>
                </Tilt>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Interactive Stats Section */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Active Members */}
            <motion.div variants={fadeUpVariants}>
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={2000} className="h-full">
                <div className="h-full bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-center hover:shadow-[0_20px_40px_rgba(147,51,234,0.15)] transition-shadow">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                      <Users className="w-10 h-10 text-purple-600" />
                    </div>
                  </div>
                  <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">50k+</div>
                  <div className="text-gray-500 font-medium text-lg uppercase tracking-wider">Active Members</div>
                </div>
              </Tilt>
            </motion.div>

            {/* Connections Made */}
            <motion.div variants={fadeUpVariants}>
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={2000} className="h-full">
                <div className="h-full bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-center hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)] transition-shadow">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center">
                      <Heart className="w-10 h-10 text-pink-500" />
                    </div>
                  </div>
                  <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-2">100k+</div>
                  <div className="text-gray-500 font-medium text-lg uppercase tracking-wider">Connections Made</div>
                </div>
              </Tilt>
            </motion.div>

            {/* Community Rating */}
            <motion.div variants={fadeUpVariants}>
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={2000} className="h-full">
                <div className="h-full bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-center hover:shadow-[0_20px_40px_rgba(250,204,21,0.15)] transition-shadow">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center">
                      <Star className="w-10 h-10 text-yellow-500" />
                    </div>
                  </div>
                  <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-2">4.9/5</div>
                  <div className="text-gray-500 font-medium text-lg uppercase tracking-wider">Community Rating</div>
                </div>
              </Tilt>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-[100px] -z-10 transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-50 rounded-full blur-[100px] -z-10 transform -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Explore by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Category</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Find exactly what excites you from our diverse range of vibrant community events.
            </p>
          </div>

          {loading ? (
            <div className="bg-white rounded-3xl shadow-lg p-12 text-center text-gray-500 animate-pulse border border-gray-100">
              Loading beautiful events...
            </div>
          ) : events.length === 0 ? (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-lg p-12 text-center text-gray-700 border border-purple-100">
              <span className="text-2xl font-bold block mb-4">No events yet.</span>
              Be the first to{' '}
              {user ? (
                <button
                  onClick={() => navigate('/events/new')}
                  className="text-purple-600 font-extrabold hover:text-pink-600 underline transition-colors"
                >
                  create one
                </button>
              ) : (
                <span className="text-purple-600 font-extrabold">create one</span>
              )}
              !
            </div>
          ) : (
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}
              className="grid gap-8 md:grid-cols-3 relative z-10"
            >
              {events.slice(0, 3).map((event) => (
                <motion.div variants={fadeUpVariants} key={event._id} className="h-full">
                  <Tilt scale={1.03} transitionSpeed={2500} tiltMaxAngleY={7} tiltMaxAngleX={7} className="h-full">
                    <div
                      className="h-full bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.2)] transition-all duration-300 p-8 border border-white flex flex-col justify-between cursor-pointer group"
                      onClick={() => navigate('/events')}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200/50">
                            {event.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-base text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <span className="font-semibold text-gray-500 bg-gray-50 px-3 py-1 rounded-lg text-sm flex items-center">
                          📍 {event.city}
                        </span>
                        <span className="font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-lg text-sm flex items-center">
                          <Users className="w-4 h-4 mr-1"/>
                          {Array.isArray(event.participants) ? event.participants.length : 0}
                        </span>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="text-center mt-16">
            <button
              onClick={() => navigate('/events')}
              className="inline-flex items-center bg-gray-900 text-white font-bold px-8 py-4 rounded-full hover:bg-gray-800 transform hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Explore the Feed <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Add ArrowRight icon since we just used it at the bottom button!
function ArrowRight(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

export default Home;
