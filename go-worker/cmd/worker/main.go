package main

import (
	"log"

	"github.com/joho/godotenv"
	"go-worker/internal/config"
	"go-worker/internal/queue"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Não foi possível carregar .env, usando variáveis do sistema")
	}

	cfg := config.Load()
	log.Println("Iniciando worker...")

	queue.StartWorker(cfg.RabbitURL, "weather", cfg.APIURL)
}
