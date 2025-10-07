import { HistoryItem } from '../pages/assistentes/Transcricao';

export const templateContents: Record<string, Record<string, (historyItem: HistoryItem) => string>> = {
  anamnese: {
    '1': (historyItem) => {
        const [date, name] = historyItem.subtitle.split(' - ');
        return `# ANAMNESE
## Identificação
• Nome: ${name}
• Data de nascimento/Idade:
• Gênero:
• Estado civil:
• Profissão:
• Data da consulta: ${date}
## Queixa Principal
Dor de cabeça há três dias.
## História da Doença Atual
Paciente refere dor de cabeça com três dias de evolução, localizada principalmente na região frontal
(testa), com irradiação ocasional para as têmporas. Caracteriza a dor como constante, de caráter
pulsátil, descrevendo sensação de pulsação acompanhando os batimentos cardíacos, com momentos
de piora.
Identifica fotofobia importante como fator de piora, relatando desconforto significativo em
ambientes com iluminação intensa e ao olhar para tela de celular, tendo evitado sair de casa durante
o dia devido a esse sintoma. Nega sintomas sistêmicos associados como febre, náuseas ou vômitos.
Nega sintomas respiratórios como resfriado recente ou obstrução nasal.
Realizou automedicação com paracetamol no dia anterior à consulta, sem melhora significativa do
quadro.
## Interrogatório Sistemático
Sintomas Gerais: Nega febre.
Sistema Digestório: Nega náuseas e vômitos.
Sistema Respiratório: Nega sintomas de resfriado. Nega obstrução nasal.
## Antecedentes Pessoais Patológicos
• Doenças prévias:
• Cirurgias:
• Internações:
• Alergias:
• Transfusões:
## Medicamentos em Uso
Paracetamol (uso ocasional por automedicação - utilizado no dia anterior sem melhora significativa)
## Antecedentes Familiares
## História Social e Hábitos de Vida
• Tabagismo:
• Etilismo:
• Atividade física:
• Sono: Padrão de sono inadequado, dormindo aproximadamente 5 a 6 horas por noite quando
consegue.
• Alimentação:
• Ocupação/Trabalho: Refere que o trabalho está "bem corrido", com estresse ocupacional
aparente.
• Moradia:
## Exame Físico Realizado
Sinais Vitais:
• Pressão arterial: 120/80 mmHg
Inspeção Geral:
• Estado geral preservado, paciente corado e hidratado.
Exame Neurológico:
• Movimentação ocular extrínseca: seguimento ocular preservado (seguiu objeto com os olhos
sem movimentar a cabeça) - exame normal
• Exame neurológico geral: sem alterações
Palpação:
• Sensibilidade dolorosa à palpação de pontos na região cefálica
• Sensibilidade dolorosa à palpação na região cervical
• Presença de tensão muscular evidente em região cervical e de ombros
## Exames Complementares Realizados
## Hipótese Diagnóstica
Cefaleia tensional, relacionada a estresse, má postura, tensão muscular e privação de sono.
## Conduta
Prescrição Medicamentosa:
• Naproxeno 500mg: tomar 1 comprimido imediatamente e repetir após 12 horas se a dor
persistir.
Orientações Não Farmacológicas:
• Repouso adequado (fundamental para recuperação)
• Aumentar tempo de sono para pelo menos 8 horas por noite nos próximos dias
• Afastamento laboral: se possível, tirar pelo menos 2 dias para descansar
• Reduzir tempo de exposição a telas (computador e celular)
• Manter ambientes com iluminação reduzida devido à fotofobia
• Realizar alongamentos cervicais e de ombros: girar a cabeça devagar para um lado, manter
por 5 segundos, depois para o outro lado (exercício demonstrado durante a consulta)
## Retorno/Seguimento:
• Retornar imediatamente se não houver melhora completa em 3 dias
• Retornar imediatamente se surgirem sinais de alerta: febre, vômitos ou piora importante da
dor
## Observações Adicionais
Durante o exame físico, o médico observou que a aplicação de luz durante a avaliação ocular
causou incômodo ao paciente, sendo necessário informar que seria breve devido à fotofobia
presente. O paciente demonstrou boa compreensão das orientações fornecidas. O médico enfatizou
de forma especial que o repouso é fundamental para a recuperação do quadro.`;
    },
    '2': (historyItem) => {
        const [date, name] = historyItem.subtitle.split(' - ');
        return `# ANAMNESE
## Identificação
• Nome: ${name}
• Data de nascimento/Idade:
• Gênero: Feminino
• Estado civil:
• Profissão:
• Data da consulta: ${date}
## Queixa Principal
Dor ao urinar.
## História da Doença Atual
Paciente refere início dos sintomas há dois dias (anteontem pela manhã), com piora significativa no
dia seguinte. Queixa-se de disúria caracterizada por ardência forte e sensação de queimação durante
a micção.
Apresenta polaciúria acentuada, com frequência miccional estimada em aproximadamente 15 a 20
vezes ao dia, associada a noctúria importante (acorda 3 a 4 vezes durante a noite para urinar). Relata
urgência miccional, com sensação de necessidade de urinar logo após ter esvaziado a bexiga, porém
com oligúria (baixo volume urinário em cada micção).
Refere dor em região suprapúbica (pé da barriga) em pontadas. Notou alteração no aspecto da urina,
que está com odor mais forte e coloração mais escurecida, negando hematúria macroscópica.
Nega febre e dor lombar ou em região de flancos. Relata sensação de cansaço leve.
Informa relação sexual no fim de semana anterior ao início dos sintomas.
## Interrogatório Sistemático
Sintomas Gerais: Nega febre. Refere cansaço leve.
Sistema Geniturinário:
• Disúria (ardência e queimação à micção)
• Polaciúria acentuada (15-20 micções/dia)
• Noctúria (3-4 episódios por noite)
• Urgência miccional
• Oligúria (baixo volume urinário por micção)
• Dor suprapúbica em pontadas
• Alteração do odor urinário (cheiro mais forte)
• Urina com coloração mais escurecida
• Nega hematúria
• Nega dor lombar ou em flancos
## Antecedentes Pessoais Patológicos
• Doenças prévias: Histórico de infecções urinárias: 2 episódios prévios, sendo o último
ocorrido há aproximadamente 1 ano.
• Cirurgias:
• Internações:
• Alergias:
• Transfusões:
## Medicamentos em Uso
Anticoncepcional oral (pílula anticoncepcional)
## Antecedentes Familiares
## História Social e Hábitos de Vida
• Tabagismo:
• Etilismo:
• Atividade física:
• Sono: Sono interrompido atualmente devido à noctúria (acorda 3-4 vezes por noite para
urinar)
• Alimentação:
• Ocupação/Trabalho:
• Moradia:
• Vida sexual: Sexualmente ativa. Relação sexual recente (fim de semana passado). Método
contraceptivo: anticoncepcional oral.
## Exame Físico Realizado
## Exames Complementares Realizados
Exame de Urina (Urina tipo I/EAS) - realizado em urgência durante a consulta:
• Leucócitos: 2 milhões (leucocitúria acentuada)
• Nitrito: positivo (indicando presença de bactérias)
## Hipótese Diagnóstica
Cistite (infecção da bexiga/infecção urinária baixa)
## Conduta
Prescrição Medicamentosa:
• Nitrofurantoína 100mg: tomar 1 comprimido de 6 em 6 horas por 5 dias (completar todo o
tratamento mesmo com melhora dos sintomas)
• Orientação: tomar preferencialmente junto com as refeições para evitar náuseas
Orientações Não Farmacológicas:
• Aumentar ingesta hídrica: beber pelo menos 2 litros de água por dia (auxilia na limpeza da
bexiga)
• Não reter urina: urinar sempre que sentir vontade
• Abstinência sexual: evitar relações sexuais até melhora completa do quadro
• Restrições dietéticas temporárias: evitar café, refrigerantes e bebidas alcoólicas (substâncias
que podem irritar a bexiga)
## Exames de Controle:
• Exame de urina de controle após término do tratamento (agendar para daqui a 1 semana)
para confirmar eliminação da infecção
## Retorno/Seguimento:
• Melhora esperada em 48 horas
• Retornar imediatamente se não houver melhora em 2 dias ou se surgirem sinais de alerta:
febre, dor lombar (dor nas costas/região dos rins) ou hematúria (sangue na urina)
## Observações Adicionais
O exame de urina foi realizado em caráter de urgência durante a própria consulta, com coleta
orientada pela enfermagem. O médico enfatizou especialmente a importância de completar os 5 dias
completos de antibioticoterapia, mesmo havendo melhora sintomática antes do término do
tratamento, para garantir a erradicação completa da infecção. A paciente demonstrou boa
compreensão de todas as orientações fornecidas.`;
    },
    '3': (historyItem) => {
        const [date, name] = historyItem.subtitle.split(' - ');
        return `# ANAMNESE
## Identificação
• Nome: ${name}
• Data de nascimento/Idade: 45 anos
• Gênero: Masculino
• Estado civil:
• Profissão:
• Data da consulta: ${date}
## Queixa Principal
Pressão arterial elevada detectada em medição na farmácia.
## História da Doença Atual
Paciente comparece à consulta após ter medido pressão arterial na farmácia no dia anterior à
consulta, com resultado de 160 x 100 mmHg. Refere que o farmacêutico orientou procura de
atendimento médico devido aos valores elevados.
Informa que realiza aferições ocasionais de pressão arterial na farmácia, porém esta foi a primeira
vez que apresentou valores tão elevados. Relata que em medições anteriores não prestava atenção
aos números específicos, mas nunca havia recebido alerta do farmacêutico sobre alterações.
Paciente encontra-se completamente assintomático. Nega cefaleia, tontura, dor torácica, dispneia ou
cansaço. Refere estranhamento por estar com pressão elevada sem apresentar qualquer sintoma.
## Interrogatório Sistemático
Sintomas Gerais: Nega sintomas. Refere sentir-se "normal".
Sistema Cardiovascular: Nega dor torácica, palpitações, dispneia e cansaço.
Sistema Neurológico: Nega cefaleia e tontura.
## Antecedentes Pessoais Patológicos
• Doenças prévias: Nega diabetes mellitus (nunca realizou exames para investigação). Nega
dislipidemia (nunca realizou exames para investigação). Relata não realizar check-up
médico há tempo considerável.
• Cirurgias:
• Internações:
• Alergias:
• Transfusões:
• Antropometria: Ganho ponderal de aproximadamente 10kg acima do peso ideal nos
últimos anos.
## Medicamentos em Uso
Nenhum medicamento em uso.
## Antecedentes Familiares
• Pai: Hipertensão arterial sistêmica em tratamento medicamentoso há anos.
• Mãe: Hipertensão arterial sistêmica desenvolvida após os 60 anos de idade.
## História Social e Hábitos de Vida
• Tabagismo: Não fuma.
• Etilismo: Consumo social de bebida alcoólica aos fins de semana (cerveja).
• Atividade física: Sedentário. Nega prática de atividade física. Refere cansaço ao chegar em
casa após o trabalho.
• Sono:
• Alimentação:
◦ Consumo frequente de "comida de rua" devido às demandas do trabalho
◦ Alto consumo de sal ("gosto de comida bem temperada")
◦ Dieta não saudável com uso excessivo de sal
• Ocupação/Trabalho: Trabalho que exige permanecer sentado durante todo o dia
(sedentarismo ocupacional).
• Moradia:
## Exame Físico Realizado
Sinais Vitais:
• Pressão arterial em membro superior direito: 160 x 100 mmHg
• Pressão arterial em membro superior esquerdo: 158 x 98 mmHg
Aparelho Cardiovascular:
• Ausculta cardíaca: normal
Aparelho Respiratório:
• Ausculta pulmonar: normal
• Padrão respiratório adequado durante o exame
Exame Físico Geral: Normal
## Exames Complementares Realizados
## Hipótese Diagnóstica
Hipertensão arterial sistêmica (a ser confirmada com monitorização).
## Conduta
Investigação Diagnóstica:
• Solicitada monitorização residencial da pressão arterial (MRPA):
◦ Aferir pressão arterial 2 vezes ao dia (uma medição pela manhã e outra à tarde ou
noite)
◦ Duração: 1 semana
◦ Registrar em tabela: data, horário e valores pressóricos
◦ Local de aferição: farmácia ou posto de saúde
Exames Complementares (a serem solicitados se confirmada hipertensão):
• Exames de sangue: glicemia, colesterol, função renal
• Exame de urina
• Objetivo: avaliar repercussão em órgãos-alvo e investigar fatores de risco cardiovascular
associados
Tratamento:
• Não iniciada medicação anti-hipertensiva no momento (aguardando confirmação diagnóstica
com MRPA)
Orientações Não Farmacológicas (iniciadas imediatamente):
• Redução drástica do consumo de sal (iniciar imediatamente, já no mesmo dia da consulta)
• Evitar alimentos industrializados e embutidos
• Atividade física: caminhar pelo menos 30 minutos por dia
• Perda de peso (enfatizado que cada quilo perdido auxilia no controle pressórico)
• Mudanças no estilo de vida de forma gradual (começar pela redução do sal, depois
introduzir exercícios progressivamente)
Sinais de Alerta:
• Procurar pronto-socorro imediatamente se apresentar: cefaleia forte, dor torácica, dispneia
ou visão turva
## Retorno/Seguimento:
• Retorno agendado em 1 semana (mesmo horário)
• Trazer registros da monitorização pressórica
• Após análise dos valores, será definida necessidade de tratamento medicamentoso
## Observações Adicionais
Esta é a primeira vez que a hipertensão arterial é documentada em ambiente de consultório médico.
O paciente demonstrou preocupação com o achado da pressão elevada, especialmente por estar
assintomático. O médico optou por estratégia de confirmação diagnóstica através de monitorização
domiciliar antes de iniciar tratamento medicamentoso, enfatizando a importância das medidas não
farmacológicas. Foi reforçada especialmente a necessidade de início imediato da restrição de sal,
antes mesmo da confirmação definitiva do diagnóstico. O paciente compreendeu as orientações e
concordou em seguir o plano proposto.`;
    }
  },
  evolucao_clinica: {
    '1': (historyItem) => `# EVOLUÇÃO CLÍNICA... (Conteúdo para ${historyItem.title})`,
    '2': (historyItem) => `# EVOLUÇÃO CLÍNICA... (Conteúdo para ${historyItem.title})`,
    '3': (historyItem) => `# EVOLUÇÃO CLÍNICA... (Conteúdo para ${historyItem.title})`,
  },
  prescricao_simples: {
    '1': (historyItem) => `# PRESCRIÇÃO SIMPLES... (Conteúdo para ${historyItem.title})`,
    '2': (historyItem) => `# PRESCRIÇÃO SIMPLES... (Conteúdo para ${historyItem.title})`,
    '3': (historyItem) => `# PRESCRIÇÃO SIMPLES... (Conteúdo para ${historyItem.title})`,
  },
  prescricao_controle_especial: {
    '1': (historyItem) => `# PRESCRIÇÃO DE CONTROLE ESPECIAL... (Conteúdo para ${historyItem.title})`,
    '2': (historyItem) => `# PRESCRIÇÃO DE CONTROLE ESPECIAL... (Conteúdo para ${historyItem.title})`,
    '3': (historyItem) => `# PRESCRIÇÃO DE CONTROLE ESPECIAL... (Conteúdo para ${historyItem.title})`,
  },
  exames_procedimentos: {
    '1': (historyItem) => `# EXAMES E PROCEDIMENTOS... (Conteúdo para ${historyItem.title})`,
    '2': (historyItem) => `# EXAMES E PROCEDIMENTOS... (Conteúdo para ${historyItem.title})`,
    '3': (historyItem) => `# EXAMES E PROCEDIMENTOS... (Conteúdo para ${historyItem.title})`,
  },
  encaminhamento: {
    '1': (historyItem) => `# ENCAMINHAMENTO... (Conteúdo para ${historyItem.title})`,
    '2': (historyItem) => `# ENCAMINHAMENTO... (Conteúdo para ${historyItem.title})`,
    '3': (historyItem) => `# ENCAMINHAMENTO... (Conteúdo para ${historyItem.title})`,
  },
  laudo_medico: {
    '1': (historyItem) => `# LAUDO MÉDICO... (Conteúdo para ${historyItem.title})`,
    '2': (historyItem) => `# LAUDO MÉDICO... (Conteúdo para ${historyItem.title})`,
    '3': (historyItem) => `# LAUDO MÉDICO... (Conteúdo para ${historyItem.title})`,
  },
  atestado_medico: {
    '1': (historyItem) => `# ATESTADO MÉDICO... (Conteúdo para ${historyItem.title})`,
    '2': (historyItem) => `# ATESTADO MÉDICO... (Conteúdo para ${historyItem.title})`,
    '3': (historyItem) => `# ATESTADO MÉDICO... (Conteúdo para ${historyItem.title})`,
  }
};
