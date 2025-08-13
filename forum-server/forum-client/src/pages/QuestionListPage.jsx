import React, { useEffect, useState } from "react";
import QuestionService from "../services/questionService";
import { Link } from "react-router-dom";

const QuestionsListPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    QuestionService.getAllQuestions().then((res) => {
      setQuestions(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Klausimų sąrašas</h1>
      <Link to="/ask">Užduoti naują klausimą</Link>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            <Link to={`/question/${q.id}`}>{q.question_text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsListPage;
