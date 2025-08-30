// frontend/src/api.js

// URL do backend hospedado no Render
const BASE_URL = "https://my-news-app-98l9.onrender.com";

/**
 * Salva as preferências do usuário no backend
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
