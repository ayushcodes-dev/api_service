import express from "express";
import gemini_api_service from "#/services/apis/gemini/gemini.api.js";
import { geminiValidator } from "./gemini.validator.js";
import validate from "#/validator/handler.js";
const router = express.Router();

/**
 * @route POST /api/gemini/gen
 * @description
 * @access private
 */
router.post("/api/gemini/gen", geminiValidator, validate, async (req, res) => {
  const timeInSec = Math.floor(Date.now() / 1000);
  console.log("req has came", timeInSec);
  const { prompt } = req.body;
  const output = await gemini_api_service(prompt);
  if (output.success) {
    res.success({ ...output });
  } else {
    res.error({ ...output });
  }
  const timeInSecend = Math.floor(Date.now() / 1000);
   console.log("req ended", timeInSecend);
});
export default router;
