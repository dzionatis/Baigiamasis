import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./QuestionListPage.module.css";

const QuestionsListPage = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/questions`
        );
        setQuestions(res.data);
      } catch (err) {
        setError("Nepavyko užkrauti klausimų. Bandykite dar kartą.");
      }
    };
    fetchQuestions();
  }, []);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className={styles.questionsContainer}>
      <h2>Klausimai</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {currentQuestions.map((q) => (
          <li key={q._id}>
            <Link to={`/questions/${q._id}`}>{q.question_text}</Link>
          </li>
        ))}
      </ul>

      {/* Pagination buttons */}
      <div className={styles.pagination}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Atgal
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Pirmyn
        </button>
      </div>
    </div>
  );
};

export default QuestionsListPage;
