// controllers/answerController.js
import Answer from "../models/Answer.js";

// Like atsakymui
export const likeAnswer = async (req, res) => {
  const answerId = req.params.id;
  const userId = req.user.id;

  try {
    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ message: "Atsakymas nerastas" });

    if (answer.liked_by.includes(userId)) {
      answer.liked_by.pull(userId);
    } else {
      answer.disliked_by.pull(userId);
      answer.liked_by.push(userId);
    }

    answer.gained_likes_number =
      answer.liked_by.length - answer.disliked_by.length;
    await answer.save();

    res.json({
      message: "Like atnaujintas",
      likes: answer.gained_likes_number,
    });
  } catch (error) {
    res.status(500).json({ message: "Serverio klaida" });
  }
};

// Dislike atsakymui
export const dislikeAnswer = async (req, res) => {
  const answerId = req.params.id;
  const userId = req.user.id;

  try {
    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ message: "Atsakymas nerastas" });

    if (answer.disliked_by.includes(userId)) {
      answer.disliked_by.pull(userId);
    } else {
      answer.liked_by.pull(userId);
      answer.disliked_by.push(userId);
    }

    answer.gained_likes_number =
      answer.liked_by.length - answer.disliked_by.length;
    await answer.save();

    res.json({
      message: "Dislike atnaujintas",
      likes: answer.gained_likes_number,
    });
  } catch (error) {
    res.status(500).json({ message: "Serverio klaida" });
  }
};

// Sukurti naują atsakymą
export const createAnswer = async (req, res) => {
  const { answer_text } = req.body;
  const questionId = req.params.id;

  if (!answer_text) {
    return res.status(400).json({ msg: "Atsakymo tekstas būtinas" });
  }

  try {
    const newAnswer = new Answer({
      answer_text,
      question_id: questionId,
      user_id: req.user.id,
    });

    await newAnswer.save();
    res.status(201).json({ msg: "Atsakymas sukurtas" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Gauti visus atsakymus konkrečiam klausimui
export const getAnswersByQuestion = async (req, res) => {
  const questionId = req.params.id;

  try {
    const answers = await Answer.find({ question_id: questionId }).sort({
      date: -1,
    });
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ištrinti atsakymą (tik autorius)
export const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);

    if (!answer) {
      return res.status(404).json({ msg: "Atsakymas nerastas" });
    }

    if (answer.user_id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: "Neturi teisės ištrinti šio atsakymo" });
    }

    await answer.remove();
    res.json({ msg: "Atsakymas sėkmingai ištrintas" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
