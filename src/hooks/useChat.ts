import { useState, useCallback } from 'react';
import { ChatMessage } from '../types';

// Respostas médicas simuladas super realistas
const SIMULATED_RESPONSES = [
  {
    triggers: ['análise', 'exame', 'laboratorial', 'resultado'],
    response: `📋 **Análise de Exame Laboratorial**

Com base nos valores informados, observo:

**Parâmetros Normais:**
• Hemoglobina: 14.2 g/dL ✅
• Leucócitos: 7.800/mm³ ✅
• Glicemia: 98 mg/dL ✅

**Atenção:**
• PCR elevado (12 mg/L) - sugere processo inflamatório
• VHS aumentado (45 mm/h) - corrobora inflamação

**Recomendações:**
1. Investigar foco infeccioso
2. Considerar antibioticoterapia se indicado
3. Reavaliar em 7 dias

Precisa de mais detalhes sobre algum parâmetro específico?`
  },
  {
    triggers: ['diagnóstico', 'diferencial', 'sintomas', 'quadro'],
    response: `🔍 **Diagnóstico Diferencial**

Baseado no quadro clínico apresentado:

**Hipóteses Principais:**
1. **Gastroenterite aguda** (70% probabilidade)
   - Sintomas típicos
   - Evolução temporal compatível

2. **Síndrome do intestino irritável** (20%)
   - Se sintomas recorrentes
   - Stress como fator desencadeante

3. **Apendicite inicial** (10%)
   - Descartar com exame físico detalhado
   - Considerar ultrassom se dúvida

**Próximos Passos:**
• Hemograma + PCR urgente
• Hidratação venosa se necessário
• Reavaliação em 6h

Quer que eu detalhe alguma das hipóteses?`
  },
  {
    triggers: ['dosagem', 'medicamento', 'prescrição', 'posologia'],
    response: `💊 **Orientação de Dosagem**

Para o caso em questão, sugiro:

**Amoxicilina + Clavulanato:**
• **Adulto:** 875mg + 125mg VO 12/12h
• **Duração:** 7-10 dias
• **Com alimento** para melhor absorção

**Orientações importantes:**
• Completar todo o tratamento
• Não interromper mesmo com melhora
• Probióticos para proteção intestinal

**Contraindicações:**
⚠️ Alergia à penicilina
⚠️ Insuficiência renal grave

**Efeitos adversos comuns:**
• Diarreia leve (30% casos)
• Náuseas (10% casos)

Alguma dúvida sobre interações medicamentosas?`
  },
  {
    triggers: ['imagem', 'raio-x', 'tomografia', 'ressonância', 'ultrassom'],
    response: `🔬 **Interpretação de Imagem**

Analisando o exame de imagem:

**Achados Principais:**
• Estruturas ósseas íntegras
• Partes moles sem alterações significativas
• Espaços articulares preservados

**Pontos de Atenção:**
• Discreta rarefação óssea L4-L5
• Sugere processo degenerativo inicial
• Compatível com idade do paciente

**Recomendações:**
1. **Fisioterapia** - exercícios específicos para lombar
2. **Analgesia** - paracetamol 750mg 8/8h
3. **Postura** - orientações ergonômicas

**Seguimento:**
• Reavaliação em 30 dias
• Nova imagem apenas se piora clínica

Precisa de orientações para o paciente?`
  },
  {
    triggers: ['protocol', 'tratamento', 'conduta', 'manejo'],
    response: `📋 **Protocolo de Tratamento**

Seguindo diretrizes atualizadas:

**FASE 1 - Avaliação Inicial (0-2h)**
• Sinais vitais completos
• Anamnese dirigida
• Exame físico sistemático
• Exames complementares se indicado

**FASE 2 - Estabilização (2-6h)**
• Hidratação se necessário
• Analgesia adequada
• Antibioticoterapia empírica se suspeita infecciosa

**FASE 3 - Monitorização (6-24h)**
• Reavaliação clínica de 6/6h
• Ajuste terapêutico conforme evolução
• Critérios de alta hospitalar

**Indicadores de Melhora:**
✅ Afebril por 24h
✅ Aceitação de dieta
✅ Estabilidade hemodinâmica

Quer que eu detalhe alguma fase específica?`
  }
];

// Respostas genéricas para casos não específicos
const GENERIC_RESPONSES = [
  "Com certeza! Deixe-me analisar esse caso clínico. Pode me fornecer mais detalhes sobre os sintomas e histórico do paciente?",
  "Interessante questão médica. Para uma análise mais precisa, seria útil ter informações sobre sinais vitais, exames prévios e medicações em uso.",
  "Boa pergunta! Vou abordar isso de forma sistemática. Primeiro, vamos considerar o diagnóstico diferencial mais provável para este quadro.",
  "Perfeito! Essa é uma situação clínica que requer avaliação cuidadosa. Vamos seguir um protocolo estruturado de análise.",
  "Vou te ajudar com essa análise médica. Considerando as evidências científicas atuais, algumas considerações importantes são..."
];

const getRandomDelay = () => Math.random() * 2000 + 1000; // 1-3 segundos

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const findBestResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Procura por triggers específicos
    for (const responseObj of SIMULATED_RESPONSES) {
      if (responseObj.triggers.some(trigger => lowerMessage.includes(trigger))) {
        return responseObj.response;
      }
    }
    
    // Resposta genérica se não encontrar trigger específico
    return GENERIC_RESPONSES[Math.floor(Math.random() * GENERIC_RESPONSES.length)];
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simula tempo de processamento da IA
    setTimeout(() => {
      const aiResponse = findBestResponse(content);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, getRandomDelay());
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    error: null,
    sendMessage,
    clearMessages,
  };
};