import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  getAnswersByQuestionId,
  createAnswer,
  deleteAnswer,
} from "../services/answerService";

const QuestionDetailsPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");

  const token = localStorage.getItem("token");

  const fetchQuestion = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/questions`);
      const found = res.data.find((q) => q.id === id);
      setQuestion(found);
    } catch (err) {
      console.error("Klaida gaunant klausimą:", err);
    }
  }, [id]);

  const fetchAnswers = useCallback(async () => {
    try {
      const res = await getAnswersByQuestionId(id);
      setAnswers(res.data);
    } catch (err) {
      console.error("Klaida gaunant atsakymus:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, [fetchQuestion, fetchAnswers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Prisijunkite, kad galėtumėte atsakyti.");

    try {
      await createAnswer(id, { answer_text: newAnswer }, token);
      setNewAnswer("");
      fetchAnswers();
    } catch (err) {
      console.error("Klaida siunčiant atsakymą:", err);
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    if (!token) return;
    try {
      await deleteAnswer(answerId, token);
      fetchAnswers();
    } catch (err) {
      console.error("Nepavyko ištrinti atsakymo:", err);
    }
  };

  if (!question) return <p>Kraunama...</p>;

  return (
    <div>
      <h2>{question.question_text}</h2>

      <h3>Atsakymai:</h3>
      {answers.length === 0 ? (
        <p>Kol kas nėra atsakymų.</p>
      ) : (
        <ul>
          {answers.map((a) => (
            <li key={a.id}>
              <p>{a.answer_text}</p>
              <p>👍 {a.gained_likes_number}</p>
              {token && (
                <button onClick={() => handleDeleteAnswer(a.id)}>
                  Ištrinti
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {token && (
        <form onSubmit={handleSubmit}>
          <h4>Parašyk atsakymą:</h4>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            required
          />
          <br />
          <button type="submit">Siųsti</button>
        </form>
      )}
    </div>
  );
};

export default QuestionDetailsPage;
