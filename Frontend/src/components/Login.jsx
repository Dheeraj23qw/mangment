
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Mail, Lock, LogIn, X, ShieldCheck } from "lucide-react"; // Added ShieldCheck
import { AuthPopup } from "./AuthPop";

function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const onSubmit = async (data) => {
  const userInfo = {
    email: data.email,
    password: data.password,
  };

  try {
    const res = await axios.post("http://localhost:4001/user/login", userInfo);
    
    if (res.data) {
      // 1. Alert the success message coming from backend
      alert(res.data.message || "🎉 Welcome back!");
      
      localStorage.setItem("Users", JSON.stringify(res.data.user));
      setAuthUser(res.data.user);
      
      // Close modal
      document.getElementById("my_modal_3").close();
    }
  } catch (err) {
    if (err.response) {
      // 2. Alert the specific error message sent from your backend controller
      const backendMessage = err.response.data.message;
      alert(backendMessage);

      // 3. Logic: If the backend says they need Social Login, switch modals automatically
      if (backendMessage.toLowerCase().includes("social") || 
          backendMessage.toLowerCase().includes("google")) {
        document.getElementById("my_modal_3").close(); // Close Login
        document.getElementById("aut_popup").showModal(); // Open Social Popup
      }
    } else {
      // Handle network errors or server being down
      alert("Network Error: Could not connect to server");
    }
  }
};

  return (
    <div>
      <dialog id="my_modal_3" className="modal backdrop-blur-md">
        <div className="modal-box bg-[#0f172a] border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-500/10 blur-[50px] rounded-full pointer-events-none"></div>

          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <button
              type="button"
              className="absolute right-6 top-6 text-slate-500 hover:text-white transition-colors"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-black text-white tracking-tight">
                Welcome <span className="text-sky-400">Back</span>
              </h3>
              <p className="text-slate-400 text-sm mt-1">Please enter your details to sign in.</p>
            </div>

            {/* Email Input */}
            <div className="space-y-2 mb-5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:border-sky-500 outline-none transition-all placeholder:text-slate-700"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && <span className="text-xs text-red-500 ml-1">This field is required</span>}
            </div>

            {/* Password Input */}
            <div className="space-y-2 mb-8">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:border-sky-500 outline-none transition-all placeholder:text-slate-700"
                  {...register("password", { required: true })}
                />
              </div>
              {errors.password && <span className="text-xs text-red-500 ml-1">This field is required</span>}
            </div>

            <button className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-sky-500/20 active:scale-[0.98] flex items-center justify-center gap-2 mb-6">
              <LogIn size={20} />
              Sign In
            </button>
          </form>

          {/* --- Fast Auth Section --- */}
          <div className="mb-6">
            <div className="relative flex items-center justify-center mb-6">
              <div className="w-full border-t border-slate-800"></div>
              <span className="bg-[#0f172a] px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest absolute">Or use fast auth</span>
            </div>

            <button 
              type="button"
              onClick={() => {
                document.getElementById("my_modal_3").close(); // Close login modal
                document.getElementById("aut_popup").showModal(); // Open social modal
              }}
              className="w-full bg-slate-800/40 hover:bg-slate-800 border border-slate-800 text-white py-3 rounded-2xl transition-all flex items-center justify-center gap-2 group"
            >
              <ShieldCheck size={18} className="text-sky-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold">Social Login</span>
            </button>
          </div>

          <div className="text-center">
            <p className="text-slate-400 text-sm">
              New here?{" "}
              <Link
                to="/signup"
                className="text-sky-400 font-bold hover:underline ml-1"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
        
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Social Auth Popup Modal */}
      <AuthPopup />
    </div>
  );
}

export default Login;