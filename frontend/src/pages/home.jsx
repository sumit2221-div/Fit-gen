import React from "react";
import {
  FaDumbbell,
  FaAppleAlt,
  FaHeartbeat,
  FaChartLine,
  FaUsers,
  FaMedal,
  FaBookOpen,
  FaSmile,
  FaCrown,
  FaRunning,
  FaBiking,
  FaSwimmer,
  FaSpa,
  FaClipboardList,
  FaFire,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="w-screen min-h-[60vh] bg-gradient-to-br from-orange-500/80 via-gray-900/90 to-black flex flex-col items-center justify-center text-white relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1500&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-center text-white drop-shadow-lg mt-24"
        >
          Achieve Your <span className="text-orange-400">Fitness Goals</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-2xl text-gray-200 md:max-w-2xl mx-auto text-center"
        >
          Personalized workouts, nutrition tracking, and a supportive community—all in one place.
        </motion.p>
        <motion.a
          href="#features"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 px-10 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-black font-bold rounded-full shadow-lg hover:from-orange-500 hover:to-orange-700 transition duration-300 inline-block text-lg"
        >
          Explore Features
        </motion.a>
      </div>

      {/* Features Section */}
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-16" id="features">
        <div className="container mx-auto text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-extrabold text-orange-400 mb-12 drop-shadow-lg"
          >
            Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch justify-center">
            <Link to="/get-workout" className="w-full max-w-xs mx-auto">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(255,140,0,0.25)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-8 bg-gray-800 rounded-2xl shadow-xl flex flex-col items-center w-full max-w-xs mx-auto border border-orange-400"
            >
              <FaDumbbell className="text-5xl text-orange-400 mb-4 drop-shadow-lg" />
              <h3 className="text-2xl font-bold text-orange-300 mb-2">Workout Tracker</h3>
              <p className="mt-2 text-lg text-gray-300 text-center">
                Log your workouts, follow custom plans, and visualize your progress with interactive charts.
              </p>
            </motion.div>
            </Link>
            <Link to="/track-nutrition" className="w-full max-w-xs mx-auto">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(0,255,127,0.18)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-8 bg-gray-800 rounded-2xl shadow-xl flex flex-col items-center w-full max-w-xs mx-auto border border-green-400"
            >
              <FaAppleAlt className="text-5xl text-green-400 mb-4 drop-shadow-lg" />
              <h3 className="text-2xl font-bold text-green-300 mb-2">Nutrition Tracker</h3>
              <p className="mt-2 text-lg text-gray-300 text-center">
                Track your daily meals, calories, and macros. Get AI-powered diet recommendations.
              </p>
            </motion.div>
            </Link>
            <Link to="/motivation-wellness" className="w-full max-w-xs mx-auto">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(255,0,128,0.18)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-8 bg-gray-800 rounded-2xl shadow-xl flex flex-col items-center w-full max-w-xs mx-auto border border-pink-400"
            >
              <FaHeartbeat className="text-5xl text-pink-400 mb-4 drop-shadow-lg" />
              <h3 className="text-2xl font-bold text-pink-300 mb-2">Motivation & Wellness</h3>
              <p className="mt-2 text-lg text-gray-300 text-center">
                Stay motivated with daily tips, challenges, and wellness tracking for a healthier lifestyle.
              </p>
            </motion.div>
            </Link>
          </div>
        </div>
      </div>

      {/* New Fitness Activities Section */}
      <div className="w-full bg-gradient-to-br from-orange-400/10 via-gray-900/80 to-black py-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-stretch justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-8 bg-gray-800 rounded-2xl shadow-xl flex flex-col items-center border border-blue-400"
          >
            <FaRunning className="text-5xl text-blue-400 mb-4 drop-shadow-lg" />
            <h3 className="text-2xl font-bold text-blue-300 mb-2">Running Programs</h3>
            <p className="mt-2 text-lg text-gray-300 text-center">
              Structured running plans for all levels, from beginner to marathoner.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-8 bg-gray-800 rounded-2xl shadow-xl flex flex-col items-center border border-cyan-400"
          >
            <FaBiking className="text-5xl text-cyan-400 mb-4 drop-shadow-lg" />
            <h3 className="text-2xl font-bold text-cyan-300 mb-2">Cycling Challenges</h3>
            <p className="mt-2 text-lg text-gray-300 text-center">
              Join cycling challenges and track your rides with GPS integration.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-8 bg-gray-800 rounded-2xl shadow-xl flex flex-col items-center border border-indigo-400"
          >
            <FaSwimmer className="text-5xl text-indigo-400 mb-4 drop-shadow-lg" />
            <h3 className="text-2xl font-bold text-indigo-300 mb-2">Swimming Logs</h3>
            <p className="mt-2 text-lg text-gray-300 text-center">
              Record your swim sessions and monitor your aquatic progress.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-8 bg-gray-800 rounded-2xl shadow-xl flex flex-col items-center border border-teal-400"
          >
            <FaSpa className="text-5xl text-teal-400 mb-4 drop-shadow-lg" />
            <h3 className="text-2xl font-bold text-teal-300 mb-2">Yoga & Flexibility</h3>
            <p className="mt-2 text-lg text-gray-300 text-center">
              Guided yoga routines and flexibility exercises for mind and body.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Extra Section: Community & Progress */}
      <div className="w-full bg-gradient-to-br from-orange-400/10 via-gray-900/80 to-black py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 flex flex-col items-center text-center md:text-left"
          >
            <FaUsers className="text-6xl text-blue-400 mb-4 drop-shadow-lg" />
            <h3 className="text-3xl font-bold text-blue-300 mb-2">Join the Community</h3>
            <p className="text-lg text-gray-200">
              Connect with fitness enthusiasts, share your journey, and get support from a vibrant community.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 flex flex-col items-center text-center md:text-left"
          >
            <FaChartLine className="text-6xl text-emerald-400 mb-4 drop-shadow-lg" />
            <h3 className="text-3xl font-bold text-emerald-300 mb-2">Track Your Progress</h3>
            <p className="text-lg text-gray-200">
              Visualize your achievements and milestones with beautiful analytics and progress charts.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 flex flex-col items-center text-center md:text-left"
          >
            <FaMedal className="text-6xl text-yellow-400 mb-4 drop-shadow-lg" />
            <h3 className="text-3xl font-bold text-yellow-300 mb-2">Earn Rewards</h3>
            <p className="text-lg text-gray-200">
              Complete challenges, earn badges, and celebrate your fitness victories!
            </p>
          </motion.div>
        </div>
      </div>

      {/* New Section: Tools & Burn Tracker */}
      <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-8 bg-gray-800 rounded-2xl shadow-xl flex flex-col items-center border border-orange-400"
          >
            <FaClipboardList className="text-5xl text-orange-400 mb-4 drop-shadow-lg" />
            <h3 className="text-2xl font-bold text-orange-300 mb-2">Personalized Plans</h3>
            <p className="mt-2 text-lg text-gray-300 text-center">
              Get custom workout and diet plans tailored to your goals and preferences.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-8 bg-gray-800 rounded-2xl shadow-xl flex flex-col items-center border border-red-400"
          >
            <FaFire className="text-5xl text-red-400 mb-4 drop-shadow-lg" />
            <h3 className="text-2xl font-bold text-red-300 mb-2">Calorie Burn Tracker</h3>
            <p className="mt-2 text-lg text-gray-300 text-center">
              Track your calories burned during workouts and daily activities.
            </p>
          </motion.div>
        </div>
      </div>

     
    </>
  );
}

export default Home;
