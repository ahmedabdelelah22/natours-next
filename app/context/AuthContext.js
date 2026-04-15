// context/AuthContext.jsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { getMe } from '../_lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // on refresh → read token from localStorage
    const token = localStorage.getItem('jwt');
    if (token) {
      getMe(token).then(user => {
        setUser(user);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { loginUser } = await import('../_lib/api');
    const data = await loginUser(email, password);
    localStorage.setItem('jwt', data.token); // ← save token
    const user = await getMe(data.token);
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('jwt'); // ← clear token
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading ,setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// ❌ login from api.js
//    → calls API ✅
//    → saves token in localStorage ✅
//    → but user NOT set in context ❌
//    → Navbar shows no user after login ❌

// ✅ login from AuthContext
//    → calls API ✅
//    → saves token in localStorage ✅
//    → fetches user via getMe() ✅
//    → sets user in context ✅
//    → Navbar shgows user name ✅