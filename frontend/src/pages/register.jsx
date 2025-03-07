import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterUser } from '../api/auth.api.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await RegisterUser(data);
      console.log('User registered successfully:', response);
      toast.success('User registered successfully!');
      // Handle success (e.g., show a success message, redirect)
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('Error registering user.');
      // Handle error (e.g., show an error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor=" username" className="block text-gray-300 mb-2">UserName</label>
              <input
                type="text"
                id="username"
                {...register(' username', { required: ' username is required' })}
                className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
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
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
      <div className="w-1/2 bg-amber-900 flex items-center justify-center relative">
        <div className="text-center text-white p-8 z-10">
          <h1 className="text-5xl font-bold mb-4">Join Us!</h1>
          <p className="text-lg">Register to start your fitness journey with Fit-Gen.</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
