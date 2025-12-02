package queue

import (
	"encoding/json"
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
	"go-worker/internal/model"
	"go-worker/internal/service"
)

func StartWorker(rabbitURL, queueName, apiURL string) {
	conn, err := amqp.Dial(rabbitURL)
	if err != nil {
		log.Fatalf("Erro ao conectar RabbitMQ: %v", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Erro ao abrir canal: %v", err)
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
		log.Fatalf("Erro ao declarar fila: %v", err)
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
		log.Fatalf("Erro ao consumir mensagens: %v", err)
	}

	forever := make(chan bool)

	go func() {
		for d := range msgs {
			log.Printf("Mensagem recebida: %s", d.Body)

			var data model.WeatherData
			if err := json.Unmarshal(d.Body, &data); err != nil {
				log.Printf("Erro ao decodificar JSON: %v", err)
				d.Nack(false, false)
				continue
			}

			if service.SendToAPI(apiURL, data) {
				d.Ack(false)
			} else {
				d.Nack(false, true)
			}
		}
	}()

	log.Println("Worker rodando...")
	<-forever
}
