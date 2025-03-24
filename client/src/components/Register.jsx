import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Link as MuiLink,
  InputAdornment,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/Check";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // Check if password is strong
  const isPasswordValid =
    form.password.length >= 6 &&
    /[0-9]/.test(form.password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(form.password) &&
    /[A-Z]/.test(form.password);

  // Check if confirm password matches
  const isConfirmValid =
    form.confirmPassword && form.confirmPassword === form.password;

  // Update form values
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username) {
      setError("Username is required.");
      return;
    }
    if (!form.email) {
      setError("Email is required.");
      return;
    }
    if (!isPasswordValid) {
      setError(
        "Password must be at least 6 characters and include a number, special char, and uppercase letter."
      );
      return;
    }
    if (!isConfirmValid) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${baseUrl}/api/register`, {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
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
          Create an Account
        </Typography>
        {error ? (
          <Typography variant="body2" color="error" mb={3}>
            {error}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary" mb={3}>
            Enter your details to sign up.
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} mb={3}>
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              size="small"
              value={form.username}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              size="small"
              variant="outlined"
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              size="small"
              variant="outlined"
              value={form.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: isPasswordValid && (
                  <InputAdornment position="end">
                    <CheckCircleIcon color="success" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              size="small"
              variant="outlined"
              value={form.confirmPassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: isConfirmValid && (
                  <InputAdornment position="end">
                    <CheckCircleIcon color="success" />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ py: 1.2, fontWeight: "bold" }}
          >
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" mt={2}>
          Already have an account?{" "}
          <MuiLink component={Link} to="/login">
            Login
          </MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
