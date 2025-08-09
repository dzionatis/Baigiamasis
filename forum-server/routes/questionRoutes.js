import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createQuestion,
  getAllQuestions,
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/question", authMiddleware, createQuestion);

router.get("/questions", getAllQuestions);

export default router;
