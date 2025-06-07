import { GoogleGenerativeAI } from "@google/generative-ai";
import Nutrition from "../model/nutrition.model.js";

// Function to add a meal and calculate nutrition
export const addMeal = async (req, res) => {
  const { meal, weight } = req.body;
  const userId = req.user._id;

  if (!meal || !weight || !userId) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    console.log("Initializing Google Generative AI client...");
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Provide the nutritional information for ${weight} grams of ${meal}. Respond in JSON format with the following structure:
    {
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fat": 0
    }`;

    console.log("Sending request to Google Generative AI...");
    const response = await model.generateContent(prompt);

    if (!response || !response.response) {
      throw new Error("Invalid response from AI model.");
    }

    const aiOutput = await response.response.text();
    console.log("AI response:", aiOutput);

    // Extract the first JSON object from the AI response
    let nutritionData;
    try {
      const match = aiOutput.match(/{[\s\S]*?}/);
      if (match) {
        nutritionData = JSON.parse(match[0]);
      } else {
        throw new Error("No JSON found in AI response");
      }
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      throw new Error("Failed to parse nutrition information response.");
    }

    const nutrition = new Nutrition({
      userId,
      meal,
      weight,
      calories: nutritionData.calories,
      protein: nutritionData.protein,
      carbs: nutritionData.carbs,
      fat: nutritionData.fat,
    });

    await nutrition.save();

    res.status(200).json({ message: "Meal added successfully", nutrition });
  } catch (error) {
    console.error("Error adding meal:", error);
    res.status(500).json({ message: "Error adding meal", error: error.message });
  }
};

// Function to get total nutrition for a user for the current day
export const getTotalNutrition = async (req, res) => {
  const userId = req.user._id;
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  try {
    const nutritionData = await Nutrition.find({ userId, date: { $gte: startOfDay } });

    const totalNutrition = nutritionData.reduce(
      (totals, item) => {
        totals.calories += item.calories;
        totals.protein += item.protein;
        totals.carbs += item.carbs;
        totals.fat += item.fat;
        return totals;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    res.status(200).json({ message: "Total nutrition calculated successfully", totalNutrition });
  } catch (error) {
    console.error("Error calculating total nutrition:", error);
    res.status(500).json({ message: "Error calculating total nutrition", error: error.message });
  }
};