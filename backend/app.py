from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os, json

app = Flask(__name__, static_folder="../frontend/build", static_url_path="")
CORS(app)

PREFERENCES_FILE = "preferences.json"

# Serve o React build
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

# Rotas do backend
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

@app.route("/get-preferences", methods=["GET"])
def get_preferences():
    if os.path.exists(PREFERENCES_FILE):
        with open(PREFERENCES_FILE, "r") as f:
            prefs = json.load(f)
        return jsonify(prefs)
    return jsonify({})

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
