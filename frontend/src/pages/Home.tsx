import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Card className="w-full max-w-lg bg-white border border-gray-200 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-gray-900 mb-2">
            Weather Pipeline
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Sistema de monitoramento meteorológico
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-700 mb-6">
            Acesse sua conta ou crie uma nova para começar a monitorar o clima
            em tempo real.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/signup" className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base">
                Cadastrar
              </Button>
            </Link>

            <Link to="/signin" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 h-12 text-base"
              >
                Entrar
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


