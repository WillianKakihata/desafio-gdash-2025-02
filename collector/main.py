from flask import Flask, request, jsonify
import schedule, time, threading, json, requests, pika, os, jwt, urllib.parse
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

API_KEY = os.getenv("API_KEY")
RABBITMQ_URL = os.getenv("RABBITMQ_URL")
JWT_SECRET = os.getenv("JWT_SECRET")

app = Flask(__name__)
CORS(app)

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    return response

@app.route('/registrar-coleta', methods=['OPTIONS'])
def registrar_options():
    return '', 200

jobs = {}


def coletar(cidade, user_id, token):
    try:
        print("Cidade original recebida:", repr(cidade))

        cidade_encoded = urllib.parse.quote(cidade)
        print(f"cidade encoded: {cidade_encoded} e apiKey: {API_KEY}")

        url = f"https://api.openweathermap.org/data/2.5/weather?q={cidade_encoded}&appid={API_KEY}&units=metric&lang=pt_br"
        resp = requests.get(url).json()

        dado = {
            "data": {
                "temperatura": resp["main"]["temp"],
                "umidade": resp["main"]["humidity"],
                "vento": resp["wind"]["speed"],
                "condicao": resp["weather"][0]["description"],
                "chuva": resp.get("rain", {}).get("1h", 0),
            },
            "token": token,
        }

        conn = pika.BlockingConnection(pika.URLParameters(RABBITMQ_URL))
        ch = conn.channel()
        ch.queue_declare(queue="weather")
        ch.basic_publish(exchange="", routing_key="weather", body=json.dumps(dado))
        conn.close()

        print(f"[OK] Enviado para RabbitMQ ({user_id}): {cidade}")

    except Exception as e:
        print(f"[ERRO] Coleta ({user_id}): {e}")


@app.post("/registrar-coleta")
def registrar():
    try:
        token = request.json["token"]

        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])

        user_id = payload["sub"]
        cidade = payload["city"]

        if user_id in jobs:
            schedule.cancel_job(jobs[user_id])

        job = schedule.every(30).minutes.do(
            coletar, cidade=cidade, user_id=user_id, token=token
        )

        coletar(cidade=cidade, user_id=user_id, token=token)
        jobs[user_id] = job

        return jsonify(
            {"ok": True, "msg": f"Coleta registrada para {cidade} (user {user_id})"}
        )

    except jwt.ExpiredSignatureError:
        return jsonify({"ok": False, "error": "Token expirado"}), 401

    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 400


def loop_scheduler():
    while True:
        schedule.run_pending()
        time.sleep(1)


threading.Thread(target=loop_scheduler, daemon=True).start()


if __name__ == "__main__":
    app.run(port=8081)
