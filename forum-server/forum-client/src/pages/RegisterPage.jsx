import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
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
      await register(form);
      navigate("/login");
    } catch (err) {
      setError("Registracija nepavyko. Patikrinkite duomenis.");
    }
  };

  return (
    <div>
      <h2>Registracija</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Vardas"
          onChange={handleChange}
          required
        />
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
        <button type="submit">Registruotis</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default RegisterPage;
