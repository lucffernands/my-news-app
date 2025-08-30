// Usando caminhos relativos porque frontend e backend estão no mesmo serviço
const BASE_URL = "";

/**
 * Salva as preferências do usuário no backend
 * @param {string} email - Email do usuário
 * @param {string} topico - Tópico escolhido
 * @param {string} horario - Horário escolhido (HH:MM)
 * @returns {Promise<Object>} - Resposta da API
 */
export async function setPreference(email, topico, horario) {
  try {
    const res = await fetch(`${BASE_URL}/set-preference`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, topic: topico, time: horario })
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
    const res = await fetch(`${BASE_URL}/get_preferences`);
    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    return [];
  }
}

/**
 * Retorna notícias por tópico
 * @param {string} topico
 * @returns {Promise<Array>} - Lista de notícias
 */
export async function getNews(topico) {
  try {
    const res = await fetch(`${BASE_URL}/news?topic=${topico}`);
    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Erro ao buscar notícias:", err);
    return [];
  }
}
