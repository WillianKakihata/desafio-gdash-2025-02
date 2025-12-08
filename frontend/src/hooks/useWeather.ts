import { useMemo } from 'react'
import type { WeatherLogModelOut } from '@/types/weather'
import { useWeatherHistory } from './useWeatherHistory'

export function useWeather() {
  const { data, loading, error, refetch } = useWeatherHistory()

  // Retorna o último registro (dados atuais)
  const current = useMemo<WeatherLogModelOut | null>(() => {
    if (!data || data.length === 0) return null
    // Ordenar por data e pegar o mais recente
    const sorted = [...data].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateB - dateA
    })
    return sorted[0]
  }, [data])

  return { current, history: data, loading, error, refetch }
}


