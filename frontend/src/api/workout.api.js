import API from "./api.js";

export const GenrateWorkout = async (workoutdata) => {
    try {
        const response = await API.post("/workout/generate-workout", workoutdata);
        console.log("✅ Workout Generated:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error while generating workout:", error);
        throw error;
    }
};



// New function to get a workout plan by workoutId
export const GetWorkoutById = async (workoutId) => {
    try {
        const response = await API.get(`/workout/get-workout/${workoutId}`);
        console.log("✅ Workout Retrieved by ID:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error while getting workout by ID:", error);
        throw error;
    }
};