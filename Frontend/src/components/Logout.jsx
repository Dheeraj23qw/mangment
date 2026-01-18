import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { auth } from "../firebase/config"; // Import your firebase auth
import { signOut } from "firebase/auth";

function Logout() {
  const [authUser, setAuthUser] = useAuth();

  const handleLogout = async () => {
    try {
      // 1. Tell Firebase to sign out (This triggers onAuthStateChanged to set null)
      await signOut(auth);

      // 2. Manually clear state and storage as a backup
      setAuthUser(null);
      localStorage.removeItem("Users");

      alert("Logout successfully");

      // 3. Force a hard redirect to clear all remaining memory
      window.location.href = "/"; 
    } catch (error) {
      alert("Error during logout: " + error.message);
    }
  };

  return (
    <div className='pl-4'>
      <button 
        className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl cursor-pointer hover:bg-red-500 hover:text-white transition-all font-semibold text-sm" 
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;