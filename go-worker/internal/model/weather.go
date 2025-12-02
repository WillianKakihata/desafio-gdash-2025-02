package model

type WeatherData struct {
	Temperatura float64 `json:"temperatura"`
	Umidade     int     `json:"umidade"`
	Vento       float64 `json:"vento"`
	Condicao    string  `json:"condicao"`
	Chuva       float64 `json:"chuva"`
}
