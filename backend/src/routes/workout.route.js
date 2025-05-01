import express from "express";
import { GenrateWorkout,getGeneratedWorkoutPlan} from "../controller/workout.controller.js";

import { VerifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/generate-workout", VerifyJWT, GenrateWorkout);
router.get("/get_workout", VerifyJWT, getGeneratedWorkoutPlan);



export default router;