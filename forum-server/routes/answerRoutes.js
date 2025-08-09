import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  likeAnswer,
  dislikeAnswer,
  createAnswer,
  getAnswersByQuestion,
  deleteAnswer,
} from "../controllers/answerController.js";

const router = express.Router();

router.post("/:id/like", authMiddleware, likeAnswer);
router.post("/:id/dislike", authMiddleware, dislikeAnswer);

router.post("/question/:id/answers", authMiddleware, createAnswer);

router.get("/question/:id/answers", getAnswersByQuestion);

router.delete("/:id", authMiddleware, deleteAnswer);

export default router;
