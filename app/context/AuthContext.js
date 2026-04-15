'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { getMe } from '../_lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // No localStorage — ask backend if we're logged in via cookie
    getMe().then(user => {
      setUser(user || null);
      setLoading(false);
    });
  }, []);

  const login = async (email, password) => {
    const { loginUser } = await import('../_lib/api');
    const data = await loginUser(email, password);
    // No localStorage — cookie is set by backend automatically
    const user = await getMe();
    setUser(user);
    return user;
  };

  const logout = async () => {
    const { logoutUser } = await import('../_lib/api');
    await logoutUser(); // clears the cookie on backend
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);