import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Info, ArrowLeft, Tag, ShieldCheck } from 'lucide-react';
import { getEventById, joinEvent } from '../services/api';
import { UserContext } from '../context/UserContext';

const EventDetails = () => {
  const { id } = useParams();
  const { token, user } = useContext(UserContext); // 'user' to check if they are the host
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

  const isExpired=event ? new Date(event.date)<new Date() :false;

  const isHost = user && event && event.host?._id === user._id;
  const isParticipant = user && event && event.participants?.some(p => p._id === user._id);
  const spotsLeft = event ? event.participantLimit - (event.participants?.length || 0) : 0;

  if (loading) return <div className="text-center mt-20 animate-pulse text-purple-600">Loading Vibely Event...</div>;
  if (error) return <div className="text-center mt-20 text-red-500 bg-red-50 p-4 rounded-xl inline-block mx-auto">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-purple-600 mb-8 transition-colors font-medium">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Explore
      </Link>

      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        
        {/* Left Side: Image/Color Block & Info */}
        <div className="md:w-2/3 p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold uppercase tracking-wider">
              {event.category}
            </span>
            <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase ${
                isExpired 
                ? 'bg-gray-200 text-gray-600' 
                : event.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
            }`}>
              {isExpired ? 'Completed / Passed' : event.status}
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {event.title}
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <Info className="w-5 h-5 mr-2 text-purple-500" /> About this Event
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">{event.description}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-purple-500" /> Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm italic">
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-500" /> Confirmed Attendees ({event.participants?.length})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {event.participants.map((p) => (
                  <div key={p._id} className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold mr-3 shadow-sm">
                      {p.name[0]}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-800 truncate">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.city || 'Member'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Right Side: Action Card */}
        <div className="md:w-1/3 bg-gray-50/50 p-8 border-l border-gray-100">
          <div className="sticky top-8 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-6 h-6 mr-4 text-purple-500" />
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Date & Time</p>
                    <p className="font-semibold">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-6 h-6 mr-4 text-purple-500" />
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Location</p>
                    <p className="font-semibold">{event.city}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700 border-t pt-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-4 overflow-hidden flex items-center justify-center font-bold text-gray-500">
                    {event.host?.name[0]}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Hosted by</p>
                    <p className="font-semibold">{event.host?.name}</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar for Limit */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>Capacity</span>
                  <span className={spotsLeft <= 2 ? 'text-red-500' : 'text-purple-600'}>
                    {spotsLeft} spots left
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${((event.participants?.length || 0) / event.participantLimit) * 100}%` }}
                  ></div>
                </div>
              </div>

              {!isHost && !isParticipant && (
                <button 
                  onClick={() => joinEvent(event._id, token).then(() => alert('Request Sent!'))}
                  disabled={spotsLeft === 0}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:grayscale"
                >
                  {spotsLeft === 0 ? 'Event Full' : 'Request to Join'}
                </button>
              )}
              
              {isHost && (
                <div className="flex items-center justify-center p-4 bg-purple-50 text-purple-700 rounded-2xl font-bold border border-purple-100">
                  <ShieldCheck className="w-5 h-5 mr-2" /> You are the Host
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;