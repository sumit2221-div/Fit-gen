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
        setWorkout(response);
      } catch (error) {
        setError('Failed to fetch workout plan. Please try again.');
      }
    };
    fetchWorkout();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4 mt-10">
      {error ? (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center"
        >
          <h2 className="text-3xl font-bold text-red-500 mb-6">Error</h2>
          <p className="mb-6">{error}</p>
          <Link to="/generate-workout">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
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
          className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-2xl w-full"
        >
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-6 flex items-center justify-center">
            <FaDumbbell className="mr-2" /> {workout.planName}
          </h2>
          <ul className="mb-6 space-y-4">
            {workout.planDetails.map((day, index) => (
              <li key={index} className="bg-gray-700 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-orange-400 mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2" /> Day {day.day}: {day.title}
                </h3>
                <ul className="ml-4 space-y-2">
                  {day.exercises.map((exercise, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{exercise.name}</span>
                      <span>{exercise.sets} sets of {exercise.reps} reps</span>
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
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition duration-300"
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
          className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center"
        >
          <h2 className="text-3xl font-bold text-orange-500 mb-6">Loading...</h2>
          <p className="mb-6">Fetching your workout plan. Please wait.</p>
        </motion.div>
      )}
    </div>
  );
}

export default GetWorkoutpage;
