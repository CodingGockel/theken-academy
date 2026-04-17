import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Registrieren
      await axios.post("http://172.25.44.6:8000/api/auth/register", {
        name,
        email,
        password,
        role: "student",
      });

      // Direkt einloggen
      const res = await axios.post("http://172.25.44.6:8000/api/auth/login", {
        email,
        password,
      });
      const token = res.data.access_token;

      // User Profil abrufen
      const userRes = await axios.get("http://172.25.44.6:8000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      login(token, userRes.data);
      navigate("/welcome");
    } catch (err) {
      setError(err.response?.data?.detail || "Registrierung fehlgeschlagen");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Theken Academy</h2>
        <h3>Registrieren</h3>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.button} type="submit">Registrieren</button>
        </form>
        <button style={styles.buttonOutline} onClick={() => navigate("/login")}>
          Zurück zum Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" },
  card: { backgroundColor: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", width: "320px" },
  input: { display: "block", width: "100%", padding: "0.6rem", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" },
  button: { width: "100%", padding: "0.7rem", backgroundColor: "#4f46e5", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginBottom: "0.5rem" },
  buttonOutline: { width: "100%", padding: "0.7rem", backgroundColor: "white", color: "#4f46e5", border: "1px solid #4f46e5", borderRadius: "4px", cursor: "pointer" },
  error: { color: "red", marginBottom: "0.5rem" },
};
