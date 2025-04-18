import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getDiet } from "../api/diet.api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GetDiet() {
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDietPlan = async () => {
      try {
        const response = await getDiet();
        setDietPlan(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch diet plan. Please try again.");
        toast.error("Failed to fetch diet plan.");
        setLoading(false);
      }
    };

    fetchDietPlan();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg font-semibold">Loading your diet plan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
          Your Diet Plan
        </h2>
        <p className="text-lg text-gray-300 text-center mb-8">
          Stay on track with your personalized diet plan.
        </p>
        <ul className="space-y-6">
          {dietPlan.planDetails.map((meal, index) => (
            <li
              key={index}
              className="bg-gray-700 p-6 rounded-lg shadow-md flex flex-col"
            >
              <h3 className="text-xl font-semibold text-orange-400 mb-4">
                {meal.mealType}
              </h3>
              <ul className="space-y-2">
                {meal.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between text-gray-300 text-lg"
                  >
                    <span>{item.name}</span>
                    <span>{item.calories} kcal</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </motion.div>
      <ToastContainer />
    </div>
  );
}

export default GetDiet;