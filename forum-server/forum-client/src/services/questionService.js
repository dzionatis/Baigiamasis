import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api";

class QuestionService {
  getAllQuestions = () => axios.get(`${API_URL}/questions`);
  getQuestionById = (id) => axios.get(`${API_URL}/question/${id}`);
  createQuestion = (data) => axios.post(`${API_URL}/question`, data);
  deleteQuestion = (id) => axios.delete(`${API_URL}/question/${id}`);
}

const questionService = new QuestionService();
export default questionService;
