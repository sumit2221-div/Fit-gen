import API from "./api.js";


export const GenrateWorkout  = async (workoutdata) => {
    try {
        const response = await API.post("/api/workout/genrate-workout", workoutdata);
        return response.data;
        
    } catch (error) {
        console.error("Error while genrating workout:", error);
        throw error;
        
    }
}

export const GetWorkout = async() => {
    try {
        const response = await API.get("/api/workout/get_workout");
        return response.data;
        
    } catch (error) {
        console.error("Error while getting workout:", error);
        throw error;
        
    }
}