import { X, Github, Facebook, Twitter, Chrome, Loader2 } from 'lucide-react'; 
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

export function AuthPopup() {
  const { login, loadingProvider } = useFirebaseAuth();
  const [authUser, setAuthUser] = useAuth();

  const providerButtons = [
    { id: 'google', name: 'Google', icon: Chrome, bg: 'bg-slate-800 hover:bg-slate-700 border-slate-700' },
    { id: 'github', name: 'GitHub', icon: Github, bg: 'bg-[#24292e] hover:bg-[#1a1e22] border-slate-700' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, bg: 'bg-[#1877F2] hover:bg-[#166fe5] border-transparent' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, bg: 'bg-black hover:bg-slate-900 border-slate-800' },
  ];

  // Inside AuthPop.jsx after Firebase gives you the user data
const handleProviderLogin = async (providerId) => {
    try {
      // 1. Get user from Firebase via your hook
      const firebaseUser = await login(providerId);
      if (!firebaseUser) return;

      // 2. Prepare data for MongoDB
      const syncData = {
        fullname: firebaseUser.displayName,
        email: firebaseUser.email,
        firebaseUid: firebaseUser.uid,
        profilePic: firebaseUser.photoURL,
        authSource: providerId,
      };

      // 3. Sync with your Backend
      const res = await axios.post("http://localhost:4001/user/social-login", syncData);
      
      // 4. Alert the backend message ("Login successful" or "User registered...")
      alert(res.data.message);

      if (res.data.user) {
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        setAuthUser(res.data.user);
        document.getElementById("aut_popup").close();
      }
    } catch (err) {
      // Alert backend error if sync fails
      const errorMsg = err.response?.data?.message || "Social login failed";
      alert(errorMsg);
    }
  };

  return (
    <dialog id="aut_popup" className="modal backdrop-blur-md">
      <div className="modal-box bg-[#0f172a] border border-slate-800 rounded-[2.5rem] p-8 max-w-sm shadow-2xl overflow-hidden">
        {/* ... Header and Close Button ... */}

        <div className="flex flex-col gap-3">
          {providerButtons.map((provider) => (
            <button 
              key={provider.id}
              onClick={() => handleProviderLogin(provider.id)} // Call our new sync function
              disabled={loadingProvider !== null}
              className={`flex items-center justify-center gap-3 w-full py-4 px-4 ${provider.bg} text-white font-bold rounded-2xl transition-all active:scale-95 border disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loadingProvider === provider.id ? (
                <Loader2 size={20} className="animate-spin text-sky-400" />
              ) : (
                <provider.icon size={20} />
              )}
              <span>{loadingProvider === provider.id ? 'Connecting...' : `Continue with ${provider.name}`}</span>
            </button>
          ))}
        </div>
        {/* ... Footer ... */}
      </div>
    </dialog>
  );
}