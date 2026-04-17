import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Welcome() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Willkommen, {user?.name}! 👋</h2>
        <p>Du bist eingeloggt als <strong>{user?.role}</strong>.</p>
        <div style={styles.buttons}>
          <button style={styles.button} onClick={() => navigate("/profile")}>
            Mein Profil
          </button>
          <button style={styles.buttonOutline} onClick={handleLogout}>
            Ausloggen
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" },
  card: { backgroundColor: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", width: "360px", textAlign: "center" },
  buttons: { display: "flex", gap: "1rem", marginTop: "1.5rem" },
  button: { flex: 1, padding: "0.7rem", backgroundColor: "#4f46e5", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  buttonOutline: { flex: 1, padding: "0.7rem", backgroundColor: "white", color: "#4f46e5", border: "1px solid #4f46e5", borderRadius: "4px", cursor: "pointer" },
};
