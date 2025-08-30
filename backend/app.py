import json
import os
import requests
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Configura o Flask e CORS
app = Flask(__name__, static_folder="static")
CORS(app)

# Caminho para salvar preferências
PREFERENCES_FILE = "preferences.json"

# NewsAPI Key
NEWSAPI_KEY = os.getenv("NEWSAPI_KEY")

# -------------------------
# Rotas da API
# -------------------------

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


@app.route("/get_preferences", methods=["GET"])
def get_preferences():
    if os.path.exists(PREFERENCES_FILE):
        with open(PREFERENCES_FILE, "r") as f:
            prefs = json.load(f)
        return jsonify(prefs)
    return jsonify({})


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
    summaries = [
        {"title": a["title"], "url": a["url"]}
        for a in articles[:5]  # pega só as 5 primeiras notícias
    ]

    return jsonify(summaries)


# -------------------------
# Servindo frontend (React build)
# -------------------------

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


# -------------------------
# Inicialização
# -------------------------

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
