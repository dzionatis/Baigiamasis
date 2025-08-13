import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class QuestionService {
  getAllQuestions() {
    return axios.get(`${API_URL}/questions`);
  }

  getQuestionById(id) {
    return axios.get(`${API_URL}/questions/${id}`);
  }

  createQuestion(data, token) {
    return axios.post(`${API_URL}/questions`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteQuestion(id, token) {
    return axios.delete(`${API_URL}/questions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

const questionService = new QuestionService();
export default questionService;
