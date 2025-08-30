import { useState } from "react";
import { setPreference, getNews } from "./api";

function App() {
  const [topic, setTopic] = useState("tecnologia");
  const [time, setTime] = useState("12:00");
  const [message, setMessage] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();

    // Para testes, não usamos email
    const email = "usuario-teste"; 

    const res = await setPreference(email, topic, time);
    setMessage(res.message || res.msg || "Preferência salva!");
  };

  const handleFetchNews = async () => {
    const news = await getNews(topic);
    console.log("Notícias:", news);
    alert(news.map(n => n.title).join("\n"));
  };

  return (
    <div className="container">
      <h1>My News App</h1>
      <form onSubmit={handleSave}>
        <label>
          Tópico ou Tag:
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </label>
        <label>
          Horário (HH:MM):
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>
        <button type="submit">Salvar Preferência</button>
      </form>

      {message && <p>{message}</p>}

      <hr />
      <button onClick={handleFetchNews}>Testar Busca de Notícias</button>
    </div>
  );
}

export default App;
