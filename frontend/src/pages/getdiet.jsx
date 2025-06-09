import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getDiet } from "../api/diet.api";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GetDiet() {
  const [dietPlan, setDietPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDietPlan = async () => {
      try {
        const response = await getDiet();
        if (response.mealPlans && Array.isArray(response.mealPlans)) {
          setDietPlan(response.mealPlans);
        } else if (response.dietplan && Array.isArray(response.dietplan.mealPlans)) {
          setDietPlan(response.dietplan.mealPlans);
        } else {
          setDietPlan([]);
        }
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
        <span className="text-xl font-bold text-orange-400">
          Loading...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg font-semibold text-red-500">{error}</p>
        <Link to="/generate_diet">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-6 py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Generate New Diet Plan
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div
        className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
          Your Diet Plan
        </h2>
        <p className="text-lg text-gray-300 text-center mb-8">
          Stay on track with your personalized diet plan.
        </p>
        <ul className="space-y-6">
          {dietPlan.map((meal, index) => (
            <li
              key={index}
              className="bg-gray-700 p-6 rounded-lg shadow-md flex flex-col"
            >
              <h3 className="text-xl font-semibold text-orange-400 mb-4">
                {meal.mealType}
              </h3>
              <ul className="space-y-2">
                {meal.foods &&
                  meal.foods.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between text-gray-300 text-lg"
                    >
                      <span>
                        {item.name} ({item.quantity})
                      </span>
                      <span>
                        {item.calories} kcal | P: {item.protein}g | C: {item.carbs}g | F:{" "}
                        {item.fat}g
                      </span>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-10">
          <Link to="/generate_diet">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transition duration-300"
            >
              Generate New Diet Plan
            </motion.button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default GetDiet;