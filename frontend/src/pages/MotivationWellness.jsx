import React, { useState } from "react";
import { FaHeartbeat, FaQuoteLeft, FaQuoteRight, FaSmile } from "react-icons/fa";
import { motion } from "framer-motion";

const quotes = [
  
  // Workout-specific motivation
  "Sweat is just fat crying.",
  "No pain, no gain. Shut up and train.",
  "The difference between try and triumph is a little 'umph'.",
  "When you feel like quitting, think about why you started.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Don’t count the days, make the days count.",
  "Your only limit is you.",
  "Train insane or remain the same.",
  "The hardest lift of all is lifting your butt off the couch.",
  "Excuses don’t burn calories.",
];

function MotivationWellness() {
  const [quote, setQuote] = useState(quotes[0]);

  const handleNewQuote = () => {
    let newQuote;
    do {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote === quote);
    setQuote(newQuote);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-400/20 via-gray-900 to-black text-white px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gray-800 bg-opacity-80 rounded-2xl shadow-2xl p-10 max-w-xl w-full flex flex-col items-center"
      >
        <FaHeartbeat className="text-5xl text-pink-400 mb-4 drop-shadow-lg animate-pulse" />
        <h2 className="text-3xl font-bold text-pink-300 mb-6 text-center">
          Motivation & Wellness
        </h2>
        <div className="relative mb-8">
          <FaQuoteLeft className="absolute -left-8 top-0 text-pink-400 text-2xl" />
          <p className="text-xl text-gray-100 font-semibold text-center px-8">{quote}</p>
          <FaQuoteRight className="absolute -right-8 bottom-0 text-pink-400 text-2xl" />
        </div>
        <button
          onClick={handleNewQuote}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-400 to-orange-400 text-black font-bold rounded-full shadow-lg hover:from-pink-500 hover:to-orange-500 transition duration-300"
        >
          Inspire Me
        </button>
        <div className="mt-8 flex flex-col items-center">
          <FaSmile className="text-3xl text-pink-200 mb-2" />
          <span className="text-gray-300 text-lg">Take a deep breath and smile. Wellness starts from within!</span>
        </div>
      </motion.div>
    </div>
  );
}

export default MotivationWellness;