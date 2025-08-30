// URL do backend no Render
const BASE_URL = "https://my-news-app-98l9.onrender.com";

/**
 * Salva a preferência do usuário no backend
 * @param {string} escolha - Tópico ou tag escolhida
 * @param {string} horario - Horário escolhido (HH:MM)
 * @returns {Promise<Object>} - Resposta da API
 */
export async function setPreference(escolha, horario) {
  try {
    const res = await fetch(`${BASE_URL}/set-preference`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ escolha, horario })
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
 * @returns {Promise<Array>} - Lista de preferências
 */
export async function getPreferences() {
  try {
    const res = await fetch(`${BASE_URL}/get-preferences`);
    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Erro ao buscar preferências:", err);
    return [];
  }
}
