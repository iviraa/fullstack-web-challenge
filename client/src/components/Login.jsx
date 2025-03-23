import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login:", form);
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
        <Typography variant="body2" color="text.secondary" mb={3}>
          Log in to your account.
        </Typography>
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
