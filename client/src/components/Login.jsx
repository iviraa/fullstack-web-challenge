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
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Stack spacing={3}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 600 }}>
            Log In
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                variant="outlined"
                type="password"
                value={form.password}
                onChange={handleChange}
              />
              <Button fullWidth variant="contained" type="submit" size="large">
                Log In
              </Button>
            </Stack>
          </form>
          <Typography variant="body2" align="center">
            Don't have an account?{" "}
            <MuiLink component={Link} to="/register" underline="hover">
              Sign Up
            </MuiLink>
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Login;
