import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/header.jsx";
import Home from "./pages/home.jsx";
import Footer from "./components/footer.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import GenrateWorkoutPage from "./pages/GenrateWorkout.jsx";
import GetWorkout from "./pages/GetWorkout.jsx";
import CheckAuth from "./pages/checkauth.jsx"; // Import CheckAuth component
import "./App.css";
import GenrateDietPage from "./pages/genratediet.jsx";
import GetDiet from "./pages/getdiet.jsx";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Navbar />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <CheckAuth>
                  <Home />
                </CheckAuth>
              }
            />
            <Route
              path="/generate-workout"
              element={
                <CheckAuth>
                  <GenrateWorkoutPage />
                </CheckAuth>
              }
            />
            <Route
              path="/get-workout/:workoutId"
              element={
                <CheckAuth>
                  <GetWorkout />
                </CheckAuth>
              }
            />
            <Route
              path="/generate_diet"
              element={
                <CheckAuth>
                  <GenrateDietPage />
                </CheckAuth>
              }
            />
            <Route
              path="/get_diet"
              element={
                <CheckAuth>
                  <GetDiet />
                </CheckAuth>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
