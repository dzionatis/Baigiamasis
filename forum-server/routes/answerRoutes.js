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

router.post("/question/:id", authMiddleware, createAnswer);
router.get("/question/:id", getAnswersByQuestion);
router.delete("/:id", authMiddleware, deleteAnswer);
router.post("/:id/like", authMiddleware, likeAnswer);
router.post("/:id/dislike", authMiddleware, dislikeAnswer);

export default router;
