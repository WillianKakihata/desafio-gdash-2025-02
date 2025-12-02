 package service

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"go-worker/internal/model"
)

const (
	maxRetries = 3
	retryDelay = 2 * time.Second
)

func SendToAPI(apiURL string, data model.WeatherData) bool {
	data.Temperatura = data.Temperatura*9/5 + 32

	payload, _ := json.Marshal(data)

	for i := 0; i < maxRetries; i++ {
		resp, err := http.Post(apiURL, "application/json", bytes.NewBuffer(payload))
		if err != nil {
			log.Printf("Erro ao enviar para API: %v", err)
		} else {
			resp.Body.Close()
			if resp.StatusCode >= 200 && resp.StatusCode < 300 {
				log.Println("Dados enviados com sucesso!")
				return true
			} else {
				log.Printf("API retornou status: %d", resp.StatusCode)
			}
		}
		time.Sleep(retryDelay)
	}
	log.Println("Falha ao enviar dados após retries")
	return false
}
