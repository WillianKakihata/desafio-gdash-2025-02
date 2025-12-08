import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Copy, Check, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface InsightsDisplayProps {
  insights: string;
  loading?: boolean;
  lastUpdated?: Date;
}

export function InsightsDisplay({
  insights,
  loading,
  lastUpdated,
}: InsightsDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(insights);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Insights de IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Brain className="h-8 w-8 text-purple-400 animate-pulse mx-auto mb-2" />
              <p className="text-gray-600">Gerando insights...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!insights) {
    return (
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Insights de IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            Nenhum insight disponível no momento
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Insights de IA
          </CardTitle>
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="border-purple-300 text-purple-700 hover:bg-purple-100"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copiar
              </>
            )}
          </Button>
        </div>
        {lastUpdated && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <Clock className="h-4 w-4" />
            <span>
              Atualizado em:{" "}
              {lastUpdated.toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="prose prose-lg gap-2">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-[30px] font-bold mb-3 mt-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-[25px] font-bold mb-2 mt-3">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-[20px] font-bold mb-2 mt-2">{children}</h3>
              ),
            }}
          >
            {insights}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
