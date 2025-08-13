import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuestionDetailsPage from "./pages/QuestionDetailsPage";
import QuestionsListPage from "./pages/QuestionListPage";
import AskQuestionPage from "./pages/AskQuestionPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/question/:id" element={<QuestionDetailsPage />} />
        <Route path="/" element={<QuestionsListPage />} />
        <Route
          path="/ask"
          element={
            <ProtectedRoute>
              <AskQuestionPage />
            </ProtectedRoute>
          }
        />
        <Route path="/question/:id" element={<QuestionDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
