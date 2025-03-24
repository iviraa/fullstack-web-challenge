import React, { useContext } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useContext(AuthContext);

  // Show loader while checking auth
  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "primary" }} />
      </Box>
    );

  // Redirect to login if not authenticated
  if (!isAuth.token) return <Navigate to="/login" />;

  // Render child components if authenticated
  return children;
};

export default ProtectedRoute;
