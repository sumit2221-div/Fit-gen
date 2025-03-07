import API from "./api.js";

export const AddMeal = async (mealdata) => {
    try {
        const response = await API.post("/api/nutrition/add-meal", mealdata);
        return response.data;
        
    } catch (error) {
        console.error("Error while adding meal:", error);
        throw error;
        
    }

}

export const GetMeal = async() => {
    try {
        const response = await API.get("api/nutrition/get-meal");
        return response.data;
        
    } catch (error) {
        console.error("Error while getting meal:", error);
        throw error;
        
    }
}