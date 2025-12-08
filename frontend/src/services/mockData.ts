import type { WeatherLogModelOut } from '@/types/weather'

const conditions = [
  'Ensolarado',
  'Nublado',
  'Chuvoso',
  'Parcialmente nublado',
  'Neblina',
  'Tempestade',
]

function getRandomCondition(): string {
  return conditions[Math.floor(Math.random() * conditions.length)]
}

function generateMockData(): WeatherLogModelOut[] {
  const data: WeatherLogModelOut[] = []
  const now = new Date()

  for (let i = 14; i >= 0; i--) {
    const date = new Date(now)
    date.setHours(date.getHours() - i)
    date.setMinutes(Math.floor(Math.random() * 60))

    const condition = getRandomCondition()
    const baseTemp = 20 + Math.random() * 15 // 20-35°C
    const temp = Math.round(baseTemp * 10) / 10

    const humidity = Math.floor(40 + Math.random() * 40) // 40-80%
    const wind = Math.round((5 + Math.random() * 20) * 10) / 10 // 5-25 km/h
    const rain = Math.floor(Math.random() * 100) // 0-100%

    data.push({
      id: `mock-${i}`,
      temperatura: temp,
      umidade: humidity,
      vento: wind,
      condicao: condition,
      chuva: rain,
      createdAt: date.toISOString(),
    })
  }

  return data
}

export function getMockWeatherLogs(): Promise<WeatherLogModelOut[]> {
  return new Promise((resolve) => {
    // Simular delay de API
    setTimeout(() => {
      resolve(generateMockData())
    }, 500)
  })
}

export function getMockInsights(): Promise<string> {
  return new Promise((resolve) => {
    // Simular delay de API
    setTimeout(() => {
      const insights = [
        `Análise dos dados meteorológicos indica condições estáveis para as próximas horas. 

A temperatura está mantendo-se em níveis confortáveis (entre 22°C e 28°C), com umidade relativa do ar em faixa ideal. O vento está moderado, proporcionando uma sensação térmica agradável.

Recomendações:
• Condições ideais para atividades ao ar livre
• Mantenha-se hidratado
• Use protetor solar se for se expor ao sol`,

        `⚠️ ALERTA: Alta probabilidade de chuva nas próximas 6 horas.

Baseado no histórico de dados e padrões meteorológicos identificados, há uma probabilidade de 75% de precipitação significativa. A umidade do ar está elevada e a pressão atmosférica está em declínio.

Recomendações:
• Leve guarda-chuva ou capa de chuva
• Evite atividades ao ar livre desnecessárias
• Reduza a velocidade ao dirigir
• Proteja equipamentos eletrônicos da umidade`,

        `🌡️ Temperaturas elevadas previstas para hoje.

A análise dos dados históricos mostra uma tendência de aumento gradual da temperatura, com picos esperados entre 14h e 16h. A combinação de alta temperatura e umidade pode resultar em sensação térmica desconfortável.

Recomendações:
• Mantenha-se hidratado - beba água regularmente
• Evite exposição prolongada ao sol
• Use roupas leves e claras
• Procure locais com sombra ou climatizados
• Reduza atividades físicas intensas no período mais quente`,

        `✅ Condições climáticas favoráveis para atividades externas.

O padrão meteorológico atual mostra vento moderado (entre 10-15 km/h), baixa probabilidade de precipitação e temperatura amena. Essas condições são ideais para esportes, caminhadas e outras atividades ao ar livre.

Análise detalhada:
• Vento: Condições ideais para atividades esportivas
• Umidade: Níveis confortáveis
• Visibilidade: Boa
• Previsão: Estável para as próximas 4-6 horas`,

        `📊 Mudanças bruscas de temperatura detectadas no histórico.

A análise dos dados revela variações significativas de temperatura ao longo do dia. Essa instabilidade pode afetar o conforto térmico e requer atenção especial.

Padrão identificado:
• Variação de temperatura: ±8°C ao longo do dia
• Período mais instável: Manhã e final da tarde
• Tendência: Estabilização gradual

Recomendações:
• Vista-se em camadas para se adaptar às mudanças
• Mantenha agasalho por perto
• Monitore as condições antes de sair`,

        `🌧️ Sistema de baixa pressão se aproximando.

A análise dos dados meteorológicos indica a formação de um sistema de baixa pressão que pode trazer mudanças significativas nas condições climáticas nas próximas 12-24 horas.

Indicadores observados:
• Aumento gradual da umidade
• Queda na pressão atmosférica
• Mudança na direção do vento
• Aumento na probabilidade de precipitação

Recomendações:
• Prepare-se para possíveis chuvas
• Verifique sistemas de drenagem
• Evite atividades ao ar livre se possível
• Monitore atualizações meteorológicas`,

        `☀️ Período de clima seco e ensolarado.

Os dados indicam um padrão de clima seco e ensolarado que deve persistir pelos próximos dias. A umidade relativa está baixa e não há sinais significativos de precipitação.

Condições atuais:
• Temperatura: Estável e agradável
• Umidade: Baixa (pode causar desconforto)
• Vento: Leve a moderado
• Previsão: Clima seco por 3-5 dias

Recomendações:
• Hidrate-se adequadamente
• Use hidratante para a pele
• Evite exposição prolongada ao sol
• Considere usar umidificador em ambientes fechados`,

        `🌬️ Ventos fortes previstos.

A análise dos padrões de vento mostra uma tendência de aumento na velocidade, com picos esperados nas próximas horas. Ventos podem chegar a 25-30 km/h.

Impactos esperados:
• Sensação térmica reduzida
• Possível dificuldade em atividades ao ar livre
• Risco de queda de objetos soltos

Recomendações:
• Evite atividades aquáticas
• Proteja objetos soltos ao ar livre
• Dirija com atenção redobrada
• Use roupas adequadas para vento`,

        `🌡️ Análise de tendência: Temperatura em declínio.

Os dados históricos mostram uma tendência clara de queda na temperatura ao longo das últimas horas. Essa tendência deve continuar, resultando em condições mais frias.

Tendência identificada:
• Redução gradual de 2-3°C por hora
• Temperatura mínima esperada: 18°C
• Período mais frio: Madrugada e início da manhã

Recomendações:
• Agasalhe-se adequadamente
• Prepare roupas mais quentes
• Aqueça ambientes internos se necessário
• Monitore crianças e idosos`,

        `📈 Condições ideais para monitoramento contínuo.

O sistema meteorológico está apresentando padrões estáveis e previsíveis. Os dados coletados mostram consistência nas medições, indicando confiabilidade nas previsões.

Status do sistema:
• Qualidade dos dados: Excelente
• Consistência: Alta
• Previsibilidade: Boa
• Recomendação: Continuar monitoramento regular`,
      ]
      resolve(insights[Math.floor(Math.random() * insights.length)])
    }, 800)
  })
}

