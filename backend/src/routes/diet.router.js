import { VerifyJWT } from "../middleware/auth.middleware.js"
import express from "express";
import { GenrateDiet,GetDietbyId } from "../controller/diet.controller.js";


 const router = express.Router();
router.post("/generate-diet", VerifyJWT, GenrateDiet);
router.get("/get-diet", VerifyJWT,GetDietbyId);

export default router;