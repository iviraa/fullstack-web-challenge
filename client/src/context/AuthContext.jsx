import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State for loading and authentication
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState({ token: null, user: null });

  // Check and validate token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (token) {
      setIsAuth({ token, user });
    } else {
      setIsAuth({ token: null, user: null });
    }

    setLoading(false);
  }, []);

  // Save token and user on login
  const login = (token, user) => {
    localStorage.setItem("tasks:token", token);
    localStorage.setItem("tasks:user", JSON.stringify(user));
    setIsAuth({ token, user });
  };

  // Clear token and user on logout
  const logout = () => {
    localStorage.removeItem("tasks:token");
    localStorage.removeItem("tasks:user");
    setIsAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
