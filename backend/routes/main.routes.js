import express from "express";
import geminiRoutes from "./AI_API/gemini.routes.js"
const router = express.Router();

// gemini routes
router.use(geminiRoutes);

export default router;
