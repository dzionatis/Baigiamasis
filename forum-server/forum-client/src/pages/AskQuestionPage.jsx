import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionService from "../services/questionService";

const AskQuestionPage = () => {
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!questionText.trim()) {
      setError("Klausimo tekstas negali būti tuščias");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await QuestionService.createQuestion({
        question_text: questionText.trim(),
      });

      navigate("/questions");
    } catch (err) {
      setError(err?.message || "Nepavyko sukurti klausimo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-4 sm:p-6">
      <h1 className="mb-4 text-2xl font-semibold">Užduoti klausimą</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Įveskite savo klausimą čia…"
          rows="5"
          className="w-full rounded-2xl border border-black/10 p-3 outline-none focus:ring-2 focus:ring-black/20"
        />

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-black px-4 py-2 text-white hover:bg-black/80 disabled:opacity-50"
        >
          {loading ? "Kuriama…" : "Pateikti klausimą"}
        </button>
      </form>
    </div>
  );
};

export default AskQuestionPage;
