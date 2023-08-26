import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/index";
import "./App.css";
import ThemeProvider from "./theme";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
