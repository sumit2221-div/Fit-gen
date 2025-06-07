import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AddMeal, GetMeal } from "../api/nutrician.api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NutritionTracker() {
  const [mealData, setMealData] = useState({
    meal: "",
    weight: "",
  });
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealData({ ...mealData, [name]: value });
  };

  const handleAddMeal = async (e) => {
    e.preventDefault();
    try {
      const response = await AddMeal(mealData);
      setMeals(Array.isArray(meals) ? [...meals, response] : [response]);
      toast.success("Meal added successfully!");
      setMealData({ meal: "", weight: "" });
    } catch (error) {
      toast.error("Failed to add meal. Please try again.");
    }
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await GetMeal();
        setMeals(Array.isArray(response) ? response : []);
        setLoading(false);
        console.log("Fetched meals:", response);
      } catch (error) {
        toast.error("Failed to fetch meals. Please try again.");
        setMeals([]);
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg font-semibold">Loading meals...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 mt-10">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
          Nutrition Tracker
        </h2>
        <form onSubmit={handleAddMeal} className="space-y-6">
          <div>
            <label htmlFor="meal" className="block text-gray-300 mb-2">
              Meal
            </label>
            <input
              type="text"
              id="meal"
              name="meal"
              value={mealData.meal}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter meal"
              required
            />
          </div>
          <div>
            <label htmlFor="weight" className="block text-gray-300 mb-2">
              Weight (grams)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={mealData.weight}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter meal weight in grams"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Add Meal
          </motion.button>
        </form>
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-orange-500 mb-4">Your Meals</h3>
          <ul className="space-y-4">
            {(Array.isArray(meals) ? meals : []).map((meal, index) => (
              <li
                key={index}
                className="bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <span className="text-lg font-semibold">{meal.meal}</span>
                <span className="text-lg text-gray-300">{meal.weight} g</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}

export default NutritionTracker;