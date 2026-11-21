import { createContext, useContext, useState } from 'react';
import api from '../services/api';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('bugtracker_user') || 'null'));
  const [token, setToken] = useState(localStorage.getItem('bugtracker_token'));
  async function authenticate(endpoint, payload) {
    const { data } = await api.post(`/auth/${endpoint}`, payload);
    localStorage.setItem('bugtracker_token', data.token);
    localStorage.setItem('bugtracker_user', JSON.stringify(data.user));
    setToken(data.token); setUser(data.user); return data;
  }
  function logout() { localStorage.removeItem('bugtracker_token'); localStorage.removeItem('bugtracker_user'); setToken(null); setUser(null); }
  return <AuthContext.Provider value={{ user, token, login: (p) => authenticate('login', p), register: (p) => authenticate('register', p), logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
