import express from "express";
import { GenrateWorkout,getWorkoutPlanByWorkoutId } from "../controller/workout.controller.js";

import { VerifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/generate-workout", VerifyJWT, GenrateWorkout);
router.get("/get_workout/:workoutId", VerifyJWT, getWorkoutPlanByWorkoutId)



export default router;