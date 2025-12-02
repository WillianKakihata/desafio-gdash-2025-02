import requests, json, pika, schedule, time
import os
from dotenv import load_dotenv


def get_location():
    try:
        resp = requests.get("https://ipinfo.io/json").json()
        return resp.get("city")
    except Exception as e:
        print(f"Erro para pegar a cidade: {e}")
load_dotenv()
API_KEY = os.getenv("API_KEY")
CITY = get_location()
RABBITMQ_URL = os.getenv("RABBITMQ_URL")


def coletar():
  try:
    url = f"https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}&units=metric&lang=pt_br"
    resp = requests.get(url).json()

    dado = {
        "temperatura": resp["main"]["temp"],
        "umidade": resp["main"]["humidity"],
        "vento": resp["wind"]["speed"],
        "condicao": resp["weather"][0]["description"],
        "chuva": resp.get("rain", {}).get("1h", 0)
    }

    print(f"Dados coletados:")
    print(json.dumps(dado, indent=2, ensure_ascii=False))
    print("-" * 50)
    try:
        conn = pika.BlockingConnection(pika.URLParameters(RABBITMQ_URL))
        ch = conn.channel()
        ch.queue_declare(queue="weather")
        ch.basic_publish(exchange="", routing_key="weather", body=json.dumps(dado))
        print("Enviado para o RabbitMQ!")
        conn.close()
    except Exception as e:
       print(f"RabbitMQ não disponível: {e}")
  except Exception as e:
    print(f"Erro na coleta: {e}")
        

schedule.every(30).seconds.do(coletar)



while True:
    schedule.run_pending()
    time.sleep(1)
