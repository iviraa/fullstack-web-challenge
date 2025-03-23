import { React, CreateContext, useState } from "react";

export const AuthContext = CreateContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState({ token: null, user: null });

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
