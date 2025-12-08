import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, ArrowRight } from 'lucide-react'

export function InsightsSection() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/insights')
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 cursor-pointer hover:shadow-lg transition-all" onClick={handleClick}>
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Insights de IA
          </div>
          <ArrowRight className="h-5 w-5 text-purple-600" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Clique para ver os insights gerados pela IA
        </p>
      </CardContent>
    </Card>
  )
}

