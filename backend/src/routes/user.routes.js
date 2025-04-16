import express from "express";
import { RegisterUser, LoginUser, LogoutUser, ChangePassword, GetCurrentUser, updateUser } from "../controller/user.controller.js";
import { VerifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/logout", VerifyJWT, LogoutUser);
router.post("/change-password", VerifyJWT, ChangePassword);
router.get("/current-user", VerifyJWT, GetCurrentUser);
router.put("/update-user", VerifyJWT,updateUser);

export default router;