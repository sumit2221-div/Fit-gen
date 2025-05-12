import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/header.jsx";
import Home from "./pages/home.jsx";
import Footer from "./components/footer.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import GenrateWorkoutPage from "./pages/GenrateWorkout.jsx";
import GetWorkout from "./pages/GetWorkout.jsx";

import GenrateDietPage from "./pages/genratediet.jsx";
import GetDiet from "./pages/getdiet.jsx";
import useAuthCheck from "./pages/checkauth.jsx" // ✅ import the hook

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  useAuthCheck(); // ✅ call it here, AFTER Router is initialized

  return (
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
             
                <Home />
            
            }
          />
          <Route
            path="/generate-workout"
            element={
             
                <GenrateWorkoutPage />
              
            }
          />
          <Route
            path="/get-workout"
            element={
            
                <GetWorkout />
             
            }
          />
          <Route
            path="/generate_diet"
            element={
             
                <GenrateDietPage />
             
            }
          />
          <Route
            path="/get_diet"
            element={
              
                <GetDiet />
              
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
