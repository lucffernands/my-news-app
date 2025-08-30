import { useState } from "react";
import { setPreference } from "./api";

function App() {
  const [tag, setTag] = useState("");
  const [topico, setTopico] = useState("tecnologia");
  const [horario, setHorario] = useState("12:00");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tag && !topico) {
      alert("Por favor, escolha um tópico ou insira uma tag!");
      return;
    }

    const escolha = tag || topico;

    const res = await setPreference(escolha, horario);
    alert(res.msg || "Preferência salva!");
  };

  return (
    <div className="container">
      <h1>My News App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Tópico:
          <select
            value={topico}
            onChange={(e) => setTopico(e.target.value)}
          >
            <option value="tecnologia">Tecnologia</option>
            <option value="esportes">Esportes</option>
            <option value="politica">Política</option>
            <option value="saude">Saúde</option>
            <option value="entretenimento">Entretenimento</option>
          </select>
        </label>

        <label>
          Ou Tag:
          <input
            type="text"
            placeholder="Ex: Microsoft, Windows, TI..."
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </label>

        <label>
          Horário:
          <input
            type="time"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            required
          />
        </label>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default App;
