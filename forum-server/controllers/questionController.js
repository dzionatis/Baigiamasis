import Question from "../models/Question.js";

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

export const getQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ msg: "Klausimas nerastas" });
    }
    res.json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Serverio klaida" });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ date: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
