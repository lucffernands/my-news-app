import { useState } from "react";
import { setPreference } from "./api";

function App() {
  const [topico, setTopico] = useState("tecnologia");
  const [horario, setHorario] = useState("12:00");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Como não há email/login, usamos apenas tópico e horário
    const res = await setPreference("user", topico, horario);
    setMsg(res.msg || "Preferências salvas!");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>My News App</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <select
          value={topico}
          onChange={(e) => setTopico(e.target.value)}
          style={{ padding: "8px", fontSize: "14px" }}
        >
          <option value="tecnologia">Tecnologia</option>
          <option value="esportes">Esportes</option>
          <option value="politica">Política</option>
          <option value="saude">Saúde</option>
          <option value="entretenimento">Entretenimento</option>
        </select>
        <input
          type="time"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          required
          style={{ padding: "8px", fontSize: "14px" }}
        />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
          Salvar
        </button>
      </form>
      {msg && <p style={{ marginTop: "20px", textAlign: "center", color: "green" }}>{msg}</p>}
    </div>
  );
}

export default App;
