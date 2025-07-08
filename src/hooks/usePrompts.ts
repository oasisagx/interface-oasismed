import { useState, useEffect } from 'react';
import { PromptTemplate, PromptCategory } from '../types';

// Templates médicos realistas e funcionais
const mockCategories: PromptCategory[] = [
  {
    id: '1',
    name: 'Clínico',
    description: 'Prompts para avaliação clínica',
    icon: 'stethoscope',
    templates: [
      {
        id: '1',
        title: 'Anamnese Completa',
        description: 'Template para anamnese sistemática',
        content: `# ANAMNESE MÉDICA COMPLETA

## IDENTIFICAÇÃO
- Nome: [Nome do paciente]
- Idade: [Idade]
- Profissão: [Profissão]
- Estado civil: [Estado civil]

## QUEIXA PRINCIPAL
- Descreva o sintoma principal em suas palavras

## HISTÓRIA DA DOENÇA ATUAL
1. **Início dos sintomas:** Quando começou?
2. **Evolução:** Como evoluiu ao longo do tempo?
3. **Fatores de melhora/piora:** O que alivia ou piora?
4. **Sintomas associados:** Outros sintomas presentes?
5. **Medicações em uso:** Quais medicamentos está tomando?

## ANTECEDENTES PESSOAIS
- Doenças prévias: [Listar]
- Cirurgias: [Listar]
- Alergias: [Medicamentos/alimentos]
- Medicações contínuas: [Listar]

## ANTECEDENTES FAMILIARES
- Diabetes: [ ] Sim [ ] Não
- Hipertensão: [ ] Sim [ ] Não  
- Câncer: [ ] Sim [ ] Não
- Cardiopatias: [ ] Sim [ ] Não

## HÁBITOS DE VIDA
- Tabagismo: [ ] Sim [ ] Não - Quantos cigarros/dia?
- Etilismo: [ ] Sim [ ] Não - Frequência?
- Atividade física: [ ] Sim [ ] Não - Tipo e frequência?

Analise este caso de forma sistemática e forneça hipóteses diagnósticas.`,
        category: 'clinical',
        tags: ['anamnese', 'avaliação', 'sistemática'],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        title: 'Avaliação de Dor',
        description: 'Análise sistemática de quadros dolorosos',
        content: `# AVALIAÇÃO SISTEMÁTICA DE DOR

Analise o quadro doloroso seguindo os parâmetros:

## CARACTERÍSTICAS DA DOR
1. **Localização:** Onde exatamente dói?
2. **Intensidade:** Escala de 0-10
3. **Qualidade:** Como é a dor? (pontada, queimação, peso, cólica)
4. **Irradiação:** A dor se espalha para outros locais?
5. **Duração:** Há quanto tempo dura?
6. **Frequência:** É contínua ou em crises?

## FATORES MODULADORES
- **Melhora com:** [movimento, repouso, medicações, posição]
- **Piora com:** [movimento, esforço, alimentação, stress]

## SINTOMAS ASSOCIADOS
- [ ] Náuseas/vômitos
- [ ] Febre
- [ ] Alterações intestinais
- [ ] Alterações urinárias
- [ ] Outros: [especificar]

## IMPACTO FUNCIONAL
- Interfere no sono? [ ] Sim [ ] Não
- Interfere no trabalho? [ ] Sim [ ] Não  
- Interfere nas atividades diárias? [ ] Sim [ ] Não

Com base nesta análise, forneça:
1. Diagnósticos diferenciais mais prováveis
2. Exames complementares necessários
3. Proposta terapêutica inicial`,
        category: 'clinical',
        tags: ['dor', 'sintomas', 'avaliação'],
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
      },
    ],
  },
  {
    id: '2',
    name: 'Diagnóstico',
    description: 'Prompts para auxílio diagnóstico',
    icon: 'search',
    templates: [
      {
        id: '3',
        title: 'Diagnóstico Diferencial',
        description: 'Template para diagnóstico diferencial sistemático',
        content: `# DIAGNÓSTICO DIFERENCIAL SISTEMÁTICO

## DADOS CLÍNICOS
- **Sintomas principais:** [Listar em ordem de importância]
- **Sinais físicos:** [Achados do exame físico]
- **Exames laboratoriais:** [Resultados disponíveis]
- **Exames de imagem:** [Resultados disponíveis]

## ANÁLISE SISTEMÁTICA

### HIPÓTESE 1: [Nome da condição]
- **Probabilidade:** [Alta/Média/Baixa]
- **Argumentos a favor:**
  - Sintoma compatível com...
  - Exame físico mostra...
  - Laboratório sugere...
- **Argumentos contra:**
  - Ausência de...
  - Idade não típica...
- **Exames para confirmar:** [Listar]

### HIPÓTESE 2: [Nome da condição]
- **Probabilidade:** [Alta/Média/Baixa]
- **Argumentos a favor:**
- **Argumentos contra:**
- **Exames para confirmar:**

### HIPÓTESE 3: [Nome da condição]
- **Probabilidade:** [Alta/Média/Baixa]
- **Argumentos a favor:**
- **Argumentos contra:**
- **Exames para confirmar:**

## CONDUTA PROPOSTA
1. **Exames prioritários:** [Listar por ordem de urgência]
2. **Tratamento empírico:** [Se aplicável]
3. **Sinais de alerta:** [Quando reavaliar urgente]
4. **Seguimento:** [Prazo para reavaliação]

Forneça uma análise detalhada seguindo este protocolo.`,
        category: 'diagnostic',
        tags: ['diagnóstico', 'diferencial', 'sistemático'],
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-01-25'),
      },
    ],
  },
  {
    id: '3',
    name: 'Tratamento',
    description: 'Prompts para planejamento terapêutico',
    icon: 'pill',
    templates: [
      {
        id: '4',
        title: 'Prescrição Médica',
        description: 'Template para prescrição sistemática',
        content: `# PRESCRIÇÃO MÉDICA COMPLETA

## IDENTIFICAÇÃO DO PACIENTE
- Nome: [Nome completo]
- Idade: [Idade] | Peso: [Peso kg] | Altura: [Altura cm]
- Diagnóstico: [CID-10]

## MEDICAÇÕES PRESCRITAS

### MEDICAÇÃO 1: [Nome do medicamento]
- **Apresentação:** [mg, comprimidos, ml]
- **Posologia:** [Dose] via [VO/IM/IV] de [intervalo]
- **Duração:** [X dias/contínuo]
- **Horários sugeridos:** [Ex: 8h-20h]
- **Orientações especiais:** [Com alimento, jejum, etc.]

### MEDICAÇÃO 2: [Nome do medicamento]
- **Apresentação:**
- **Posologia:**
- **Duração:**
- **Horários sugeridos:**
- **Orientações especiais:**

## ORIENTAÇÕES GERAIS
1. **Administração:**
   - Horários regulares conforme prescrição
   - Não interromper tratamento sem orientação médica
   
2. **Efeitos adversos possíveis:**
   - [Listar principais efeitos]
   - Quando procurar atendimento médico
   
3. **Interações importantes:**
   - Evitar álcool durante tratamento
   - Informar outros medicamentos em uso
   
4. **Monitorização:**
   - Sinais de melhora esperados
   - Tempo para reavaliação

## MEDIDAS NÃO FARMACOLÓGICAS
- [Repouso, dieta, exercícios, etc.]

## RETORNO
- Data: [Data específica]
- Condições para retorno antecipado: [Listar sinais de alerta]

Revise esta prescrição considerando interações, dosagens e duração apropriadas.`,
        category: 'treatment',
        tags: ['prescrição', 'medicação', 'tratamento'],
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
      },
    ],
  },
];

export const usePrompts = () => {
  const [categories, setCategories] = useState<PromptCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('1'); // Inicia com categoria selecionada
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simula carregamento rápido
    setIsLoading(true);
    setTimeout(() => {
      setCategories(mockCategories);
      // Auto-seleciona primeiro template para demonstração
      if (mockCategories.length > 0 && mockCategories[0].templates.length > 0) {
        setSelectedTemplate(mockCategories[0].templates[0]);
      }
      setIsLoading(false);
    }, 500);
  }, []);

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Auto-seleciona primeiro template da categoria
    const category = categories.find(c => c.id === categoryId);
    if (category && category.templates.length > 0) {
      setSelectedTemplate(category.templates[0]);
    } else {
      setSelectedTemplate(null);
    }
  };

  const selectTemplate = (template: PromptTemplate) => {
    setSelectedTemplate(template);
  };

  const useTemplate = (template: PromptTemplate) => {
    // Simula uso do template - poderia copiar para clipboard ou enviar para chat
    navigator.clipboard.writeText(template.content);
    alert('Template copiado para clipboard e pronto para uso!');
  };

  return {
    categories,
    selectedCategory,
    selectedTemplate,
    isLoading,
    error,
    selectCategory,
    selectTemplate,
    useTemplate,
  };
};