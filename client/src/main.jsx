import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#333333", 
    },
    secondary: {
      main: "#F7F7F7", 
    },
    background: {
      default: "#ffffff", 
      paper: "#f7f7f7",   
    },
    text: {
      primary: "#333333", 
      secondary: "#666666",
    },
    success: {
      main: "#34d399", 
    },
    error: {
      main: "#f87171", 
    },
  },
  typography: {
    fontFamily: "Montserrat, Inter, Roboto, sans-serif",
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
