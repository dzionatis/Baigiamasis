// controllers/questionController.js
import Question from "../models/Question.js";

// Sukurti naują klausimą
export const createQuestion = async (req, res) => {
  const { question_text } = req.body;

  if (!question_text) {
    return res.status(400).json({ msg: "Klausimo tekstas būtinas" });
  }

  try {
    const newQuestion = new Question({
      question_text,
      user_id: req.user.id,
    });

    await newQuestion.save();
    res.status(201).json({ msg: "Klausimas sukurtas" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Gauti visus klausimus
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ date: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
