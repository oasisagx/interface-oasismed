import React, { useState, useCallback } from 'react';
import { Upload, FileText, Search, MoreVertical, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const Conhecimento: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [documents, setDocuments] = useState([
    { 
      id: 1, 
      name: 'Manejo Clínico de Arboviroses: Dengue e Oropouche', 
      size: '2.4 MB', 
      type: 'PDF', 
      date: 'Hoje',
      category: 'Protocolo',
      status: 'ativo',
      uploadStatus: 'complete'
    },
    { 
      id: 2, 
      name: 'Diretriz Brasileira de Hipertensão Arterial (2025)', 
      size: '1.8 MB', 
      type: 'DOCX', 
      date: 'Ontem',
      category: 'Diretriz',
      status: 'ativo',
      uploadStatus: 'complete'
    },
    { 
      id: 3, 
      name: 'PCDT - Diabetes Mellitus Tipo 2', 
      size: '890 KB', 
      type: 'XLSX', 
      date: '3 dias',
      category: 'Referência',
      status: 'ativo',
      uploadStatus: 'complete'
    }
  ]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  }, []);

  const handleFileUpload = (files: File[]) => {
    files.forEach((file, index) => {
      const newDoc = {
        id: Date.now() + index,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        date: 'Agora',
        category: 'Novo',
        status: 'processando',
        uploadStatus: 'uploading'
      };

      setDocuments(prev => [newDoc, ...prev]);

      // Simula processo de upload
      setTimeout(() => {
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === newDoc.id 
              ? { ...doc, status: 'ativo', uploadStatus: 'complete' }
              : doc
          )
        );
        
        // Feedback visual de sucesso
        const notification = document.createElement('div');
        notification.innerHTML = `✅ ${file.name} processado com sucesso!`;
        notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.remove();
        }, 3000);
      }, 2000 + Math.random() * 3000);
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getStatusIcon = (uploadStatus: string) => {
    switch (uploadStatus) {
      case 'uploading':
        return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(Array.from(e.target.files));
      e.target.value = ''; // Reset input
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 p-6">
        {/* Upload Area - Funcional */}
        <div
          className={`mb-6 border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
            isDragging 
              ? 'border-oasis-blue bg-blue-50' 
              : 'border-slate-300 hover:border-slate-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-medium text-slate-900 mb-1">
            Enviar documentos
          </h3>
          <p className="text-sm text-slate-600 mb-3">
            Arraste os arquivos ou clique para buscar
          </p>
        </div>

        {/* Documents List - Com uploads simulados */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-slate-900">Documentos</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar em documentos ..."
                  className="w-72 pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-oasis-blue focus:border-transparent outline-none shadow-sm"
                />
              </div>
            </div>
            <span className="text-sm text-slate-500">{documents.length} documentos</span>
          </div>
          
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-oasis-blue/10 rounded-lg flex items-center justify-center">
                    {getStatusIcon(doc.uploadStatus)}
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">{doc.name}</h4>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-end text-sm text-slate-500 font-mono w-48">
                    {/* Coluna Esquerda */}
                    <span className="w-20 text-right">{doc.size}</span>
                    
                    {/* Coluna Central */}
                    <span className="w-8 text-center">•</span>
                    
                    {/* Coluna Direita */}
                    <div className="flex items-center space-x-1 flex-grow">
                      <Clock className="w-3 h-3" />
                      <span>{doc.date}</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {documents.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Nenhum documento ainda</h3>
              <p className="text-slate-600 text-sm">
                Comece enviando protocolos e diretrizes da clínica
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        id="file-input"
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
};

export default Conhecimento;
