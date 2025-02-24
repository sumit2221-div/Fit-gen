import { VerifyJWT } from "../middleware/auth.middleware.js"
import express from "express";
import { GenrateDiet } from "../controller/diet.controller.js";


 const router = express.Router();
router.post("/generate-diet", VerifyJWT, GenrateDiet);

export default router;