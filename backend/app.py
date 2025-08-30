import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para qualquer origem

PREFERENCES_FILE = "preferences.json"

# Rota para salvar preferências
@app.route("/set-preference", methods=["POST"])
def set_preference():
    data = request.json
    escolha = data.get("escolha")
    horario = data.get("horario")

    if not escolha or not horario:
        return jsonify({"error": "Campos obrigatórios: escolha e horario"}), 400

    prefs = {}
    if os.path.exists(PREFERENCES_FILE):
        with open(PREFERENCES_FILE, "r") as f:
            prefs = json.load(f)

    prefs[escolha] = {"horario": horario}

    with open(PREFERENCES_FILE, "w") as f:
        json.dump(prefs, f, indent=2)

    return jsonify({"msg": f"Preferência '{escolha}' salva com sucesso!"})

# Rota para listar todas as preferências
@app.route("/get-preferences", methods=["GET"])
def get_preferences():
    if os.path.exists(PREFERENCES_FILE):
        with open(PREFERENCES_FILE, "r") as f:
            prefs = json.load(f)
        return jsonify(prefs)
    return jsonify({})

# Rota para buscar notícias por tag/tópico
@app.route("/news", methods=["GET"])
def get_news():
    escolha = request.args.get("escolha")
    if not escolha:
        return jsonify({"error": "Informe uma escolha: ?escolha=Microsoft"}), 400

    NEWSAPI_KEY = os.getenv("NEWSAPI_KEY")
    if not NEWSAPI_KEY:
        return jsonify({"error": "NewsAPI key não configurada"}), 500

    import requests
    url = f"https://newsapi.org/v2/everything?q={escolha}&language=pt&apiKey={NEWSAPI_KEY}"
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"error": "Erro ao consultar NewsAPI"}), 500

    articles = response.json().get("articles", [])
    summaries = [{"title": a["title"], "url": a["url"]} for a in articles[:5]]
    return jsonify(summaries)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
