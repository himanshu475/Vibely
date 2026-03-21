import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Tag, Type, FileText, Sparkles, Plus } from 'lucide-react';
import { createEvent } from '../services/api';
import { UserContext } from '../context/UserContext';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const categories = ['Sports', 'Study', 'Arts', 'Music', 'Hangout', 'Other'];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const CreateEvent = () => {
  const { token, user } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Sports',
    city: user?.city || '',
    date: '',
    participantLimit: 5,
    tags: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'participantLimit' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('You need to be logged in to create an event.');
      return;
    }

    if (!form.title || !form.description || !form.city || !form.date) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!form.participantLimit || form.participantLimit <= 0) {
      setError('Participant limit must be a positive number.');
      return;
    }

    const eventDate = new Date(form.date);
    if (Number.isNaN(eventDate.getTime()) || eventDate < new Date()) {
      setError('Please choose a future date and time.');
      return;
    }

    const tagsArray = form.tags
      ? form.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      city: form.city,
      date: eventDate.toISOString(),
      participantLimit: form.participantLimit,
      tags: tagsArray,
    };

    try {
      setSubmitting(true);
      await createEvent(payload, token);
      navigate('/events');
    } catch (err) {
      console.error('Failed to create event:', err);
      setError(err?.msg || 'Failed to create event. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-[#f9fafc] overflow-hidden pb-32">
      {/* 🔮 Animated Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[0%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-purple-400/20 blur-[130px]" 
        />
        <motion.div 
          animate={{ x: [0, -60, 0], y: [0, 60, 0], scale: [1, 1.4, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-400/20 blur-[140px]" 
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-16">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-6 shadow-sm border border-white">
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 mb-4 tracking-tight drop-shadow-sm">
            Host an Experience
          </h1>
          <p className="text-gray-500 text-xl font-bold max-w-xl mx-auto">
            Design your event, set the vibe, and invite the community.
          </p>
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 max-w-2xl mx-auto bg-red-50/90 backdrop-blur-md border border-red-200 text-red-700 text-sm font-bold px-6 py-4 rounded-2xl shadow-sm text-center">
            {error}
          </motion.div>
        )}

        <Tilt 
          tiltMaxAngleX={1} 
          tiltMaxAngleY={1} 
          perspective={2000} 
          scale={1.005} 
          transitionSpeed={3000}
          glareEnable={true}
          glareMaxOpacity={0.03}
          glarePosition="all"
          glareBorderRadius="3rem"
          className="max-w-3xl mx-auto"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="bg-white/70 backdrop-blur-3xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-8 md:p-12 border-2 border-white relative overflow-hidden"
          >
            {/* Inner ambient light overlay */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[80%] bg-gradient-to-b from-white to-transparent -z-10 blur-[40px]" />

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              
              <motion.div variants={itemVariants}>
                <label className="flex items-center text-sm font-black uppercase tracking-widest text-gray-500 mb-3">
                  <Type className="w-4 h-4 mr-2" />
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/60 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-400 focus:bg-white outline-none transition-all duration-300 text-lg font-bold placeholder-gray-400 shadow-inner"
                  placeholder="e.g. Sunday Evening Football"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="flex items-center text-sm font-black uppercase tracking-widest text-gray-500 mb-3">
                  <FileText className="w-4 h-4 mr-2" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-6 py-4 bg-white/60 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-400 focus:bg-white outline-none resize-none transition-all duration-300 text-lg font-medium placeholder-gray-400 shadow-inner"
                  placeholder="Describe what the event is about, who it's for, and what to expect."
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="flex items-center text-sm font-black uppercase tracking-widest text-gray-500 mb-3">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/60 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-400 focus:bg-white outline-none transition-all duration-300 text-lg font-bold shadow-inner"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="font-bold">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-sm font-black uppercase tracking-widest text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    City Location
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/60 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-400 focus:bg-white outline-none transition-all duration-300 text-lg font-bold placeholder-gray-400 shadow-inner"
                    placeholder="e.g. Surat"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="flex items-center text-sm font-black uppercase tracking-widest text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/60 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-400 focus:bg-white outline-none transition-all duration-300 text-lg font-bold font-sans shadow-inner text-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-black uppercase tracking-widest text-gray-500 mb-3">
                    <Users className="w-4 h-4 mr-2" />
                    Participant Limit
                  </label>
                  <input
                    type="number"
                    name="participantLimit"
                    min={1}
                    value={form.participantLimit}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/60 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-400 focus:bg-white outline-none transition-all duration-300 text-lg font-bold shadow-inner"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="flex items-center text-sm font-black uppercase tracking-widest text-gray-500 mb-3">
                  <Tag className="w-4 h-4 mr-2" />
                  Tags (optional)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/60 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-400 focus:bg-white outline-none transition-all duration-300 text-lg font-medium placeholder-gray-400 shadow-inner"
                  placeholder="e.g. casual, beginner-friendly, outdoors"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center bg-gray-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-purple-600 transform transition-all duration-300 shadow-xl hover:shadow-purple-500/40 disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-wider group"
                >
                  <Plus className="w-6 h-6 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  {submitting ? 'Creating Event...' : 'Publish Event'}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </Tilt>
      </div>
    </div>
  );
};

export default CreateEvent;
