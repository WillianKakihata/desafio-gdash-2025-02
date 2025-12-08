import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshCw, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useInsights } from '@/hooks/useInsights'
import { InsightsDisplay } from '@/components/insights/InsightsDisplay'

export default function Insights() {
  const navigate = useNavigate()
  const { data, loading, error, refetch } = useInsights()
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const handleRefresh = () => {
    refetch()
  }

  const handleBack = () => {
    navigate('/dashboard')
  }

  useEffect(() => {
    if (data && !loading) {
      setLastUpdated(new Date())
    }
  }, [data, loading])

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleBack}
              variant="outline"
              size="sm"
              className="border-gray-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Insights de IA</h1>
              <p className="text-gray-600 mt-1">
                Análise inteligente dos dados meteorológicos
              </p>
            </div>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={loading}
            variant="outline"
            className="border-gray-300"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`}
            />
            Atualizar
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">
              <strong>Erro:</strong> {error}
            </p>
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="mt-2 border-red-300 text-red-700"
            >
              Tentar novamente
            </Button>
          </div>
        )}

        {/* Insights Display */}
        <InsightsDisplay
          insights={data}
          loading={loading}
          lastUpdated={lastUpdated || undefined}
        />

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>ℹ️ Sobre os Insights:</strong> Os insights são gerados
            automaticamente pela IA com base nos dados meteorológicos coletados.
            Eles são atualizados periodicamente para fornecer análises precisas e
            recomendações relevantes.
          </p>
        </div>
      </div>
    </div>
  )
}

