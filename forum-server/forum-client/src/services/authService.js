import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const register = (userData) => axios.post(`${API_URL}/auth/register`, userData);
const login = (credentials) => axios.post(`${API_URL}/auth/login`, credentials);

const authService = { register, login };
export default authService;
