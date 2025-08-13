import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuestionDetailsPage from "./pages/QuestionDetailsPage";
import QuestionsListPage from "./pages/QuestionListPage";
import AskQuestionPage from "./pages/AskQuestionPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/questions/:id" element={<QuestionDetailsPage />} />
        <Route path="/" element={<QuestionsListPage />} />
        <Route
          path="/ask"
          element={
            <ProtectedRoute>
              <AskQuestionPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
