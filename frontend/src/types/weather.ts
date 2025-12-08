export interface WeatherLogModelOut {
  id: string
  temperatura: number
  umidade: number
  vento: number
  condicao: string
  chuva: number
  createdAt: Date | string
}

export type WeatherHistory = WeatherLogModelOut[]


