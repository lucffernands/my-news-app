# My News App

📰 **My News App** é um aplicativo web que envia notícias resumidas para os usuários no horário que escolherem.  

- Backend em **Python (Flask)**  
- Frontend em **React**  
- Banco de dados **SQLite** para testes (fácil de migrar para Postgres depois)  
- Busca notícias via **NewsAPI**  

---

## 🔹 Funcionalidades

- Escolha do **tópico** de interesse (tecnologia, esportes, política, etc.)  
- Definição do **horário** de envio de notícias  
- Agendamento automático para enviar notícias resumidas  
- Multiusuário (testes iniciais com 2 usuários)  

---

## 📂 Estrutura do projeto

my-news-app/
│
├── backend/                 # Backend Flask + scheduler
│   ├── app.py               # API para salvar/listar preferências
│   ├── db.py                # Banco SQLite
│   ├── scheduler.py         # Scheduler que busca notícias da NewsAPI
│   └── requirements.txt     # Dependências Python
│
├── frontend/                # Frontend React
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js           # Tela principal: email, tópico e horário
│       ├── api.js           # Comunicação com backend
│       └── index.js
│
└── README.md                # Informações do projeto

---

## ⚡ Tecnologias usadas

- **Python 3** + Flask  
- **React.js**  
- **SQLite** (teste local)  
- **NewsAPI** (API de notícias)  

---

## 🚀 Como rodar localmente (PC ou Termux)

### 1️⃣ Backend
```bash
cd backend
pip install -r requirements.txt
export NEWSAPI_KEY="SUA_CHAVE_AQUI"
python app.py           # Roda a API
python scheduler.py     # Roda o scheduler de notícias
```

---


2️⃣ Frontend

cd frontend
npm install
npm start               # Roda o app em http://localhost:3000


---



📄 Licença

Este projeto está sob a licença MIT.
