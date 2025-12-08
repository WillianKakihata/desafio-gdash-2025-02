import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { WeatherLogModelOut } from '@/types/weather'

interface WeatherTableProps {
  data: WeatherLogModelOut[]
  loading?: boolean
}

function formatDateTime(dateString: string | Date): string {
  const date = new Date(dateString)
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function WeatherTable({ data, loading }: WeatherTableProps) {
  if (loading) {
    return (
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Registros Históricos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">Carregando...</div>
        </CardContent>
      </Card>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Registros Históricos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            Nenhum registro disponível
          </div>
        </CardContent>
      </Card>
    )
  }

  // Ordenar por data (mais recente primeiro)
  const sortedData = [...data].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">Registros Históricos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Data/Hora
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Condição
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Temperatura
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Umidade
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Vento
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Chuva
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {formatDateTime(item.createdAt)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {item.condicao}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 text-right">
                    {item.temperatura}°F
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 text-right">
                    {item.umidade}%
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 text-right">
                    {item.vento} km/h
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 text-right">
                    {item.chuva}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}


