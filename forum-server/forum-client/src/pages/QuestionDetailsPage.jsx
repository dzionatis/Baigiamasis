import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  getAnswersByQuestionId,
  createAnswer,
  deleteAnswer,
  likeAnswer,
} from "../services/answerService";
import styles from "./QuestionDetailsPage.module.css";

const QuestionDetailsPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const fetchQuestion = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/questions/${id}`
      );
      setQuestion(res.data);
    } catch (err) {
      console.error("Klaida gaunant klausimą:", err);
      setError("Nepavyko užkrauti klausimo. Bandykite dar kartą.");
    } finally {
      setLoading(false);
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

  const handleLikeAnswer = async (answerId) => {
    if (!token) return alert("Prisijunkite, kad galėtumėte palikti like.");
    try {
      await likeAnswer(answerId, token);
      fetchAnswers();
    } catch (err) {
      console.error("Nepavyko palikti like:", err);
    }
  };

  if (loading) return <p className={styles.loading}>Kraunama...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!question) return <p>Klausimas nerastas.</p>;

  return (
    <div className={styles.container}>
      <h2>{question.question_text}</h2>

      <h3>Atsakymai:</h3>
      {answers.length === 0 ? (
        <p>Kol kas nėra atsakymų.</p>
      ) : (
        <ul className={styles.answersList}>
          {answers.map((a) => (
            <li key={a._id} className={styles.answerItem}>
              <p>{a.answer_text}</p>
              <p>
                👍 {a.gained_likes_number || 0}{" "}
                {token && (
                  <button
                    className={styles.likeButton}
                    onClick={() => handleLikeAnswer(a._id)}
                  >
                    Like
                  </button>
                )}
              </p>
              {token && (
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteAnswer(a._id)}
                >
                  Ištrinti
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {token && (
        <form onSubmit={handleSubmit} className={styles.answerForm}>
          <h4>Parašyk atsakymą:</h4>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            required
            className={styles.textarea}
          />
          <br />
          <button type="submit" className={styles.submitButton}>
            Siųsti
          </button>
        </form>
      )}
    </div>
  );
};

export default QuestionDetailsPage;
