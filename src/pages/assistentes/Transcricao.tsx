import React, { useState } from 'react';
import TranscricaoSidebar from '../../components/assistentes/TranscricaoSidebar';
import { Mic, Square } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

const Transcricao: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');

  return (
    <div className="flex h-full bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Transcription Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {transcription ? (
            <p className="text-foreground whitespace-pre-wrap">{transcription}</p>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex items-center justify-center w-24 h-24 bg-secondary rounded-full border-2 border-border">
                <Mic className="w-10 h-10 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* Recording Button */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Button
            variant="outline"
            size="lg"
            className={cn(
              'relative rounded-full w-14 h-14 border-2 transition-all duration-300',
              isRecording
                ? 'border-destructive text-destructive'
                : 'border-border text-muted-foreground hover:bg-secondary'
            )}
            onClick={() => setIsRecording(!isRecording)}
          >
            {isRecording && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-full h-full rounded-full bg-destructive/20 animate-pulse-ring"></span>
              </span>
            )}
            {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-6 h-6" />}
          </Button>
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
