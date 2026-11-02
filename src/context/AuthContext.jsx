import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "shopzone_users";
const SESSION_KEY = "shopzone_session";

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const readSession = () => {
  try {
    return localStorage.getItem(SESSION_KEY) || null;
  } catch {
    return null;
  }
};

// NOTE: this is a frontend-only demo. Users live in localStorage and passwords
// are stored in plain text. Replace with a real backend before production.
export function AuthProvider({ children }) {
  const [username, setUsername] = useState(readSession);

  const signup = ({ username: rawName, email, password }) => {
    const name = rawName.trim();
    if (name.length < 3) return { ok: false, error: "Username must be at least 3 characters." };
    if (!/^[a-zA-Z0-9_]+$/.test(name))
      return { ok: false, error: "Username can only use letters, numbers and underscores." };
    if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };

    const users = readUsers();
    // Unique username check (case-insensitive)
    if (users.some((u) => u.username.toLowerCase() === name.toLowerCase()))
      return { ok: false, error: "That username is already taken. Try another one." };

    users.push({ username: name, email: email.trim(), password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, name);
    setUsername(name);
    return { ok: true };
  };

  const login = ({ username: rawName, password }) => {
    const user = readUsers().find(
      (u) => u.username.toLowerCase() === rawName.trim().toLowerCase()
    );
    if (!user || user.password !== password)
      return { ok: false, error: "Invalid username or password." };
    localStorage.setItem(SESSION_KEY, user.username);
    setUsername(user.username);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ username, isLoggedIn: !!username, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
