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

func SendToAPI(apiURL string, data model.WeatherMessage, token string) bool {
	data.Temperatura = data.Temperatura*9/5 + 32
	payload, _ := json.Marshal(data)

	for i := 0; i < maxRetries; i++ {
		req, err := http.NewRequest("POST", apiURL, bytes.NewBuffer(payload))
		if err != nil {
			log.Printf("Erro ao criar requisição: %v", err)
			return false
		}

		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("Authorization", "Bearer "+token)

		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			log.Printf("Erro ao enviar para API: %v", err)
		} else {
			defer resp.Body.Close()

			if resp.StatusCode >= 200 && resp.StatusCode < 300 {
				log.Println("Dados enviados com sucesso!")
				return true
			} else if resp.StatusCode == 401 || resp.StatusCode == 403 {
				log.Println("Token inválido ou expirado, mensagem ignorada")
				return true
			} else {
				log.Printf("API retornou status: %d, tentando novamente...", resp.StatusCode)
			}
		}

		time.Sleep(retryDelay)
	}

	log.Println("Falha ao enviar dados após retries")
	return false
}
