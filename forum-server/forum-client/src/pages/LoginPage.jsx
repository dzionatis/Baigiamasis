import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem("token", res.data.token);
      navigate("/questions");
    } catch (err) {
      setError("Prisijungimas nepavyko. Patikrinkite el. paštą ir slaptažodį.");
    }
  };

  return (
    <div>
      <h2>Prisijungimas</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="El. paštas"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Slaptažodis"
          onChange={handleChange}
          required
        />
        <button type="submit">Prisijungti</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
