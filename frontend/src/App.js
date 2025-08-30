import { useState } from "react";
import { setPreference, getUsers } from "./api";

function App() {
  const [topico, setTopico] = useState("tecnologia");
  const [horario, setHorario] = useState("12:00");
  const [tag, setTag] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topico && !tag) {
      setMsg("Escolha um tópico ou insira uma tag!");
      return;
    }

    const res = await setPreference(topico, tag, horario);
    setMsg(res.msg || "Preferências salvas!");
  };

  return (
    <div className="container">
      <h1>My News App</h1>
      <form onSubmit={handleSubmit}>
        <label>Tópico:</label>
        <select value={topico} onChange={(e) => setTopico(e.target.value)}>
          <option value="tecnologia">Tecnologia</option>
          <option value="esportes">Esportes</option>
          <option value="politica">Política</option>
          <option value="saude">Saúde</option>
          <option value="entretenimento">Entretenimento</option>
        </select>

        <label>Tag:</label>
        <input
          type="text"
          value={tag}
          placeholder="Ex: Microsoft, Windows"
          onChange={(e) => setTag(e.target.value)}
        />

        <label>Horário:</label>
        <input
          type="time"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
        />

        <button type="submit">Salvar</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}

export default App;
