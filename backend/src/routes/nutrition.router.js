import { VerifyJWT } from "../middleware/auth.middleware.js";
import express from "express";
import { addMeal, getTotalNutrition } from "../controller/NutritionController.js";

const router = express.Router();
router.post("/add-meal", VerifyJWT, addMeal);
router.get("/get-meal", VerifyJWT, getTotalNutrition);

export default router;