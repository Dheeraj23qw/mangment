import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReceiptText, Inbox, ShoppingBag, Loader2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const BookingHistory = () => {
  const [authUser] = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchHistory = async () => {
      // DEBUG LOG 1: Check if authUser is available
      console.log("Fetching history for user ID:", authUser?._id);

      if (!authUser?._id) {
        console.warn("No authUser ID found. Skipping fetch.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const url = `http://localhost:4001/payment/transaction-history/${authUser._id}`;
        
        // DEBUG LOG 2: Check the exact URL being called
        console.log("Calling API:", url);

        const response = await axios.get(url);

        // DEBUG LOG 3: Inspect the full response from the server
        console.log("API Response Data:", response.data);

        if (response.data.success) {
          setTransactions(response.data.history || []);
          console.log("Successfully set transactions:", response.data.history.length, "items found.");
        } else {
          console.error("API returned success: false", response.data.message);
        }
      } catch (error) {
        // DEBUG LOG 4: Log any network or server errors
        console.error("Axios Error Fetching History:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [authUser?._id]);

  return (
    <div className="min-h-screen bg-[#020617] pt-28 px-6 pb-12 text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-sky-500/10 rounded-2xl text-sky-400 shadow-lg shadow-sky-500/5">
              <ReceiptText size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                Transaction <span className="text-sky-400">History</span>
              </h1>
              <p className="text-slate-400 text-sm mt-1">View and manage your past event bookings.</p>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-[#0f172a]/50 border border-slate-800 rounded-[2rem] overflow-hidden backdrop-blur-sm shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
                <th className="px-8 py-6">Transaction ID</th>
                <th className="px-8 py-6">Event</th>
                <th className="px-8 py-6">Date</th>
                <th className="px-8 py-6">Amount</th>
                <th className="px-8 py-6">Status</th>
              </tr>
            </thead>
            
            <tbody className="text-sm">
              {loading ? (
                /* LOADING STATE */
                <tr>
                  <td colSpan="5" className="py-24 text-center">
                    <Loader2 className="animate-spin text-sky-400 mx-auto mb-4" size={32} />
                    <p className="text-slate-500 font-bold">Fetching records...</p>
                  </td>
                </tr>
              ) : transactions.length > 0 ? (
                transactions.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="px-8 py-6 font-mono text-sky-400 text-xs">
                       {/* Show short version of Stripe ID */}
                      {t.transactionId ? `${t.transactionId.substring(0, 14)}...` : "N/A"}
                    </td>
                    <td className="px-8 py-6 font-bold group-hover:text-sky-400 transition-colors">
                      {t.eventId?.heading || "Event Deleted"}
                    </td>
                    <td className="px-8 py-6 text-slate-400">
                      {new Date(t.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-8 py-6 font-bold text-white">₹{t.amount}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold border shadow-sm ${
                        t.status === 'completed' 
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}>
                        {t.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                /* MODERN TABLE EMPTY STATE */
                <tr>
                  <td colSpan="5" className="py-24 px-8">
                    <div className="flex flex-col items-center justify-center text-center relative">
                      <div className="absolute w-48 h-48 bg-sky-500/5 blur-[80px] rounded-full pointer-events-none"></div>
                      <div className="relative z-10">
                        <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transition-transform hover:scale-110 duration-500">
                          <Inbox size={32} className="text-slate-600" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">No Transactions Yet</h2>
                        <p className="text-slate-400 max-w-xs mx-auto mb-8 text-sm leading-relaxed">
                          Your booking history is empty. Once you book an event, your receipts will appear here.
                        </p>
                        <Link
                          to="/"
                          className="inline-flex items-center gap-2 bg-white text-[#020617] px-8 py-3.5 rounded-2xl font-bold text-xs hover:bg-sky-400 hover:text-white transition-all shadow-lg active:scale-95"
                        >
                          <ShoppingBag size={16} />
                          Browse Events
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        {!loading && transactions.length > 0 && (
          <p className="mt-6 text-center text-slate-500 text-xs">
            Showing {transactions.length} recent transactions.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;