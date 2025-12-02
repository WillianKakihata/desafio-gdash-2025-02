FROM golang:1.25 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o worker cmd/worker/main.go

FROM debian:bullseye-slim
WORKDIR /app

COPY --from=builder /app/worker .

CMD ["./worker"]
