import React from "react";
import {
  FaDumbbell,
  FaAppleAlt,
  FaHeartbeat,
  FaUsers,
  FaMedal,
  FaChartLine,
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
      {/* Spacer for Navbar */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <div
        className="w-full min-h-[60vh] bg-gradient-to-br from-orange-500/80 via-gray-900/90 to-black
        flex flex-col items-center justify-center text-white relative"
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
          className="text-5xl md:text-6xl font-extrabold text-center drop-shadow-lg mt-10"
        >
          Achieve Your <span className="text-orange-400">Fitness Goals</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-xl md:text-2xl text-gray-200 max-w-2xl text-center px-4"
        >
          Personalized workouts, nutrition tracking, and a supportive community—all in one place.
        </motion.p>

        <motion.a
          href="#features"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 px-10 py-4 bg-gradient-to-r from-orange-400 to-orange-600
          text-black font-bold rounded-full shadow-lg text-lg"
        >
          Explore Features
        </motion.a>
      </div>

      {/* Features Section */}
      <div id="features" className="w-full py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <h2 className="text-4xl font-extrabold text-orange-400 text-center mb-12">
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 max-w-6xl mx-auto">
          {/* Workout */}
          <Link to="/get-workout">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-gray-800 border border-orange-400 rounded-2xl shadow-xl text-center"
            >
              <FaDumbbell className="text-5xl text-orange-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-orange-300">Workout Tracker</h3>
              <p className="text-gray-300 mt-2">
                Log workouts, follow plans, and analyze progress.
              </p>
            </motion.div>
          </Link>

          {/* Nutrition */}
          <Link to="/track-nutrition">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-gray-800 border border-green-400 rounded-2xl shadow-xl text-center"
            >
              <FaAppleAlt className="text-5xl text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-300">Nutrition Tracker</h3>
              <p className="text-gray-300 mt-2">
                Track meals, calories, and macros with AI suggestions.
              </p>
            </motion.div>
          </Link>

          {/* Wellness */}
          <Link to="/motivation-wellness">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-gray-800 border border-pink-400 rounded-2xl shadow-xl text-center"
            >
              <FaHeartbeat className="text-5xl text-pink-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-pink-300">Motivation & Wellness</h3>
              <p className="text-gray-300 mt-2">
                Daily tips, challenges and lifestyle support.
              </p>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Fitness Activities */}
      <div className="w-full py-20 bg-gradient-to-br from-orange-400/10 via-gray-900/80 to-black">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto px-4">

          <ActivityCard Icon={FaRunning} color="blue" title="Running Programs" text="Beginner to marathon-level plans." />
          <ActivityCard Icon={FaBiking} color="cyan" title="Cycling Challenges" text="Join rides and track them via GPS." />
          <ActivityCard Icon={FaSwimmer} color="indigo" title="Swimming Logs" text="Monitor laps, speed, and form." />
          <ActivityCard Icon={FaSpa} color="teal" title="Yoga & Flexibility" text="Improve mobility and calm your mind." />

        </div>
      </div>

      {/* Community & Progress */}
      <div className="w-full py-20 bg-gradient-to-br from-orange-400/10 via-gray-900/80 to-black">
        <div className="flex flex-col md:flex-row gap-16 max-w-6xl mx-auto px-4">

          <InfoCard Icon={FaUsers} color="blue" title="Join the Community" text="Connect with fitness enthusiasts and grow together." />
          <InfoCard Icon={FaChartLine} color="emerald" title="Track Progress" text="Beautiful analytics for your milestones." />
          <InfoCard Icon={FaMedal} color="yellow" title="Earn Rewards" text="Get badges and celebrate wins!" />

        </div>
      </div>

      {/* Tools */}
      <div className="w-full py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto px-4">
          <ActivityCard Icon={FaClipboardList} color="orange" title="Personalized Plans" text="AI-tailored workouts & diets." />
          <ActivityCard Icon={FaFire} color="red" title="Calorie Burn Tracker" text="Track calories burned daily." />
        </div>
      </div>
    </>
  );
}

export default Home;

/* Reusable Components */
const ActivityCard = ({ Icon, color, title, text }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`p-8 bg-gray-800 rounded-2xl shadow-xl text-center border border-${color}-400`}
  >
    <Icon className={`text-5xl text-${color}-400 mx-auto mb  -4`} />
    <h3 className={`text-2xl font-bold text-${color}-300`}>{title}</h3>
    <p className="text-gray-300 mt-2">{text}</p>
  </motion.div>
);

const InfoCard = ({ Icon, color, title, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="flex-1 text-center md:text-left"
  >
    <Icon className={`text-6xl text-${color}-400 mb-4 mx-auto md:mx-0`} />
    <h3 className={`text-3xl font-bold text-${color}-300`}>{title}</h3>
    <p className="text-gray-200 mt-2">{text}</p>
  </motion.div>
);
