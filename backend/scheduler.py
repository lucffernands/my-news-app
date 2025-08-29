import time
import requests
from datetime import datetime
from db import get_all_users

NEWSAPI_KEY = os.getenv("NEWSAPI_KEY")

def fetch_news(topico):
    """
    Busca as 3 últimas notícias do tópico usando a NewsAPI
    """
    url = f"https://newsapi.org/v2/everything?q={topico}&language=pt&sortBy=publishedAt&apiKey={NEWSAPI_KEY}"
    r = requests.get(url).json()
    return r.get("articles", [])[:3]

def scheduler_loop():
    """
    Loop que roda a cada minuto e envia notícias no horário definido
    """
    print("Scheduler iniciado. Checando horários a cada minuto...")
    while True:
        now = datetime.now().strftime("%H:%M")
        users = get_all_users()

        for email, topico, horario in users:
            if horario == now:
                noticias = fetch_news(topico)
                print(f"\n=== Notícias para {email} sobre {topico} ===")
                for n in noticias:
                    print(f"- {n['title']} ({n['url']})")

        time.sleep(60)  # espera 1 minuto antes da próxima checagem

if __name__ == "__main__":
    scheduler_loop()
