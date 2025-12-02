package config

import (
	"log"
	"os"
)

type Config struct {
	RabbitURL string
	APIURL    string
}

func Load() Config {
	rabbitURL := os.Getenv("RABBITMQ_URL")
	apiURL := os.Getenv("API_URL")

	if rabbitURL == "" || apiURL == "" {
		log.Fatal("Variáveis de ambiente RABBITMQ_URL ou API_URL não configuradas")
	}

	return Config{
		RabbitURL: rabbitURL,
		APIURL:    apiURL,
	}
}
