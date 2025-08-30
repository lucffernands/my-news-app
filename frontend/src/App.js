import { useState } from "react";
import { setPreference, getNews } from "./api";

function App() {
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("tecnologia");
  const [time, setTime] = useState("12:00");
  const [news, setNews] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Por favor, insira um email!");
      return;
    }

    const res = await setPreference(email, topic, time);
    alert(res.message || "Preferências salvas!");
  };

  const fetchNews = async () => {
    const articles = await getNews(topic);
    setNews(articles);
  };

  return (
    <div className="container">
      <h1>My News App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tópico ou tag"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button type="submit">Salvar Preferências</button>
      </form>

      <button onClick={fetchNews}>Buscar Notícias</button>

      <ul>
        {news.map((article, idx) => (
          <li key={idx}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
