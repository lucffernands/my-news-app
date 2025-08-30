// URL base do backend (substitua pelo endereço do Render)
const BASE_URL = "https://seu-backend.onrender.com";

/**
 * Salva as preferências do usuário no backend
 * @param {string} email - Email do usuário
 * @param {string} topic - Tópico ou tag escolhida
 * @param {string} time - Horário escolhido (HH:MM)
 * @returns {Promise<Object>} - Resposta da API
 */
export async function setPreference(email, topic, time) {
  try {
    const res = await fetch(`${BASE_URL}/set-preference`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, topic, time })
    });

    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Erro ao salvar preferências:", err);
    return { msg: "Falha ao salvar preferências" };
  }
}

/**
 * Retorna todas as preferências cadastradas
 * @returns {Promise<Array>} - Lista de usuários e tópicos
 */
export async function getPreferences() {
  try {
    const res = await fetch(`${BASE_URL}/get-preferences`);
    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Erro ao buscar preferências:", err);
    return {};
  }
}

/**
 * Busca notícias de um tópico ou tag
 * @param {string} topic - Tópico ou tag
 * @returns {Promise<Array>} - Lista de notícias
 */
export async function getNews(topic) {
  try {
    const res = await fetch(`${BASE_URL}/news?topic=${encodeURIComponent(topic)}`);
    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Erro ao buscar notícias:", err);
    return [];
  }
      }
