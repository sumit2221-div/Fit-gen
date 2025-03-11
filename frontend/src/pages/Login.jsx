import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginUser } from "../store/authslice.js";
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen flex">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/2 bg-amber-900 flex items-center justify-center relative"
      >
        <div className="text-center text-white p-8 z-10">
          <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg">Login to continue your fitness journey with Fit-Gen.</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/2 bg-gray-900 flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                id="password"
                {...register('password', { required: 'Password is required' })}
                className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-300">New user? <Link to="/register" className="text-orange-500 hover:underline">Register here</Link></p>
          </div>
        </motion.div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}

export default Login;