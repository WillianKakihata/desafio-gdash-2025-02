import { useState, useEffect } from 'react'
import type { WeatherLogModelOut } from '@/types/weather'
import { getWeatherLogs } from '@/services/api'

export function useWeatherHistory() {
  const [data, setData] = useState<WeatherLogModelOut[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const logs = await getWeatherLogs()
      setData(logs)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, refetch: fetchData }
}


