import React, { useState, useEffect } from "react";
import { Loader2, Ticket } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

const BookTickets = () => {
  const [authUser] = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookedEvents = async () => {
      // 1. Safety check for authUser
      if (!authUser?._id) return;

      try {
        setLoading(true);
        
        // 2. FIX: Corrected URL (Removed the extra '}' and changed path to payment)
        const response = await axios.get(
          `http://localhost:4001/event/created/${authUser._id}`
        );
          const bookedEventsOnly = response.data.data.bookedEvents;
        
        setEvents(bookedEventsOnly || []);
      } catch (error) {
        console.error("Error fetching your booked events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookedEvents();
  }, [authUser?._id]);

  return (
    <div className="min-h-screen bg-[#020617] pt-28 px-6 text-white pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">
            My <span className="text-sky-400">Tickets</span>
          </h1>
          <p className="text-slate-400">Access your confirmed event bookings and digital tickets.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-sky-400 mb-4" size={40} />
            <p className="text-slate-500 font-medium">Retrieving your tickets...</p>
          </div>
        ) : events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event._id} className="bg-[#0f172a]/60 border border-slate-800 rounded-[2rem] p-6 hover:border-sky-500/50 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-sky-500/10 rounded-2xl text-sky-400">
                    <Ticket size={24} />
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/20">
                    CONFIRMED
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-sky-400 transition-colors">
                  {event.heading || event.title}
                </h3>
                
                <div className="space-y-2 mb-6 text-sm">
                  <p className="text-slate-400 flex justify-between">
                    <span>Venue:</span>
                    <span className="text-white">{event.location || "Online"}</span>
                  </p>
                  <p className="text-slate-400 flex justify-between">
                    <span>Price Paid:</span>
                    <span className="text-white font-bold">₹{event.price}</span>
                  </p>
                </div>

                <button className="w-full bg-slate-800 hover:bg-sky-500 text-white py-3 rounded-xl font-bold text-sm transition-all active:scale-95">
                  View Ticket Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0f172a]/30 rounded-[3rem] border border-dashed border-slate-800">
            <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
               <Ticket size={32} className="text-slate-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">No Tickets Found</h2>
            <p className="text-slate-500 mb-8">You haven't booked any events yet.</p>
            <a href="/" className="bg-sky-500 px-8 py-3 rounded-xl font-bold hover:bg-sky-400 transition-all text-sm">
              Find Events to Join
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookTickets;