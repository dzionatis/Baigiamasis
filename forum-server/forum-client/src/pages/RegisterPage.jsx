import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`, // pakeista į /auth/register
        { name, email, password }
      );
      alert(res.data.msg);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.msg || "Registracija nepavyko. Bandykite dar kartą."
      );
    }
  };

  return (
    <div className={styles.registerForm}>
      <h2>Registracija</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Vardas"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="El. paštas"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Slaptažodis"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registruotis</button>
      </form>
    </div>
  );
};

export default RegisterPage;
