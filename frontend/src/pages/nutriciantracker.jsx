import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AddMeal, GetMeal } from "../api/nutrician.api.js";
import { ToastContainer, toast } from "react-toastify";
import { FaAppleAlt, FaWeight, FaChartPie, FaUtensils } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

function NutritionTracker() {
  const [mealData, setMealData] = useState({ meal: "", weight: "" });
  const [meals, setMeals] = useState([]);
  const [totalNutrition, setTotalNutrition] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealData({ ...mealData, [name]: value });
  };

  // ✅ Reusable function to fetch all meals
  const fetchMeals = async () => {
    try {
      const response = await GetMeal();
      const fetchedMeals = Array.isArray(response.meals) ? response.meals : [];
      setMeals(fetchedMeals);
      setTotalNutrition(response.totalNutrition || {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      });
      setLoading(false);
    } catch (error) {
      toast.error("❌ Failed to fetch meals.");
      setMeals([]);
      setLoading(false);
    }
  };

  // ✅ Fetch meals on component mount
  useEffect(() => {
    fetchMeals();
  }, []);

  // ✅ Add meal and re-fetch updated list
  const handleAddMeal = async (e) => {
    e.preventDefault();
    try {
      await AddMeal(mealData);
      toast.success("🍽️ Meal added successfully!");
      setMealData({ meal: "", weight: "" });
      fetchMeals(); // refresh meals and nutrition
    } catch (error) {
      toast.error("❌ Failed to add meal.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg font-semibold animate-pulse">Loading meals...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-4xl font-bold text-center text-orange-500 flex items-center justify-center gap-2 mb-6">
          <FaChartPie /> Nutrition Tracker
        </h2>

        {/* Form */}
        <form onSubmit={handleAddMeal} className="grid sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="meal" className="text-sm text-gray-300 mb-1 block">Meal Name</label>
            <input
              type="text"
              id="meal"
              name="meal"
              value={mealData.meal}
              onChange={handleChange}
              placeholder="e.g. Chicken Breast"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label htmlFor="weight" className="text-sm text-gray-300 mb-1 block">Weight (in grams)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={mealData.weight}
              onChange={handleChange}
              placeholder="e.g. 150"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="sm:col-span-2 w-full py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-600 transition"
          >
            Add Meal
          </motion.button>
        </form>

        {/* Meal List */}
        <div>
          <h3 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
            <FaUtensils /> Your Meals
          </h3>
          <div className="grid gap-4">
            {meals.map((meal, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gray-700 p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
                  <span className="text-lg font-bold text-orange-300">{meal.meal}</span>
                  <span className="text-sm text-gray-300">{meal.weight}g</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mt-3 sm:mt-0 text-gray-200">
                  <div><strong>Calories:</strong> {meal.calories} kcal</div>
                  <div><strong>Protein:</strong> {meal.protein} g</div>
                  <div><strong>Carbs:</strong> {meal.carbs} g</div>
                  <div><strong>Fat:</strong> {meal.fat} g</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Nutrition Summary */}
        <div className="mt-10 p-6 bg-gray-700 rounded-xl shadow-lg">
          <h4 className="text-xl font-bold text-orange-400 flex items-center gap-2 mb-3">
            <FaAppleAlt /> Total Nutrition Summary
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-200">
            <div><strong>Calories:</strong> {totalNutrition.calories} kcal</div>
            <div><strong>Protein:</strong> {totalNutrition.protein} g</div>
            <div><strong>Carbs:</strong> {totalNutrition.carbs} g</div>
            <div><strong>Fat:</strong> {totalNutrition.fat} g</div>
          </div>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}

export default NutritionTracker;
