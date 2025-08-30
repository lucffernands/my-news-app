// api.js

// URL pública do backend no Render
const BASE_URL = "https://my-news-app-98l9.onrender.com";

/**
 * Salva as preferências do usuário no backend
 * @param {string} topic - Tópico ou tag escolhida
 * @param {string} time - Horário desejado (HH:MM)
 * @returns {Promise<Object>} - Resposta da API
 */
export async function setPreference(topic, time) {
  try {
    const res = await fetch(`${BASE_URL}/set-preference`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, time })
    });

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Erro ao salvar preferências:", err);
    return { msg: "Falha ao salvar preferências" };
  }
}

/**
 * Retorna todos os usuários cadastrados
 * @returns {Promise<Array>} - Lista de usuários
 */
export async function getUsers() {
  try {
    const res = await fetch(`${BASE_URL}/get-preferences`);
    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Erro ao buscar preferências:", err);
    return [];
  }
}
