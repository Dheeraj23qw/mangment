import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { UserPlus, Mail, Lock, User, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from "../context/AuthProvider";
import { AuthPopup } from './AuthPop';


function SignUp() {
  const [authUser, setAuthUser] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("http://localhost:4001/user/signup", userInfo);
      if (res.data) {
        // Use backend success message
        alert(res.data.message || "🎉 Signup Successful!");
        
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        setAuthUser(res.data.user);
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong. Please check your connection.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6 relative overflow-hidden py-12">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl">
          
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-6 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-white tracking-tight">
              Join <span className="text-sky-400">Us</span>
            </h1>
            <p className="text-slate-400 mt-2 text-sm">Create an account to start booking events.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:border-sky-500 outline-none transition-all placeholder:text-slate-700"
                  {...register('fullname', { required: true })}
                />
              </div>
              {errors.fullname && <span className="text-xs text-red-500 ml-1">Name is required</span>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:border-sky-500 outline-none transition-all placeholder:text-slate-700"
                  {...register('email', { required: true })}
                />
              </div>
              {errors.email && <span className="text-xs text-red-500 ml-1">Email is required</span>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:border-sky-500 outline-none transition-all placeholder:text-slate-700"
                  {...register('password', { required: true })}
                />
              </div>
              {errors.password && <span className="text-xs text-red-500 ml-1">Password is required</span>}
            </div>

            <button className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-sky-500/20 active:scale-[0.98] mt-4 flex items-center justify-center gap-2">
              <UserPlus size={20} />
              Create Account
            </button>
          </form>

          {/* Auth Popup Trigger */}
          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="w-full border-t border-slate-800"></div>
              <span className="bg-[#0f172a] px-4 text-xs font-bold text-slate-500 uppercase tracking-widest absolute">Or use fast auth</span>
            </div>

            <button 
              type="button"
              onClick={() => document.getElementById("aut_popup").showModal()}
              className="w-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 group"
            >
              <ShieldCheck size={18} className="text-sky-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold">Other Login Options</span>
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                className="text-sky-400 font-bold hover:underline ml-1"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Login
              </button>
            </p>
          </div>

          {/* Modals are placed at the bottom for better DOM hierarchy */}
          <Login />
          <AuthPopup /> 
        </div>
      </div>
    </div>
  );
}

export default SignUp;