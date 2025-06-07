import React from 'react';
import { useForm } from 'react-hook-form';
import { GenrateWorkout } from '../api/workout.api.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SplitText from '../tools/splittext.jsx';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaDumbbell, FaUser, FaVenusMars, FaRulerVertical, FaWeight, FaBullseye } from 'react-icons/fa';

function GenrateWorkoutPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await GenrateWorkout(data);
      toast.success('Workout generated successfully!');
      // Redirect to the GetWorkout page with the workoutId
      navigate('/get-workout');
      reset();
    } catch (error) {
      toast.error('Error generating workout.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Left Side: Welcome & Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="md:w-1/2 flex flex-col items-center justify-center p-8"
      >
        <SplitText
          text="Welcome to Fit-Gen"
          className="text-5xl font-extrabold text-center text-amber-500 mb-6"
          delay={150}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
        />
        <p className="text-lg text-gray-200 mb-8 text-center">
          Generate a personalized workout plan to achieve your fitness goals.
        </p>
        <FaDumbbell className="text-8xl text-orange-400 drop-shadow-lg animate-bounce" />
      </motion.div>

      {/* Right Side: Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="md:w-1/2 flex items-center justify-center p-8"
      >
        <div className="bg-gray-800 bg-opacity-90 p-10 rounded-2xl shadow-2xl max-w-md w-full">
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-8 flex items-center justify-center gap-2">
            <FaBullseye className="text-orange-400" /> Generate Workout
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="age" className="block text-gray-300 mb-2 flex items-center gap-2">
                <FaUser /> Age
              </label>
              <input
                type="number"
                id="age"
                {...register('age', { required: 'Age is required', min: 10, max: 100 })}
                className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your age"
              />
              {errors.age && <p className="text-red-500">{errors.age.message}</p>}
            </div>
            <div>
              <label htmlFor="gender" className="block text-gray-300 mb-2 flex items-center gap-2">
                <FaVenusMars /> Gender
              </label>
              <select
                id="gender"
                {...register('gender', { required: 'Gender is required' })}
                className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
            </div>
            <div>
              <label htmlFor="height" className="block text-gray-300 mb-2 flex items-center gap-2">
                <FaRulerVertical /> Height (cm)
              </label>
              <input
                type="number"
                id="height"
                {...register('height', { required: 'Height is required', min: 50, max: 250 })}
                className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your height"
              />
              {errors.height && <p className="text-red-500">{errors.height.message}</p>}
            </div>
            <div>
              <label htmlFor="weight" className="block text-gray-300 mb-2 flex items-center gap-2">
                <FaWeight /> Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                {...register('weight', { required: 'Weight is required', min: 20, max: 300 })}
                className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your weight"
              />
              {errors.weight && <p className="text-red-500">{errors.weight.message}</p>}
            </div>
            <div>
              <label htmlFor="fitnessGoal" className="block text-gray-300 mb-2 flex items-center gap-2">
                <FaBullseye /> Fitness Goal
              </label>
              <select
                id="fitnessGoal"
                {...register('fitnessGoal', { required: 'Fitness Goal is required' })}
                className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select Fitness Goal</option>
                <option value="muscle gain">Muscle Gain</option>
                <option value="weight loss">Weight Loss</option>
                <option value="endurance">Endurance</option>
                <option value="flexibility">Flexibility</option>
                <option value="general fitness">General Fitness</option>
              </select>
              {errors.fitnessGoal && <p className="text-red-500">{errors.fitnessGoal.message}</p>}
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition duration-300 shadow-lg"
            >
              Generate Workout
            </motion.button>
          </form>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}

export default GenrateWorkoutPage;
