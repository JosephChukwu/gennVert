import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import { Stack } from "@mui/material";

// import React from 'react'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Stack>
    </BrowserRouter>
  );
};

export default App;
