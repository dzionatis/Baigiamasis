import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/", authMiddleware, createQuestion);
router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);

export default router;
