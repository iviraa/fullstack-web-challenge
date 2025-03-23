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
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // Validation checks for the password
  const isPasswordValid =
    form.password.length >= 6 &&
    /[0-9]/.test(form.password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(form.password) &&
    /[A-Z]/.test(form.password);

  // Check if confirm password matches password
  const isConfirmValid =
    form.confirmPassword && form.confirmPassword === form.password;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation before calling API
    if (!isPasswordValid) {
      setError(
        "Password must be at least 6 characters long and include a number, a special character, and an uppercase letter."
      );
      return;
    }
    if (!isConfirmValid) {
      setError("Passwords do not match.");
      return;
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
        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter your details to sign up.
        </Typography>
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
              slotProps={{
                endAdornment: isConfirmValid ? (
                  <InputAdornment position="end">
                    <CheckCircleIcon color="success" />
                  </InputAdornment>
                ) : null,
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
              slotProps={{
                endAdornment: isConfirmValid ? (
                  <InputAdornment position="end">
                    <CheckCircleIcon color="success" />
                  </InputAdornment>
                ) : null,
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
