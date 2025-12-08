// openrouter.service.ts
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { ExceptionMessage } from 'src/common/exception/exception.messages';
import { CustomConfigService } from 'src/common/modules/custom.config.service';

@Injectable()
export class OpenRouterService {
    constructor(
        private readonly config: CustomConfigService
    ) {}
    private apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  
    async generateWeatherInsights(data: any[]): Promise<string> {
      if (!data || data.length === 0) {
         throw new BadRequestException(ExceptionMessage.OPENROUTER.NOT_DATA);
      }
      const prompt = `
        Você é um especialista em meteorologia.
        Analise estes dados históricos de clima e gere insights detalhados:
        ${JSON.stringify(data)}
        Instruções de formatação obrigatórias:
        1. Use sempre Markdown válido.
        2. Todos os títulos devem ter '#' correspondente ao nível.
        3. Use listas com '-' ou números, com recuo consistente.
        4. Sua resposta deve conter as seções obrigatórias: introdução, analise, conclusao . Adicione outra seção apenas se for realmente necessário.
        5. Não use '\\n' no texto. Quebre as linhas naturalmente.
        6. Não use HTML, emojis ou formatação fora de Markdown.
        7. O texto deve ser claro, didático e instigante, convidando o usuário a resolver o desafio.
        8. Responda **somente em Markdown**.
      `;
      const apiKey = this.config.get<string>('OPENROUTER_API_KEY'); 
      try {
        const response = await axios.post(
          this.apiUrl,
          {
            model: 'amazon/nova-2-lite-v1:free', 
            messages: [
              { role: 'system', content: 'Você é especialista em meteorologia.' },
              { role: 'user', content: prompt },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response?.data?.choices?.[0]?.message?.content) {
            throw new InternalServerErrorException(ExceptionMessage.OPENROUTER.RESPONSE);
        }
    
        return response.data.choices[0].message.content;
    }
      catch {
          throw new InternalServerErrorException(ExceptionMessage.OPENROUTER.GENERIC);
      }
    }
}
  