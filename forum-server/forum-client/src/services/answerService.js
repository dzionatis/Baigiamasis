import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getAnswersByQuestionId = (questionId) =>
  axios.get(`${API_URL}/answers/question/${questionId}`);

export const createAnswer = (questionId, answerData, token) =>
  axios.post(`${API_URL}/answers/question/${questionId}`, answerData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteAnswer = (answerId, token) =>
  axios.delete(`${API_URL}/answers/${answerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const likeAnswer = (answerId, token) =>
  axios.post(
    `${API_URL}/answers/${answerId}/like`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const dislikeAnswer = (answerId, token) =>
  axios.post(
    `${API_URL}/answers/${answerId}/dislike`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
