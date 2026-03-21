import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Globe, Heart, ShieldCheck, Sparkles, Users, Zap } from 'lucide-react';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 12 } }
};

const AnimatedGlobe = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.06] overflow-hidden">
    <motion.div
      animate={{ rotateY: 360 }}
      initial={{ rotateX: 15, rotateZ: -10 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
      className="relative w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] lg:w-[1500px] lg:h-[1500px] rounded-full"
    >
      {/* 🌐 Longitude Rings */}
      {Array.from({ length: 24 }).map((_, i) => (
        <div 
          key={`lng-${i}`}
          className="absolute inset-0 border-[2px] border-purple-900 rounded-full"
          style={{ transform: `rotateY(${i * (180 / 24)}deg)` }}
        />
      ))}
      
      {/* 🌐 Latitude Rings */}
      {Array.from({ length: 15 }).map((_, i) => {
         const angle = (i - 7) * 11.25; 
         const radius = Math.cos(angle * (Math.PI / 180)) * 100; 
         const yOffset = Math.sin(angle * (Math.PI / 180)) * 50; 
         return (
           <div 
             key={`lat-${i}`}
             className="absolute left-1/2 top-1/2 border-[2px] border-purple-900 rounded-full"
             style={{ 
               width: `${radius}%`, 
               height: `${radius}%`,
               transform: `translate(-50%, -50%) translateY(${yOffset * 2}%) rotateX(90deg)`
             }}
           />
         );
      })}
    </motion.div>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen relative bg-[#f9fafc] overflow-hidden pb-32">
      
      {/* 🌍 3D Wireframe Globe Background */}
      <AnimatedGlobe />

      {/* 🔮 Animated Ambient Background Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-multiply">
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[0%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-pink-400/20 blur-[130px]" 
        />
        <motion.div 
          animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-purple-400/20 blur-[150px]" 
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-20">
        
        {/* 🎆 Hero Header Section */}
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="text-center mb-20">
          <motion.div variants={fadeUp} className="inline-flex items-center justify-center p-4 bg-white rounded-3xl mb-8 shadow-sm border border-gray-100">
            <Globe className="w-10 h-10 text-purple-600 animate-spin-slow" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 mb-6 tracking-tight drop-shadow-sm">
            About Vibely
          </motion.h1>
          <motion.p variants={fadeUp} className="text-gray-500 text-2xl font-bold max-w-3xl mx-auto leading-relaxed">
            We are redefining how humans connect in the physical world. No more swiping. Only real experiences, real people, and authentic vibes.
          </motion.p>
        </motion.div>

        {/* 💎 3D Mission Cards Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
        >
          {/* Card 1 */}
          <motion.div variants={fadeUp} className="h-full">
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.03} transitionSpeed={2000} className="h-full">
              <div className="h-full bg-white/70 backdrop-blur-3xl rounded-[2.5rem] p-10 border-2 border-white shadow-[0_15px_40px_rgba(168,85,247,0.08)] hover:shadow-[0_25px_50px_rgba(168,85,247,0.15)] flex flex-col justify-center items-center text-center transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white">
                  <Users className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Community First</h3>
                <p className="text-gray-600 text-lg font-medium leading-relaxed">
                  Every feature we build is designed to eradicate loneliness by pushing people out of their digital silos and into collaborative local gatherings.
                </p>
              </div>
            </Tilt>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={fadeUp} className="h-full">
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.03} transitionSpeed={2000} className="h-full">
              <div className="h-full bg-white/70 backdrop-blur-3xl rounded-[2.5rem] p-10 border-2 border-white shadow-[0_15px_40px_rgba(236,72,153,0.08)] hover:shadow-[0_25px_50px_rgba(236,72,153,0.15)] flex flex-col justify-center items-center text-center transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white">
                  <Heart className="w-10 h-10 text-pink-600" fill="currentColor" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Authentic Moments</h3>
                <p className="text-gray-600 text-lg font-medium leading-relaxed">
                  We verify users, moderate communities deeply, and prioritize high-quality interaction mechanics over generic algorithmic feed scrolling.
                </p>
              </div>
            </Tilt>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={fadeUp} className="h-full">
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.03} transitionSpeed={2000} className="h-full">
              <div className="h-full bg-white/70 backdrop-blur-3xl rounded-[2.5rem] p-10 border-2 border-white shadow-[0_15px_40px_rgba(245,158,11,0.08)] hover:shadow-[0_25px_50px_rgba(245,158,11,0.15)] flex flex-col justify-center items-center text-center transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white">
                  <ShieldCheck className="w-10 h-10 text-orange-500" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Safe Ecosystem</h3>
                <p className="text-gray-600 text-lg font-medium leading-relaxed">
                  Safety maps directly to comfort. From granular host controls to rapid invalidation caching, we engineer peace of mind into every system.
                </p>
              </div>
            </Tilt>
          </motion.div>
        </motion.div>


      </div>
    </div>
  );
};

export default About;
