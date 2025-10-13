"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Plus,
  ArrowUp,
  X,
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
  Mic,
} from "lucide-react";
import { Button } from "./button";
import { cn } from "../../lib/utils";

// Types
export interface FileWithPreview {
  id: string;
  file: File;
  preview?: string;
  type: string;
  uploadStatus: "pending" | "uploading" | "complete" | "error";
  uploadProgress?: number;
  abortController?: AbortController;
  textContent?: string;
}

export interface PastedContent {
  id: string;
  content: string;
  timestamp: Date;
  wordCount: number;
}

interface ChatInputProps {
  onSendMessage?: (
    message: string,
    files: FileWithPreview[],
    pastedContent: PastedContent[]
  ) => void;
  disabled?: boolean;
  placeholder?: string;
  maxFiles?: number;
  maxFileSize?: number;
}

// Constants
const MAX_FILES = 10;
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

// File type helpers
const getFileIcon = (type: string) => {
  if (type.startsWith("image/"))
    return <ImageIcon className="h-4 w-4 text-slate-400" />;
  if (type.startsWith("video/"))
    return <Video className="h-4 w-4 text-slate-400" />;
  if (type.startsWith("audio/"))
    return <Music className="h-4 w-4 text-slate-400" />;
  if (type.includes("zip") || type.includes("rar") || type.includes("tar"))
    return <Archive className="h-4 w-4 text-slate-400" />;
  return <FileText className="h-4 w-4 text-slate-400" />;
};

// File Preview Component
const FilePreviewCard: React.FC<{
  file: FileWithPreview;
  onRemove: (id: string) => void;
}> = ({ file, onRemove }) => {
  const isImage = file.type.startsWith("image/");

  return (
    <div className="relative group bg-slate-50 border border-slate-200 rounded-lg p-3 w-20 h-16 shadow-sm flex-shrink-0 overflow-hidden hover:border-slate-300 transition-colors">
      <div className="flex flex-col items-center justify-center h-full">
        {isImage && file.preview ? (
          <img
            src={file.preview}
            alt={file.file.name}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <>
            <div className="mb-1">
              {getFileIcon(file.type)}
            </div>
            <span className="text-xs text-slate-600 truncate w-full text-center">
              {file.file.name.split('.').pop()?.toUpperCase()}
            </span>
          </>
        )}
      </div>
      
      <Button
        size="icon"
        variant="ghost"
        className="absolute -top-1 -right-1 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 bg-white border border-slate-200 shadow-sm hover:bg-slate-50"
        onClick={() => onRemove(file.id)}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
};

// Main ChatInput Component
const ClaudeChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Como posso ajudar?",
  maxFiles = MAX_FILES,
  maxFileSize = MAX_FILE_SIZE,
}) => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const maxHeight = 120;
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        maxHeight
      )}px`;
    }
  }, [message]);

  const handleFileSelect = useCallback(
    (selectedFiles: FileList | null) => {
      if (!selectedFiles) return;

      const filesToAdd = Array.from(selectedFiles).slice(0, maxFiles - files.length);

      const newFiles = filesToAdd
        .filter((file) => {
          if (file.size > maxFileSize) {
            alert(`Arquivo ${file.name} muito grande.`);
            return false;
          }
          return true;
        })
        .map((file) => ({
          id: Math.random().toString(),
          file,
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
          type: file.type || "application/octet-stream",
          uploadStatus: "complete" as const,
          uploadProgress: 100,
        }));

      setFiles((prev) => [...prev, ...newFiles]);
    },
    [files.length, maxFiles, maxFileSize]
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files) {
        handleFileSelect(e.dataTransfer.files);
      }
    },
    [handleFileSelect]
  );

  const handleSend = useCallback(() => {
    if (disabled || (!message.trim() && files.length === 0)) return;

    onSendMessage?.(message, files, []);

    setMessage("");
    files.forEach((file) => {
      if (file.preview) URL.revokeObjectURL(file.preview);
    });
    setFiles([]);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }, [message, files, disabled, onSendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleVoiceToggle = useCallback(() => {
    setIsRecording(!isRecording);
    // Aqui seria implementada a funcionalidade de gravação de voz
    if (!isRecording) {
      console.log("Iniciando gravação...");
    } else {
      console.log("Parando gravação...");
    }
  }, [isRecording]);

  const hasContent = message.trim() || files.length > 0;
  const canSend = hasContent && !disabled;

  return (
    <div
      className="relative w-full max-w-3xl mx-auto"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 z-50 bg-blue-50 border-2 border-dashed border-blue-300 rounded-2xl flex flex-col items-center justify-center pointer-events-none">
          <p className="text-sm text-blue-600 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Solte os arquivos aqui
          </p>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm min-h-[56px] flex flex-col overflow-hidden">
        {/* Files Preview */}
        {files.length > 0 && (
          <div className="border-b border-slate-100 p-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-thin">
              {files.map((file) => (
                <FilePreviewCard
                  key={file.id}
                  file={file}
                  onRemove={removeFile}
                />
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex items-end">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 min-h-[56px] max-h-[120px] p-4 pr-2 resize-none border-0 bg-transparent text-slate-900 placeholder:text-slate-450 text-sm focus-visible:outline-none focus:ring-0"
            rows={1}
          />
          
          <div className="flex items-center gap-1 p-2 -translate-y-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 p-0 text-oasis-blue hover:text-oasis-blue-600 hover:bg-oasis-blue-50"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || files.length >= maxFiles}
            >
              <Plus className="h-4 w-4" />
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "h-8 w-8 p-0 transition-colors",
                isRecording 
                  ? "text-white bg-oasis-blue border-oasis-blue animate-pulse hover:bg-oasis-blue-600" 
                  : "text-oasis-blue hover:text-oasis-blue-600 hover:bg-oasis-blue-50"
              )}
              onClick={handleVoiceToggle}
              disabled={disabled}
            >
              <Mic className="h-4 w-4" />
            </Button>
            
            <Button
              size="icon"
              className={cn(
                "h-8 w-8 p-0 rounded-lg transition-colors ml-1",
                canSend
                  ? "bg-oasis-blue hover:bg-oasis-blue-600 text-white"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              )}
              onClick={handleSend}
              disabled={!canSend}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        aria-label="Upload files"
        onChange={(e) => {
          handleFileSelect(e.target.files);
          if (e.target) e.target.value = "";
        }}
      />
    </div>
  );
};

export default ClaudeChatInput;
