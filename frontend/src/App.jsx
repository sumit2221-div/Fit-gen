import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/header.jsx";
import Home from "./pages/home.jsx";
import Footer from "./components/footer.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import GenrateWorkoutPage from "./pages/GenrateWorkout.jsx";
import "./App.css";
import GetWorkout from "./pages/GetWorkout.jsx";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/generate-workout" element={<GenrateWorkoutPage />} />
            <Route path="/get-workout" element={<GetWorkout />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
