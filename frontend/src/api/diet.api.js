import API from "./api.js";

export const genrateDiet = async(dietdata) => {
    try {
        const response  = await  API.post("/diet/genrate-diet", dietdata);
        return response.data;

    }
    catch(error){
        console.error("Error while genrating diet:", error);
        throw error;

    }
}

export const getDiet  = async()=> {
    try {
        const response = await API.get("/api/diet/get-diet");
        return response.data;
    }
    catch(error){
        console.error("Error while getting diet:", error);
        throw error;
    }
}