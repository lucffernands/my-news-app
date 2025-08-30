import os
import json
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Carrega variáveis do .env
load_dotenv()

app = Flask(__name__)
CORS(app)

NEWSAPI_KEY = os.getenv("NEWSAPI_KEY")
PREFERENCES_FILE = "preferences.json"


# Rota para salvar preferências de um usuário
@app.route("/set-preference", methods=["POST"])
def set_preference():
    data = request.json
    email = data.get("email")
    topic = data.get("topic")
    time = data.get("time")

    if not email or not topic or not time:
        return jsonify({"error": "Campos obrigatórios: email, topic, time"}), 400

    prefs = {}
    if os.path.exists(PREFERENCES_FILE):
        with open(PREFERENCES_FILE, "r") as f:
            prefs = json.load(f)

    prefs[email] = {"topic": topic, "time": time}

    with open(PREFERENCES_FILE, "w") as f:
        json.dump(prefs, f, indent=2)

    return jsonify({"message": "Preferência salva com sucesso!"})


# Rota para listar preferências
@app.route("/get-preferences", methods=["GET"])
def get_preferences():
    if os.path.exists(PREFERENCES_FILE):
        with open(PREFERENCES_FILE, "r") as f:
            prefs = json.load(f)
        return jsonify(prefs)
    return jsonify({})


# Rota para buscar notícias
@app.route("/news", methods=["GET"])
def get_news():
    topic = request.args.get("topic")
    if not topic:
        return jsonify({"error": "Informe um tópico: ?topic=tecnologia"}), 400

    url = f"https://newsapi.org/v2/everything?q={topic}&language=pt&apiKey={NEWSAPI_KEY}"
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"error": "Erro ao consultar NewsAPI"}), 500

    articles = response.json().get("articles", [])
    summaries = [{"title": a["title"], "url": a["url"]} for a in articles[:5]]

    return jsonify(summaries)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)))
