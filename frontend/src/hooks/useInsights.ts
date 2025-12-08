import { useState, useEffect } from 'react'
import { getInsights } from '@/services/api'

export function useInsights() {
  const [data, setData] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const insights = await getInsights()
      setData(insights)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar insights')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, refetch: fetchData }
}


