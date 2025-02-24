import { GoogleGenerativeAI } from "@google/generative-ai";
import DietPlan from "../model/diet.model.js";
import {User} from "../model/user.model.js";

export const GenrateDiet = async (req, res) => {
    const { age, gender, height, weight, fitnessGoal } = req.body;
    const userId = req.user._id;

    if (!age || !gender || !height || !weight || !fitnessGoal || !userId) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    try {
        console.log("Initializing Google Generative AI client...");
        const genAI = new GoogleGenerativeAI( process.env.API_KEY );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Generate a structured diet plan for a ${age}-year-old ${gender} with a height of ${height} cm, weight of ${weight} kg, and fitness goal of ${fitnessGoal}.
        ⚠️ IMPORTANT: Respond in strict JSON format with the following structure:

        {
          "goal": "weight loss",
          "mealPlans": [
            {
              "mealType": "Breakfast",
              "foods": [
                { "name": "Oatmeal", "quantity": "1 cup", "calories": 150, "protein": 5, "carbs": 27, "fat": 3 },
                { "name": "Banana", "quantity": "1 medium", "calories": 105, "protein": 1, "carbs": 27, "fat": 0.3 }
              ]
            }
          ]
        }`;

        console.log("Sending request to Google Generative AI...");
        const response = await model.generateContent(prompt);
      

        if (!response || !response.response) {
            throw new Error("Invalid response from AI model.");
        }

        const aiOutput = await response.response.text();  // Await the text if it's a Promise
        console.log("AI response:", aiOutput); // Log the raw response to check for errors in format
        
        // Remove the markdown code block syntax (```json or ```)
        const cleanedOutput = aiOutput.replace(/```json|```/g, '').trim();
        
        // Parse the cleaned AI output into JSON format
        let dietData;
        try {
            dietData = JSON.parse(cleanedOutput);
        } catch (parseError) {
            console.error("Error parsing AI response:", parseError);
            throw new Error("Failed to parse diet plan response.");
        }

        if (!dietData.mealPlans || !Array.isArray(dietData.mealPlans)) {
            throw new Error("Invalid diet plan structure received.");
        }

        console.log("Creating new diet plan...");
        const dietPlan = new DietPlan({
            userId,
            goal: dietData.goal,
            mealPlans: dietData.mealPlans
        });

        console.log("Saving diet plan to database...");
        await dietPlan.save();

        console.log("Updating user details...");
        await User.findByIdAndUpdate(userId, {
            diet_plan: dietPlan._id,
        });

        console.log("Diet plan generated and saved successfully.");
        res.status(200).json({ message: "Diet plan generated and saved successfully", dietPlan });
    } catch (error) {
        console.error("Error generating diet plan:", error);
        res.status(500).json({ message: "Error generating diet plan", error: error.message });
    }
};