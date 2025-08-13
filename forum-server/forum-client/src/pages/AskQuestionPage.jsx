import { useState } from "react";
import axios from "axios";
import styles from "./AskQuestionPage.module.css";

const AskQuestionPage = () => {
  const [questionText, setQuestionText] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_API_URL}/questions`,
        { question_text: questionText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Klausimas sėkmingai sukurtas!");
      setQuestionText("");
    } catch (err) {
      setMessage("Nepavyko sukurti klausimo.");
    }
  };

  return (
    <div className={styles.askContainer}>
      <h2>Užduoti klausimą</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Įrašyk savo klausimą..."
          rows="6"
        />
        <button type="submit">Pateikti</button>
      </form>
    </div>
  );
};

export default AskQuestionPage;
