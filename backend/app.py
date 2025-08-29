import os
from flask import Flask, request, jsonify
from db import init_db, add_or_update_user, get_all_users

app = Flask(__name__)

# Inicializa o banco de dados
init_db()

@app.route("/set-preference", methods=["POST"])
def set_preference():
    """
    Recebe email, tópico e horário do usuário
    e salva no banco de dados.
    """
    data = request.json
    email = data.get("email")
    topico = data.get("topico")
    horario = data.get("horario")

    if not email or not topico or not horario:
        return jsonify({"error": "Campos obrigatórios: email, topico, horario"}), 400

    add_or_update_user(email, topico, horario)
    return jsonify({"status": "ok", "msg": "Preferências salvas com sucesso!"})

@app.route("/users", methods=["GET"])
def list_users():
    """
    Retorna a lista de todos os usuários com suas preferências
    """
    users = get_all_users()
    return jsonify(users)

if __name__ == "__main__":
    # Porta padrão 5000, permite alterar via variável de ambiente
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)))
