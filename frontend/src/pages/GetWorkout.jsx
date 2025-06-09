import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GetWorkout } from '../api/workout.api.js';
import { FaDumbbell, FaCalendarAlt } from 'react-icons/fa';

function GetWorkoutpage() {
  const [workout, setWorkout] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await GetWorkout();
        if (response && response.workoutPlan === null) {
          setWorkout(null);
        } else if (response && response.planName) {
          setWorkout(response);
        } else if (response && response.planDetails) {
          setWorkout(response);
        } else {
          setWorkout(null);
        }
      } catch (error) {
        setError('Failed to fetch workout plan. Please try again.');
      }
    };
    fetchWorkout();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-2 sm:p-4 mt-6">
      {error ? (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-red-500 mb-4 sm:mb-6">Error</h2>
          <p className="mb-4 sm:mb-6 text-base sm:text-lg">{error}</p>
          <Link to="/generate-workout">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 sm:py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-600 transition duration-300 text-base sm:text-lg"
            >
              Generate Workout
            </motion.button>
          </Link>
        </motion.div>
      ) : workout ? (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-orange-500 mb-4 sm:mb-6 flex items-center justify-center">
            <FaDumbbell className="mr-2" /> {workout.planName}
          </h2>
          <ul className="mb-4 sm:mb-6 space-y-4">
            {workout.planDetails.map((day, index) => (
              <li key={index} className="bg-gray-700 p-3 sm:p-4 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold text-orange-400 mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2" /> Day {day.day}: {day.title}
                </h3>
                <ul className="ml-2 sm:ml-4 space-y-2">
                  {day.exercises.map((exercise, idx) => (
                    <li key={idx} className="flex flex-col sm:flex-row justify-between text-sm sm:text-base">
                      <span>{exercise.name}</span>
                      <span className="text-gray-400">{exercise.sets} sets of {exercise.reps} reps</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <Link to="/generate-workout">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition duration-300 text-base sm:text-lg"
            >
              Generate New Workout
            </motion.button>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-4 sm:mb-6">No Workout Plan</h2>
          <p className="mb-4 sm:mb-6 text-base sm:text-lg">You don't have generated any plan.</p>
          <Link to="/generate-workout">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 sm:py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-600 transition duration-300 text-base sm:text-lg"
            >
              Generate Workout
            </motion.button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}

export default GetWorkoutpage;
