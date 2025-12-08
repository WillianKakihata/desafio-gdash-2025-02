import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { WeatherLogModelOut } from '@/types/weather'

interface RainProbabilityChartProps {
  data: WeatherLogModelOut[]
  loading?: boolean
}

function formatDate(dateString: string | Date): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getRainColor(value: number): string {
  if (value < 30) return '#22c55e' // verde
  if (value < 70) return '#eab308' // amarelo
  return '#ef4444' // vermelho
}

export function RainProbabilityChart({
  data,
  loading,
}: RainProbabilityChartProps) {
  if (loading) {
    return (
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">
            Probabilidade de Chuva ao Longo do Tempo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Carregando...
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">
            Probabilidade de Chuva ao Longo do Tempo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Nenhum dado disponível
          </div>
        </CardContent>
      </Card>
    )
  }

  // Ordenar por data
  const sortedData = [...data].sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })

  const chartData = sortedData.map((item) => ({
    time: formatDate(item.createdAt),
    chuva: item.chuva,
    fullDate: new Date(item.createdAt).toLocaleString('pt-BR'),
  }))

  // Calcular cor média para o gradiente
  const avgRain = chartData.reduce((sum, item) => sum + item.chuva, 0) / chartData.length
  const avgColor = getRainColor(avgRain)

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">
          Probabilidade de Chuva ao Longo do Tempo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorChuva" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={avgColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={avgColor} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              label={{ value: '%', angle: -90, position: 'insideLeft' }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
              }}
              formatter={(value: number) => [`${value}%`, 'Probabilidade']}
              labelFormatter={(label) => `Hora: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="chuva"
              stroke={avgColor}
              strokeWidth={2}
              fill="url(#colorChuva)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


