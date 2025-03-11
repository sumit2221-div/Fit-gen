import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function GetWorkout() {
  const [workout, setWorkout] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {workout ? (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">{workout.name}</h2>
          <ul className="mb-6">
            {workout.exercises.map((exercise, index) => (
              <li key={index} className="mb-2">
                {exercise.name} - {exercise.reps} reps
              </li>
            ))}
          </ul>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setWorkout(null)} // Reset workout to null to simulate generating a new workout
            className="w-full py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Generate New Workout
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center"
        >
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">No Workout Generated</h2>
          <p className="mb-6">Click the button below to generate a workout.</p>
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
      )}
    </div>
  );
}

export default GetWorkout;
