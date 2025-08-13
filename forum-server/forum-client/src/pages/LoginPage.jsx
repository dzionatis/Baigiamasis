import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Importuojam kontekstą
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Gaunam login funkciją iš konteksto

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { email, password }
      );

      // ✅ Išsaugom vartotojo duomenis ir tokeną į kontekstą bei localStorage
      const userData = {
        name: res.data.user.name,
        email: res.data.user.email,
        token: res.data.token,
      };

      login(userData); // ✅ Konteksto login
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.msg || "Prisijungti nepavyko. Bandykite dar kartą."
      );
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2>Prisijungimas</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Prisijungti</button>
      </form>
    </div>
  );
};

export default LoginPage;
