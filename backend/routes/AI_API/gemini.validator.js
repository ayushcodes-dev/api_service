import { body } from "express-validator";

export const geminiValidator = [
  // prompt validation
  body("prompt")
    .notEmpty()
    .withMessage("Prompt is required")
    .isString()
    .withMessage("Prompt must be a string")
    .isLength({ min: 3 })
    .withMessage("Prompt must be at least 3 characters long"),
];