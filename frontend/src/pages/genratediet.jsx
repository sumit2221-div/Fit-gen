import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { genrateDiet } from '../api/diet.api.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SplitText from '../tools/splittext.jsx';
import { useNavigate } from 'react-router-dom';

function GenrateDietPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading state

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    try {
      const response = await genrateDiet(data);
      toast.success('diet generated successfully!');
      navigate("/get_diet");
    } catch (error) {
      toast.error('Error generating diet.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-gradient-to-r from-gray-800 to-gray-500 flex items-center justify-center">
        <div className="text-center text-white p-8">
          <SplitText
            text="Welcome to Fit-Gen"
            className="text-5xl font-extrabold text-center text-amber-500"
            delay={150}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
          <p className="text-lg">Generate a personalized diet plan to achieve your fitness goals.</p>
        </div>
      </div>
      <div className="md:w-1/2 bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Generate Diet</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="age" className="block text-gray-300 mb-2">Age</label>
              <input
                type="number"
                id="age"
                {...register('age', { required: 'Age is required' })}
                className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.age && <p className="text-red-500">{errors.age.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-300 mb-2">Gender</label>
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
            <div className="mb-4">
              <label htmlFor="height" className="block text-gray-300 mb-2">Height (cm)</label>
              <input
                type="number"
                id="height"
                {...register('height', { required: 'Height is required' })}
                className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.height && <p className="text-red-500">{errors.height.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="weight" className="block text-gray-300 mb-2">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                {...register('weight', { required: 'Weight is required' })}
                className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.weight && <p className="text-red-500">{errors.weight.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="fitnessGoal" className="block text-gray-300 mb-2">Fitness Goal</label>
              <select
                id="fitnessGoal"
                {...register('fitnessGoal', { required: 'Fitness Goal is required' })}
                className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select Fitness Goal</option>
                <option value="muscle gain">Muscle Gain</option>
                <option value="weight loss">Weight Loss</option>
                <option value="endurance">Endurance</option>
              </select>
              {errors.fitnessGoal && <p className="text-red-500">{errors.fitnessGoal.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-600 transition duration-300 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate Diet"
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default GenrateDietPage;
