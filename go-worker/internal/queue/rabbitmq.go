package queue

import (
	"encoding/json"
	"log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
	"go-worker/internal/model"
	"go-worker/internal/service"
)

const rabbitRetries = 5  
const rabbitRetryDelay = 3 

func StartWorker(rabbitURL, queueName, apiURL string) {
	var conn *amqp.Connection
	var err error

	type WeatherMessage struct {
    	Data  model.WeatherMessage `json:"data"`
    	Token string            `json:"token"`
	}

	for i := 0; i < rabbitRetries; i++ {
		conn, err = amqp.Dial(rabbitURL)
		if err == nil {
			break
		}
		log.Printf("Erro ao conectar RabbitMQ (%d/%d): %v", i+1, rabbitRetries, err)
		time.Sleep(time.Duration(rabbitRetryDelay) * time.Second)
	}

	if err != nil {
		log.Println("Não foi possível conectar ao RabbitMQ, worker será ignorado.")
		return 
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Printf("Erro ao abrir canal RabbitMQ: %v, worker será ignorado.", err)
		return
	}
	defer ch.Close()

	_, err = ch.QueueDeclare(
		queueName,
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Printf("Erro ao declarar fila RabbitMQ: %v, worker será ignorado.", err)
		return
	}

	msgs, err := ch.Consume(
		queueName,
		"",
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Printf("Erro ao consumir mensagens: %v, worker será ignorado.", err)
		return
	}

	forever := make(chan bool)
	go func() {
		for d := range msgs {
			var msg WeatherMessage
    if err := json.Unmarshal(d.Body, &msg); err != nil {
        log.Printf("Erro ao decodificar JSON: %v", err)
        d.Nack(false, false)
        continue
    }
    
    if msg.Token == "" {
        log.Println("Token não disponível na mensagem, mensagem ignorada")
        d.Ack(false)
        continue
    }
    
    if service.SendToAPI(apiURL, msg.Data, msg.Token) {
        d.Ack(false)
    } else {
        log.Println("Falha ao enviar para API, reencaminhando...")
        d.Nack(false, true)
    }
		}
	}()

	log.Println("Worker rodando...")
	<-forever
}
