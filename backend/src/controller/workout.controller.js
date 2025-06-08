import { GoogleGenerativeAI } from "@google/generative-ai";
import WorkoutPlan from "../model/workout.model.js";
import { User } from "../model/user.model.js";

export const GenrateWorkout = async (req, res) => {
  const { age, gender, height, weight, fitnessGoal } = req.body;
  const userId = req.user._id;

  if (!age || !gender || !height || !weight || !fitnessGoal || !userId) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    console.log("Initializing Google Generative AI client...");
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a structured workout plan for a ${age}-year-old ${gender} with a height of ${height} cm, weight of ${weight} kg, and fitness goal of ${fitnessGoal}.
    ⚠️ IMPORTANT: Respond in strict JSON format with the following structure:

    {
      "planName": "Workout Plan for muscle gain",
      "goal": "muscle gain",
      "planDetails": [
        {
          "day": 1,
          "title": "Upper Body",
          "exercises": [
            { "name": "Bench Press", "sets": 3, "reps": "8-12" },
            { "name": "Overhead Press", "sets": 3, "reps": "8-12" }
          ]
        }
      ]
    }`;

    console.log("Sending request to Google Generative AI...");
    const response = await model.generateContent(prompt);

    if (!response || !response.response) {
      throw new Error("Invalid response from AI model.");
    }

    const aiOutput = await response.response.text();
    console.log("AI response:", aiOutput);

    const cleanedOutput = aiOutput.replace(/```json|```/g, '').trim();

    let workoutData;
    try {
      workoutData = JSON.parse(cleanedOutput);
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      throw new Error("Failed to parse workout plan response.");
    }

    if (!workoutData.planDetails || !Array.isArray(workoutData.planDetails)) {
      throw new Error("Invalid workout plan structure received.");
    }

    // ✅ Sanitize exercises safely - check if exercises array exists before mapping
    workoutData.planDetails.forEach(day => {
      if (Array.isArray(day.exercises)) {
        day.exercises = day.exercises.map(ex => ({
          name: ex.name || "Unnamed Exercise",
          sets: typeof ex.sets === 'number' ? ex.sets : 3,
          reps: typeof ex.reps === 'string' || typeof ex.reps === 'number' ? ex.reps : "12-15",
          notes: ex.notes || ""
        }));
      } else {
        // If no exercises provided for that day, set empty array (optional)
        day.exercises = [];
      }
    });

    console.log("Creating new workout plan...");
    const workoutPlan = new WorkoutPlan({
      userId,
      planName: workoutData.planName,
      goal: workoutData.goal,
      planDetails: workoutData.planDetails
    });

    console.log("Saving workout plan to database...");
    await workoutPlan.save();

    console.log("Updating user details...");
    await User.findByIdAndUpdate(userId, {
      age,
      gender,
      height,
      weight,
      fitness_goal: fitnessGoal,
      workout_plan: workoutPlan._id,
    });

    console.log("Workout plan generated and saved successfully.");
    res.status(200).json({ message: "Workout plan generated and saved successfully", workoutPlan });

  } catch (error) {
    console.error("Error generating workout plan:", error);
    res.status(500).json({ message: "Error generating workout plan", error: error.message });
  }
};

export const getGeneratedWorkoutPlan = async (req, res) => {
    const userId = req.user._id;

    try {
        // Find the latest workout plan created by the user
        const latestWorkoutPlan = await WorkoutPlan.findOne({ userId })
            .sort({ createdAt: -1 }) // newest first
            .populate('userId', 'username email');

        if (!latestWorkoutPlan) {
            // Send a 200 status with a message and no error
            return res.status(200).json({ message: 'No workout plan found for this user', workoutPlan: null });
        }

        res.status(200).json(latestWorkoutPlan);
    } catch (error) {
        console.error("Error fetching latest generated workout plan:", error);
        res.status(500).json({ message: 'Error fetching workout plan', error: error.message });
    }
};
