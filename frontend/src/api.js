const BASE_URL = "http://localhost:5000";

/**
 * Salva as preferências do usuário no backend
 * @param {string} email - Email do usuário
 * @param {string} topico - Tópico escolhido
 * @param {string} horario - Horário escolhido (HH:MM)
 * @returns {Promise<Object>} - Resposta da API
 */
export async function setPreference(email, topico, horario) {
  const res = await fetch(`${BASE_URL}/set-preference`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, topico, horario })
  });
  return res.json();
}

/**
 * Retorna todos os usuários cadastrados
 * @returns {Promise<Array>} - Lista de usuários
 */
export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
}
