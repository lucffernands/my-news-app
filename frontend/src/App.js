import { useState } from "react";
import { setPreference } from "./api";

function App() {
  const [topico, setTopico] = useState("tecnologia");
  const [horario, setHorario] = useState("12:00");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Como não vamos usar email/login, apenas usamos "anon" como identificador
    const res = await setPreference("anon", topico, horario);
    setMsg(res.msg || "Preferências salvas!");
  };

  return (
    <div className="container">
      <h1>My News App</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Escolha o tópico:
          <select value={topico} onChange={(e) => setTopico(e.target.value)}>
            <option value="tecnologia">Tecnologia</option>
            <option value="esportes">Esportes</option>
            <option value="politica">Política</option>
            <option value="saude">Saúde</option>
            <option value="entretenimento">Entretenimento</option>
          </select>
        </label>
        <label>
          Escolha o horário:
          <input
            type="time"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            required
          />
        </label>
        <button type="submit">Salvar Preferências</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
    </div>
  );
}

export default App;
