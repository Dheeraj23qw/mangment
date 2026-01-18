import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
// Update the path to match your new folder structure
import { auth, googleProvider, githubProvider, facebookProvider, twitterProvider } from '../firebase/config'; 

export const useFirebaseAuth = () => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const login = async (providerId) => {
    const providers = {
      google: googleProvider,
      github: githubProvider,
      facebook: facebookProvider,
      twitter: twitterProvider
    };

    setLoadingProvider(providerId);
    try {
      // 1. Capture the result from Firebase
      const result = await signInWithPopup(auth, providers[providerId]);
      
      // 2. Return the user object so AuthPopup can use it
      return result.user; 
      
    } catch (error) {
      console.error("Firebase Login Error:", error.message);
      return null; // Return null so the caller knows it failed
    } finally {
      setLoadingProvider(null);
    }
  };

  return { login, loadingProvider };
};