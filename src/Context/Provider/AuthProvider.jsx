import React, { use, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../../Firebase/Firebase.init";
import AuthContext from "../Context/Contex";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const creteUserWithGoogle = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      return () => unsubscribe();
    });
  }, []);

  const userInfo = {
    user,
    logout,
    createUser,
    setLoading,
    creteUserWithGoogle,
    userLogin,
    loading,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;