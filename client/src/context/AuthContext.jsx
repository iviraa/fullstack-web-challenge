import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log("AuthProvider rendered");
  const [loading, setLoading] = useState(true);

  const [isAuth, setIsAuth] = useState({ token: null, user: null });

  // Check for token and Validate on Mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
   
    const user = storedUser ? JSON.parse(storedUser) : null;

    console.log("Retrieved token:", token);
    if (token) {
      setIsAuth({ token, user });
    } else {
      setIsAuth({ token: null, user: null });
    }

    setLoading(false);
  }, []);

  const login = (token, user) => {
    console.log("Logging in...");
    localStorage.setItem("token", token);
    console.log("User persist:", user);
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuth({ token, user });
  };

  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
