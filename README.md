# 📰 My News App

**My News App** é um projeto que permite que usuários escolham tópicos ou tags de interesse e recebam notícias resumidas diariamente.  

- **Backend:** Python / Flask  
- **Frontend:** React  
- **Notificações:** Futuramente via e-mail ou push  

---

## 📁 Estrutura do Projeto
```
# Projeto My News App

my-news-app/
├── backend/                  # Backend Flask
│   ├── app.py                # Servidor principal
│   └── requirements.txt      # Dependências do Python
│
├── frontend/                 # Frontend React
│   ├── package.json          # Dependências do React
│   ├── public/
│   │   ├── index.html        # HTML principal
│   │   └── styles.css        # CSS separado
│   └── src/
│       ├── App.js            # Componente principal React
│       ├── api.js            # Funções para comunicação com o backend
│       └── index.js          # Ponto de entrada do React
│
└── README.md                 # Documentação do projeto
```
---

## ⚡ Funcionalidades

- 🏷️ Escolher tópicos ou tags de notícias  
- ⏰ Definir horário de envio de notícias  
- 📰 Consultar notícias recentes via NewsAPI  
- 💻 Frontend React simples e responsivo  

---

## 🖥️ Backend

# Dependências

```txt
Flask
requests
flask-cors
schedule
python-dotenv
```
# Executando localmente
```
# Instalar dependências
pip install -r requirements.txt

# Definir variável de ambiente da API
export NEWSAPI_KEY="SUA_CHAVE_DA_NEWSAPI"

# Rodar o backend
python app.py

O backend ficará disponível em http://localhost:5000 ou no IP da sua rede local.
```

---

# 🌐 Frontend

Dependências

npm install

Executando localmente

npm start

O frontend será aberto em http://localhost:3000 e se comunica com o backend via api.js.


---

🚀 Deploy

Render: Configure um Python Web Service apontando o diretório backend/.

Variáveis de ambiente: NEWSAPI_KEY.

Use a URL do backend no api.js do frontend.



---

💡 Observações

CSS separado em public/styles.css.

API configurada com CORS, permitindo comunicação segura com o frontend.

Para múltiplos usuários, gerenciar preferências no backend via arquivo JSON ou banco de dados.



---

📄 Licença

Este projeto é open source.

---
