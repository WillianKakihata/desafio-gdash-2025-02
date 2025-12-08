import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Thermometer, Droplets, Wind, Cloud } from 'lucide-react'
import type { WeatherLogModelOut } from '@/types/weather'

interface WeatherCardsProps {
  data: WeatherLogModelOut | null
  loading?: boolean
}

function getConditionIcon(condition: string) {
  const lower = condition.toLowerCase()
  if (lower.includes('ensolarado') || lower.includes('sol')) {
    return <Cloud className="h-8 w-8 text-yellow-500" />
  }
  if (lower.includes('chuvoso') || lower.includes('chuva')) {
    return <Droplets className="h-8 w-8 text-blue-500" />
  }
  if (lower.includes('tempestade')) {
    return <Cloud className="h-8 w-8 text-gray-600" />
  }
  return <Cloud className="h-8 w-8 text-gray-400" />
}

export function WeatherCards({ data, loading }: WeatherCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500">
                Carregando...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center text-gray-500 py-8">
        Nenhum dado disponível
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-white border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Temperatura
          </CardTitle>
          <Thermometer className="h-5 w-5 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {data.temperatura}°F
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Umidade
          </CardTitle>
          <Droplets className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {data.umidade}%
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Vento
          </CardTitle>
          <Wind className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {data.vento} km/h
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Condição
          </CardTitle>
          {getConditionIcon(data.condicao)}
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold text-gray-900">
            {data.condicao}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Chuva: {data.chuva}%
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


