import React, { useState, useCallback, useMemo } from 'react';
import { Upload, FileText, Search, MoreVertical, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Switch } from '../components/ui/Switch';
import { DocumentData } from '../types';

// Constantes
const INITIAL_DOCUMENTS = [
  { id: 1, name: 'Manejo Clínico de Arboviroses: Dengue e Oropouche', size: '2.4 MB', type: 'PDF', date: 'Hoje', category: 'Protocolo', status: 'ativo', uploadStatus: 'complete' },
  { id: 2, name: 'Diretriz Brasileira de Hipertensão Arterial (2025)', size: '1.8 MB', type: 'DOCX', date: 'Ontem', category: 'Diretriz', status: 'ativo', uploadStatus: 'complete' },
  { id: 3, name: 'PCDT - Diabetes Mellitus Tipo 2', size: '890 KB', type: 'XLSX', date: '3 dias', category: 'Referência', status: 'ativo', uploadStatus: 'complete' }
];

const INITIAL_INTEGRATIONS = [
  { id: 'mv-clinic', name: 'MV Clinic', logo: '/assets/integrations/mv-clinic.svg', enabled: false },
  { id: 'tasy', name: 'Tasy', logo: '/assets/integrations/tasy.svg', enabled: false },
  { id: 'app-health', name: 'App Health', logo: '/assets/integrations/app-health.svg', enabled: false },
  { id: 'google-sheets', name: 'Google Sheets', logo: '/assets/integrations/google-sheets.svg', enabled: false },
  { id: 'microsoft-excel', name: 'Microsoft Excel', logo: '/assets/integrations/microsoft-excel.svg', enabled: false },
];

// Componentes auxiliares
const StatusIcon = ({ uploadStatus }: { uploadStatus: string }) => {
  const icons = {
    uploading: <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />,
    complete: <CheckCircle className="w-4 h-4 text-green-600" />,
    error: <AlertCircle className="w-4 h-4 text-red-600" />,
    default: <FileText className="w-4 h-4 text-slate-500" />
  };
  return icons[uploadStatus as keyof typeof icons] || icons.default;
};

const DocumentItem = ({ doc, onDelete }: { doc: DocumentData, onDelete?: (id: number) => void }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors group relative">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
          <StatusIcon uploadStatus={doc.uploadStatus} />
        </div>
        <div>
          <h4 className="font-medium text-slate-900">{doc.name}</h4>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-end text-sm text-slate-500 font-mono w-48">
          <span className="w-20 text-right">{doc.size}</span>
          <span className="w-8 text-center">•</span>
          <div className="flex items-center space-x-1 flex-grow">
            <Clock className="w-3 h-3" />
            <span>{doc.date}</span>
          </div>
        </div>
        <button
          className="p-2 hover:bg-slate-100 rounded-lg opacity-100 transition-opacity relative"
          aria-label="Mais opções do documento"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MoreVertical className="w-4 h-4 text-slate-500" />
        </button>
        {menuOpen && (
          <div ref={menuRef} className="absolute right-0 top-12 z-10 bg-white border border-slate-200 rounded-lg shadow-lg py-2 w-32 flex flex-col">
            <button
              className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 text-left"
              onClick={() => { setMenuOpen(false); alert(`Visualizar: ${doc.name}`); }}
            >
              Visualizar
            </button>
            <button
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
              onClick={() => { setMenuOpen(false); onDelete && onDelete(doc.id); }}
            >
              Deletar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const IntegrationModule = ({ logo, alt, className, children, containerClassName = "" }: {
  logo: string;
  alt: string;
  className: string;
  children: React.ReactNode;
  containerClassName?: string;
}) => (
  <div className={`flex items-center space-x-3 ${containerClassName}`}>
    <img src={logo} alt={alt} className={className} />
    {children}
  </div>
);

const Conhecimento: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS);

  const handleIntegrationToggle = useCallback((id: string, enabled: boolean) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id ? { ...integration, enabled } : integration
    ));
  }, []);

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }, []);

  const showSuccessNotification = useCallback((fileName: string) => {
    const notification = document.createElement('div');
    notification.innerHTML = `✅ ${fileName} processado com sucesso!`;
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }, []);

  const handleFileUpload = useCallback((files: File[]) => {
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

      setTimeout(() => {
        setDocuments(prev => prev.map(doc => 
          doc.id === newDoc.id ? { ...doc, status: 'ativo', uploadStatus: 'complete' } : doc
        ));
        showSuccessNotification(file.name);
      }, 2000 + Math.random() * 3000);
    });
  }, [formatFileSize, showSuccessNotification]);

  const dragHandlers = useMemo(() => ({
    onDragOver: (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); },
    onDragLeave: (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileUpload(Array.from(e.dataTransfer.files));
    }
  }), [handleFileUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(Array.from(e.target.files));
      e.target.value = '';
    }
  }, [handleFileUpload]);

  const integrationData = useMemo(() => ({
    'mv-clinic': { enabled: integrations.find(i => i.id === 'mv-clinic')?.enabled },
    'google-sheets': { enabled: integrations.find(i => i.id === 'google-sheets')?.enabled },
    'tasy': { enabled: integrations.find(i => i.id === 'tasy')?.enabled },
    'microsoft-excel': { enabled: integrations.find(i => i.id === 'microsoft-excel')?.enabled },
    'app-health': { enabled: integrations.find(i => i.id === 'app-health')?.enabled }
  }), [integrations]);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 p-6">
        {/* Upload Area */}
        <div
          className={`mb-6 border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
            isDragging ? 'border-oasis-blue bg-blue-50' : 'border-slate-300 hover:border-slate-400'
          }`}
          {...dragHandlers}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-medium text-slate-900 mb-1">Enviar documentos</h3>
          <p className="text-sm text-slate-600 mb-3">Arraste os arquivos ou clique para buscar</p>
        </div>

        {/* Documents List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-slate-900">Documentos</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar em documentos ..."
                  className="w-72 pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-0 focus:border-slate-200 focus:shadow-none"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            {documents.map((doc) => (
              <DocumentItem
                key={doc.id}
                doc={doc}
                onDelete={(id) => setDocuments(prev => prev.filter(d => d.id !== id))}
              />
            ))}
          </div>

          {documents.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Nenhum documento ainda</h3>
              <p className="text-slate-600 text-sm">Comece enviando protocolos e diretrizes da clínica</p>
            </div>
          )}
        </div>

        {/* Integrations Section */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Integrações</h3>
          <div className="space-y-8">
            {/* Primeira linha: MV Clinic e Google Sheets */}
            <div className="flex items-center space-x-36">
              <IntegrationModule
                logo="/assets/integrations/mv-clinic.svg"
                alt="MV Clinic"
                className="object-contain w-16 h-16 ml-4"
                containerClassName="ml-1"
              >
                <div className="flex items-center space-x-6">
                  <span className="text-sm font-medium text-slate-800 ml-1">MV Clinic</span>
                  <div className="pl-4">
                    <Switch
                      checked={integrationData['mv-clinic'].enabled}
                      onCheckedChange={(enabled) => handleIntegrationToggle('mv-clinic', enabled)}
                    />
                  </div>
                </div>
              </IntegrationModule>
              
              <IntegrationModule
                logo="/assets/integrations/google-sheets.svg"
                alt="Google Sheets"
                className="object-contain w-20 h-20"
              >
                <div className="flex items-center space-x-6">
                  <span className="text-sm font-medium text-slate-800 -ml-2">Google Sheets</span>
                  <Switch
                    checked={integrationData['google-sheets'].enabled}
                    onCheckedChange={(enabled) => handleIntegrationToggle('google-sheets', enabled)}
                    className="-ml-0"
                  />
                </div>
              </IntegrationModule>
            </div>

            {/* Segunda linha: Tasy e Microsoft Excel */}
            <div className="flex items-center space-x-36">
              <IntegrationModule
                logo="/assets/integrations/tasy.svg"
                alt="Tasy"
                className="object-contain w-16 h-16 ml-3"
              >
                <div className="flex items-center space-x-6">
                  <span className="text-sm font-medium text-slate-800 ml-3">Philips Tasy</span>
                  <Switch
                    checked={integrationData['tasy'].enabled}
                    onCheckedChange={(enabled) => handleIntegrationToggle('tasy', enabled)}
                    className="ml-1"
                  />
                </div>
              </IntegrationModule>
              
              <IntegrationModule
                logo="/assets/integrations/microsoft-excel.svg"
                alt="Microsoft Excel"
                className="object-contain w-16 h-16 ml-1"
                containerClassName="space-x-4"
              >
                <div className="flex items-center space-x-5">
                  <span className="text-sm font-medium text-slate-800">Microsoft Excel</span>
                  <Switch
                    checked={integrationData['microsoft-excel'].enabled}
                    onCheckedChange={(enabled) => handleIntegrationToggle('microsoft-excel', enabled)}
                  />
                </div>
              </IntegrationModule>
            </div>

            {/* Terceira linha: App Health centralizado */}
          </div>
        </div>
      </div>

      <input
        id="file-input"
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
        onChange={handleFileInput}
        className="hidden"
        aria-label="Selecionar arquivos para upload"
      />
    </div>
  );
};

export default Conhecimento;