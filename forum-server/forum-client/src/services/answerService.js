import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getAnswersByQuestionId = (questionId) => {
  return axios.get(`${API_URL}/question/${questionId}/answers`);
};

export const createAnswer = (questionId, answerData, token) => {
  return axios.post(`${API_URL}/question/${questionId}/answers`, answerData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAnswer = (answerId, token) => {
  return axios.delete(`${API_URL}/answer/${answerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const likeAnswer = (answerId, token) => {
  return axios.post(
    `${API_URL}/answer/${answerId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const dislikeAnswer = (answerId, token) => {
  return axios.post(
    `${API_URL}/answer/${answerId}/dislike`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
