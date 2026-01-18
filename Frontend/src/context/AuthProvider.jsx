import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config"; // Import your singleton auth

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const getInitialAuthUser = () => {
    try {
      const storedUser = localStorage.getItem("Users");
      if (storedUser && storedUser !== "undefined") {
        return JSON.parse(storedUser);
      }
    } catch (error) {
      console.error("Failed to parse auth user from localStorage:", error);
      localStorage.removeItem("Users");
    }
    return undefined;
  };

  const [authUser, setAuthUser] = useState(getInitialAuthUser());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Map Firebase user data to your state structure
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        setAuthUser(userData);
        localStorage.setItem("Users", JSON.stringify(userData));
      } else {
        setAuthUser(null);
        localStorage.removeItem("Users");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// {"uid":"RHsdO0wFIAZwRm52YrEDtLTwqCA3","email":"rahulkumar9508820247@gmail.com","displayName":"Dheeraj Kumar","photoURL":"https://lh3.googleusercontent.com/a/ACg8ocLbNjTnWCzP-ucl35M3dLxitYjRPQcGAde-ZhGj8oo-3xp_PMfS=s96-c"}