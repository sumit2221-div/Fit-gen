import API from "./api.js";

export const login = async (userdata) => {
    try {
        const response = await API.post("/api/auth/login", userdata);
        return response.data;

    }
    catch(error){
        console.error("Login Error:", error);
        throw error;

    }
}

export  const RegisterUser = async(userdata) => {
    try {
        const response = await API.post("/api/auth/register", userdata);
        return response.data;
        
    } catch (error) {
        console.error("Register Error:", error);
        throw error;
        
    }
}

export const logout = async() => {
    try {
         const response = await API.post("/api/auth/logout");
        localStorage.removeItem("token");
        return response.data;
        
    } catch (error) {
        console.error("Logout Error:", error);
        throw error;
        
    }
}

export const getCurrentUser = async() => {
    try {
        const response = await API.get("/api/auth/current-user");
        return response.data;
    } catch (error) {
        console.error("error while finding user:", error);
        throw error;
    }
}

export const updateUser = async(userdata) => {
    try {
        const response = await API.put("/api/auth/update-user", userdata);
        return response.data;
    }
    catch(error){
        console.error("Error while updating user:", error);
        throw error;
    }
}

export const changePassword = async(userdata) => {
    try {
        const response = await API.post("/api/auth/change-password", userdata);
        return response.data;
    } catch (error) {
        console.error("Error while changing password:", error);
        throw error;
        
    }
}

