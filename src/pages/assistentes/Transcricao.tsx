import React, { useState } from 'react';
import TranscricaoSidebar from '../../components/assistentes/TranscricaoSidebar';
import { AIVoiceInput } from '../../components/ui/AIVoiceInput';

const Transcricao: React.FC = () => {
  const [transcription, setTranscription] = useState('');

  return (
    <div className="flex h-full bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Transcription Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {transcription ? (
            <p className="text-foreground whitespace-pre-wrap">{transcription}</p>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              {/* Empty state is intentionally minimal. The recording button is the main call to action. */}
            </div>
          )}
        </div>

        {/* Recording Component */}
        <div className="pb-4">
          <AIVoiceInput />
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-96 h-full">
        <TranscricaoSidebar />
      </div>
    </div>
  );
};

export default Transcricao;
