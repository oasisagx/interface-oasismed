import React, { useState, useEffect, Suspense } from 'react';
import { AIVoiceInput } from '../../components/ui/AIVoiceInput';
import { templateContents } from '../../data/templateFormatters';
import { marked } from 'marked';
import './Transcricao.css';

// Lazy load components para melhor performance
const TranscricaoSidebar = React.lazy(() => import('../../components/assistentes/TranscricaoSidebar'));
const ExportModal = React.lazy(() => import('../../components/assistentes/ExportModal'));

export interface HistoryItem {
  id: number;
  title: string;
  subtitle: string;
  transcription: string;
}

interface Template {
  id: string;
  title: string;
}

const history: HistoryItem[] = [
  {
    id: 1,
    title: 'Diagnóstico de Cefaleia Tensional',
    subtitle: '25/11/2025 • 17:30 • 17min • João da Silva Castro',
    transcription: `<br><br><br>Boa tarde, pode entrar e sentar, por favor. O que traz você aqui hoje? Doutor, estou com uma dor de cabeça que não passa há três dias já. Entendo, vamos conversar melhor sobre isso. Onde exatamente você sente essa dor? É aqui na frente, na testa principalmente, às vezes pega um pouco nas têmporas também. E como você descreveria essa dor? É uma dor constante ou ela vem e vai? Ela é constante, doutor, mas tem momentos que piora. É uma dor que parece que está pulsando, sabe? Como se tivesse acompanhando os batimentos do coração. Compreendo, e você notou alguma coisa que faz ela piorar ou melhorar? Ah sim, a luz me incomoda muito. Quando estou num ambiente muito claro ou olho para o celular, piora bastante. Tenho até evitado sair de casa durante o dia. E além da dor de cabeça e do incômodo com a luz, teve mais algum sintoma? Febre, enjoo, vômito, alguma coisa assim? Não, doutor, nada disso. Só a dor de cabeça mesmo. Você teve algum resfriado recentemente ou está com nariz entupido? Também não. Tem tomado alguma medicação por conta própria? Tomei um paracetamol ontem, mas não resolveu muito. Certo, vou examinar você agora. Primeiro vou verificar sua pressão. Pode ficar tranquilo, só relaxe o braço. Muito bem, 120 por 80, está ótima. Agora vou examinar seus olhos, olhe para a luz aqui. Sei que incomoda um pouco, mas é rápido. Agora siga meu dedo com os olhos sem mexer a cabeça. Isso, muito bem. Vou palpar alguns pontos da sua cabeça e pescoço, me avise se doer. Aqui dói? Um pouquinho. E aqui? Também. Percebo uma tensão muscular na região do pescoço e ombros. Você anda muito estressado ultimamente? Trabalho está bem corrido, doutor, e durmo pouco também. Quantas horas por noite mais ou menos? Umas cinco, seis horas quando consigo. Pois é, pelo que estou vendo no exame, você está bem, corado, hidratado, e o exame neurológico está normal. Sua dor de cabeça tem características de cefaleia tensional, que geralmente está relacionada a estresse, má postura, tensão muscular e privação de sono. Vou prescrever um analgésico mais específico para você, o naproxeno 500mg, você vai tomar um comprimido agora e outro após doze horas se a dor persistir. Mas o mais importante é o repouso. Preciso que você tente dormir pelo menos oito horas por noite nos próximos dias. E o trabalho, doutor? Olha, se possível, tire pelo menos dois dias para descansar. Evite ficar muito tempo no computador ou celular, mantenha o ambiente com luz mais baixa já que está te incomodando, e tente fazer alguns alongamentos no pescoço e ombros. Vou te mostrar alguns simples. Assim, gire a cabeça devagar para um lado, segure cinco segundos, depois para o outro. Isso mesmo. Se em três dias não melhorar completamente, ou se aparecer febre, vômito, ou a dor piorar muito, você retorna imediatamente, combinado? Combinado, doutor. Muito obrigado. Por nada, melhoras e não esqueça: o repouso é fundamental para sua recuperação.`
  },
  {
    id: 2,
    title: 'Tratamento de Cistite Bacteriana',
    subtitle: '24/11/2025 • 11:15 • 12min • Maria Costa Villar',
    transcription: `<br><br><br>Boa tarde, pode entrar. O que está acontecendo? Doutor, estou com um problema bem desconfortável. Estou sentindo muita dor quando vou fazer xixi. Há quanto tempo começou essa dor? Começou anteontem de manhã, mas ontem piorou muito. E além da dor ao urinar, tem mais algum sintoma? Ah sim, estou indo ao banheiro toda hora. Parece que acabei de ir e já estou com vontade de novo, mas quando vou sai pouquinho. Quantas vezes por dia você está indo ao banheiro mais ou menos? Nossa, perdi as contas, doutor. Deve ser umas quinze, vinte vezes. À noite também? Sim, acordo umas três, quatro vezes durante a noite. É muito ruim. E como é essa dor? É uma ardência, queimação? É uma ardência forte mesmo, queima bastante. E às vezes sinto umas pontadas no pé da barriga. Você notou alguma alteração na cor ou cheiro da urina? Está com um cheiro mais forte sim, e me parece um pouco mais escura, mas não tem sangue. Teve febre nesses dias? Não, febre não. Me sinto um pouco cansada, mas febre não tive. E dor nas costas, na região dos rins? Também não, doutor. É só na hora de urinar e no pé da barriga mesmo. Você teve relação sexual recentemente? Tive sim, no fim de semana passado. Usa algum método contraceptivo? Uso pílula anticoncepcional. Já teve infecção urinária outras vezes? Já, umas duas vezes, a última foi ano passado. Certo, vou pedir para você colher uma amostra de urina para exame. A enfermeira vai te orientar como fazer a coleta. Pode ser agora mesmo? Claro, doutor. Vou pedir o exame em urgência para termos o resultado rápido. Aguarde um momentinho que já volto. Pronto, voltei com o resultado do seu exame. Como suspeitava, você está com infecção urinária. O exame mostra dois milhões de leucócitos, que são células de defesa, e o nitrito está positivo, o que indica presença de bactérias. É cistite então, doutor? Exatamente, cistite. É uma infecção na bexiga. A boa notícia é que é simples de tratar. Vou prescrever um antibiótico específico para infecção urinária. Qual antibiótico o senhor vai passar? Nitrofurantoína 100mg, você vai tomar um comprimido de seis em seis horas por cinco dias. É importante tomar direitinho, mesmo que os sintomas melhorem antes. Pode tomar com comida? Sim, inclusive é melhor tomar junto com as refeições para evitar enjoo. E beba bastante água, pelo menos dois litros por dia. Isso ajuda a limpar a bexiga. Mais alguma recomendação, doutor? Evite relações sexuais nos próximos dias até melhorar completamente. Evite segurar o xixi, vá ao banheiro sempre que tiver vontade. E evite café, refrigerante e bebidas alcoólicas por enquanto, pois podem irritar a bexiga. Em quanto tempo vou melhorar? Geralmente em 48 horas já há uma melhora significativa dos sintomas. Mas lembre-se, continue tomando o antibiótico até o final dos cinco dias. Se não melhorar em dois dias ou se aparecer febre, dor nas costas ou sangue na urina, retorne imediatamente. Entendi tudo, doutor. Muito obrigada. Por nada. Ah, mais uma coisa importante, depois que terminar o tratamento, é bom fazer um exame de urina de controle para confirmar que a infecção foi eliminada. Pode marcar para daqui a uma semana. Pode deixar que eu marco. Obrigada novamente. Melhoras, qualquer coisa é só retornar.`
  },
  {
    id: 3,
    title: 'Avaliação de Hipertensão Arterial',
    subtitle: '23/11/2025 • 09:00 • 21min • Pedro Alves',
    transcription: `<br><br><br>Boa tarde, entre por favor. Como posso ajudar hoje? Doutor, vim porque medi minha pressão na farmácia ontem e estava alta. Estava quanto? Marcou 160 por 100. Fiquei preocupado. Entendo sua preocupação. Essa foi a primeira vez que mediu ou já havia medido antes? Eu meço de vez em quando na farmácia, mas nunca tinha dado tão alto assim. Geralmente fica em quanto? Ah, nunca prestei muita atenção nos números, mas o farmacêutico nunca tinha falado nada. Ontem ele disse para eu procurar um médico. E você está sentindo alguma coisa? Dor de cabeça, tontura? Não, doutor, nada. Me sinto normal. Dor no peito, falta de ar, cansaço? Também não. Por isso até estranhei estar alta. Não sinto nada diferente. Você tem histórico de pressão alta na família? Meu pai tem pressão alta sim, toma remédio há anos. Minha mãe também desenvolveu depois dos sessenta anos. Quantos anos você tem? Tenho 45 anos. E seu peso está como? Engordei um pouco nos últimos anos. Devo estar uns dez quilos acima do ideal. Pratica alguma atividade física? Confesso que não, doutor. Trabalho sentado o dia todo e quando chego em casa estou cansado. Como está sua alimentação? Uso muito sal? Como muita comida de rua por causa do trabalho. E sim, gosto de comida bem temperada. Fuma ou bebe? Não fumo. Bebo socialmente nos fins de semana, uma cervejinha. Está usando alguma medicação? Não, nenhuma. Tem diabetes ou colesterol alto? Nunca fiz exames para saber, doutor. Faz tempo que não faço um check-up. Vamos verificar sua pressão agora então. Relaxe o braço, respire normalmente. Realmente está 160 por 100. Vou medir no outro braço também. Aqui deu 158 por 98, bem similar. Vou examinar seu coração e pulmões. Respire fundo. Agora solte. De novo. Isso. O exame físico está normal, mas sua pressão está realmente elevada. O que isso significa, doutor? Você está com hipertensão arterial, pressão alta. Como é a primeira vez que documentamos isso em consultório, vou pedir para você fazer um acompanhamento. Já vou precisar tomar remédio? Ainda não. Primeiro precisamos confirmar se sua pressão está sempre alta ou se foi um pico isolado. Como fazemos isso? Você vai medir sua pressão duas vezes por dia durante uma semana e anotar. Onde eu meço? Pode ser na farmácia mesmo? Pode ser na farmácia ou posto de saúde. O ideal é medir uma vez de manhã e outra à tarde ou noite. E anoto em um papel? Isso, faça uma tabelinha com data, horário e os valores. Semana que vem você retorna com essas anotações. E se realmente for pressão alta? Se confirmarmos, vou solicitar alguns exames de sangue e urina para avaliar se já há alguma repercussão nos órgãos e para verificar colesterol, glicemia, função dos rins. Dependendo dos resultados e dos valores de pressão, decidimos se inicia medicação. Preciso mudar alguma coisa já? Sim, independente disso, você precisa reduzir o sal drasticamente. Evite alimentos industrializados e embutidos. Tente caminhar pelo menos 30 minutos por dia. E perca peso, isso ajuda muito no controle da pressão. É difícil mudar tudo de uma vez. Comece aos poucos. Primeiro diminua o sal, depois vai introduzindo exercícios. Cada quilo perdido ajuda. E se eu sentir alguma coisa durante a semana? Se tiver dor de cabeça forte, dor no peito, falta de ar ou visão turva, procure o pronto-socorro imediatamente. Mas se continuar sem sintomas, faça as medições e retorne semana que vem. Pode ser no mesmo horário? Pode sim. Vou deixar agendado. Lembre-se, anote direitinho todas as medições. É importante para definirmos o tratamento. Pode deixar, doutor. Vou seguir tudo certinho. Mais alguma dúvida? Acho que não. Está tudo claro. Então até semana que vem. E já comece com a redução do sal hoje mesmo. Combinado, doutor. Obrigado. Por nada, até o retorno.`
  },
];

const templates: Template[] = [
    { id: 'anamnese', title: 'Anamnese' },
    { id: 'evolucao_clinica', title: 'Evolução Clínica' },
    { id: 'prescricao_simples', title: 'Prescrição Simples' },
    { id: 'prescricao_controle_especial', title: 'Prescrição de Controle Especial' },
    { id: 'exames_procedimentos', title: 'Exames e Procedimentos' },
    { id: 'encaminhamento', title: 'Encaminhamento' },
    { id: 'laudo_medico', title: 'Laudo Médico' },
    { id: 'atestado_medico', title: 'Atestado Médico' },
];

const Transcricao: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null);
  const [selectedHistory, setSelectedHistory] = useState<HistoryItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [displayedContent, setDisplayedContent] = useState('');
  const editableRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  useEffect(() => {
    if (selectedHistory) {
      setDisplayedContent(selectedHistory.transcription);
      setActiveTemplate(null);
      setIsEditing(false);
    } else {
      // Limpa o conteúdo quando nenhuma gravação é selecionada
      setDisplayedContent('');
    }
  }, [selectedHistory]);

  const handleTemplateClick = (template: Template) => {
    if (selectedHistory) {
      const formatter = templateContents[template.id]?.[selectedHistory.id];
      if (formatter) {
        setDisplayedContent(formatter(selectedHistory));
      } else {
        setDisplayedContent('Este template não está disponível para este histórico.');
      }
      setActiveTemplate(template);
      setIsEditing(false);
      setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
      }, 0);
    }
  };

  const handleNewRecordingClick = () => {
    setSelectedHistory(null);
  };

  const handleHistoryClick = (historyItem: HistoryItem) => {
    // Se o item clicado já é o selecionado E um template está ativo,
    // limpa o template para voltar ao "bruto".
    if (selectedHistory?.id === historyItem.id && activeTemplate) {
      setDisplayedContent(historyItem.transcription);
      setActiveTemplate(null);
      setIsEditing(false);
      setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
      }, 0);
    } else {
      // Comportamento padrão: seleciona o novo item.
      setSelectedHistory(historyItem);
      setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
      }, 0);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    // Aguarda o próximo tick para inicializar o conteúdo do contentEditable
    setTimeout(() => {
      (async () => {
        if (editableRef.current) {
          const html = marked(displayedContent);
          if (html instanceof Promise) {
            editableRef.current.innerHTML = await html;
          } else {
            editableRef.current.innerHTML = html;
          }
        }
      })();
    }, 0);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Salva o conteúdo editado do contentEditable
    if (editableRef.current) {
      setDisplayedContent(editableRef.current.innerHTML);
    }
  };

  const handleSendClick = () => {
    setIsExportModalOpen(true);
  };

  return (
    <>
      <div className="flex h-full bg-background">
        {/* Main Content */}
        <div className="flex-1 flex flex-col px-0 pt-1 relative max-w-6xl mx-auto">
          <div ref={scrollRef} className="flex-1 overflow-y-auto pb-48 pr-0 scrollbar-none">
            {isEditing ? (
              <>
                <div className="mx-36 mt-8 mb-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200 flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 20h9"/><path stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>
                    <span className="font-bold text-yellow-900 text-base">Edição habilitada</span>
                  </div>
                  <span className="text-sm text-yellow-800">Edite seu texto normalmente</span>
                </div>
                <div
                  ref={editableRef}
                  className="text-lg max-w-none text-foreground whitespace-pre-wrap mx-36 outline-none min-h-transcricao"
                  contentEditable
                  suppressContentEditableWarning
                  spellCheck={false}
                  dangerouslySetInnerHTML={{ __html: marked(displayedContent.replace(/^<br><br>/i, '').replace(/^<br><br>/i, '')) }}
                />
              </>
            ) : (
              <div
                className="text-lg max-w-none text-foreground whitespace-pre-wrap mx-36"
                dangerouslySetInnerHTML={{ 
                  __html: (typeof marked(displayedContent) === 'string' ? marked(displayedContent) : '')
                }}
              />
            )}
          </div>

          {/* Recording Component */}
          {!selectedHistory && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-full">
              <AIVoiceInput />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-96 h-full max-h-[calc(100vh-32px)] overflow-y-auto">
          <Suspense fallback={
            <div className="w-full h-full bg-slate-50 animate-pulse rounded-lg" />
          }>
            <TranscricaoSidebar
              templates={templates}
              selectedTemplate={activeTemplate?.id || null}
              onTemplateClick={handleTemplateClick}
              history={history}
              selectedHistory={selectedHistory?.id || null}
              onHistoryClick={handleHistoryClick}
              isEditing={isEditing}
              onEditClick={handleEditClick}
              onSaveClick={handleSaveClick}
              onSendClick={handleSendClick}
              isTemplateSelected={!!activeTemplate || !!selectedHistory}
              onNewRecordingClick={handleNewRecordingClick}
            />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={null}>
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          transcription={displayedContent.replace(/^<br><br>/i, '').replace(/^<br><br>/i, '')}
        />
      </Suspense>
    </>
  );
};

export default Transcricao;
