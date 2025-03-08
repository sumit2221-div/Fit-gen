import API from "./api.js";

export const login = async (userdata) => {
    try {
        const response = await API.post("/api/auth/login", userdata, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Login Error:", error.message);
        throw error;
    }
};

export const RegisterUser = async (userdata) => {
    try {
        const response = await API.post("/api/auth/register", userdata, { withCredentials: true });
        console.log("✅ Registration Success:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Registration Failed:", error);

        if (error.response) {
            console.error("🚨 Server Response:", error.response.data);
            console.error("🔍 Status Code:", error.response.status);
            console.error("📝 Headers:", error.response.headers);
        } else if (error.request) {
            console.error("⏳ No Response from Server (Network Error)");
        } else {
            console.error("⚠️ Error in Request Setup:", error.message);
        }
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await API.post("/api/auth/logout", {}, { withCredentials: true });
        localStorage.removeItem("token");
        return response.data;
    } catch (error) {
        console.error("Logout Error:", error);
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await API.get("/api/auth/current-user", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error while finding user:", error);
        throw error;
    }
};

export const updateUser = async (userdata) => {
    try {
        const response = await API.put("/api/auth/update-user", userdata, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error while updating user:", error);
        throw error;
    }
};

export const changePassword = async (userdata) => {
    try {
        const response = await API.post("/api/auth/change-password", userdata, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error while changing password:", error);
        throw error;
    }
};
