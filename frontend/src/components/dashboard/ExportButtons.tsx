import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, FileSpreadsheet, FileText } from 'lucide-react'
import { exportCsv, exportXlsx } from '@/services/api'

export function ExportButtons() {
  const [loadingCsv, setLoadingCsv] = useState(false)
  const [loadingXlsx, setLoadingXlsx] = useState(false)

  const handleExportCsv = async () => {
    try {
      setLoadingCsv(true)
      const blob = await exportCsv()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'weather.csv'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Erro ao exportar CSV:', error)
      alert('Erro ao exportar CSV')
    } finally {
      setLoadingCsv(false)
    }
  }

  const handleExportXlsx = async () => {
    try {
      setLoadingXlsx(true)
      const blob = await exportXlsx()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'weather.xlsx'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Erro ao exportar XLSX:', error)
      alert('Erro ao exportar XLSX')
    } finally {
      setLoadingXlsx(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        onClick={handleExportCsv}
        disabled={loadingCsv || loadingXlsx}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        {loadingCsv ? (
          <>Carregando...</>
        ) : (
          <>
            <FileText className="h-4 w-4 mr-2" />
            Exportar CSV
          </>
        )}
      </Button>

      <Button
        onClick={handleExportXlsx}
        disabled={loadingCsv || loadingXlsx}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {loadingXlsx ? (
          <>Carregando...</>
        ) : (
          <>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Exportar XLSX
          </>
        )}
      </Button>
    </div>
  )
}


