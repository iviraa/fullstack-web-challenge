import React, { useState, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Update form values
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // Send login request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email) {
      setError("Email is required.");
      return;
    }
    if (!form.password) {
      setError("Password is required.");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/login`, {
        email: form.email,
        password: form.password,
      });
      const token = response.data.token;
      localStorage.setItem("tasks:token", token);
      login(token, response.data.user);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome Back
        </Typography>
        {error ? (
          <Typography variant="body2" color="error" mb={3}>
            {error}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary" mb={3}>
            Log in to your account.
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} mb={3}>
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              size="small"
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              size="small"
              value={form.password}
              onChange={handleChange}
            />
          </Stack>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ py: 1.2, fontWeight: "bold" }}
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" mt={2}>
          Don't have an account?{" "}
          <MuiLink component={Link} to="/register">
            Sign Up
          </MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
