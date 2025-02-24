import express from "express";
import { GenrateWorkout } from "../controller/workout.controller.js";

import { VerifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/generate-workout", VerifyJWT, GenrateWorkout);



export default router;