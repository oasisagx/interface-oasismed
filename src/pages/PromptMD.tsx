import React, { useState } from 'react';
import { usePrompts } from '../hooks/usePrompts';
import { 
  Loader2, 
  Search, 
  FileText, 
  Stethoscope, 
  Pill, 
  Brain, 
  Copy, 
  Play,
  Check
} from 'lucide-react';
import { cn } from '../lib/utils';

const PromptMD: React.FC = () => {
  const {
    categories,
    selectedCategory,
    selectedTemplate,
    isLoading,
    error,
    selectCategory,
    selectTemplate,
    useTemplate,
  } = usePrompts();

  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'stethoscope':
        return <Stethoscope className="w-4 h-4" />;
      case 'search':
        return <Search className="w-4 h-4" />;
      case 'pill':
        return <Pill className="w-4 h-4" />;
      case 'brain':
        return <Brain className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleCopy = async () => {
    if (selectedTemplate) {
      try {
        await navigator.clipboard.writeText(selectedTemplate.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        alert('Template copiado!');
      }
    }
  };

  const handleUse = () => {
    if (selectedTemplate) {
      useTemplate(selectedTemplate);
      // Simula navegação para o MedChat com o template
      setTimeout(() => {
        if (window.confirm('Template copiado! Deseja ir para o MedChat para usar?')) {
          window.location.href = '/';
        }
      }, 500);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.templates.some(template =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="w-5 h-5 animate-spin text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-600">Carregando templates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-red-600 text-sm">Erro ao carregar templates</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-200 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-oasis-blue focus:border-transparent outline-none bg-white"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredCategories.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => selectCategory(category.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-lg text-sm transition-colors",
                  selectedCategory === category.id 
                    ? "bg-slate-100 text-slate-900" 
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <div className="p-1.5 rounded-md bg-slate-100">
                  {getIcon(category.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{category.name}</p>
                  <p className="text-xs text-slate-500 truncate">{category.description}</p>
                </div>
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">
                  {category.templates.length}
                </span>
              </button>

              {/* Templates */}
              {selectedCategory === category.id && (
                <div className="ml-6 mt-1 space-y-1 animate-fade-in">
                  {category.templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => selectTemplate(template)}
                      className={cn(
                        "w-full flex items-center space-x-2 px-3 py-2 text-left rounded-md text-xs transition-colors",
                        selectedTemplate?.id === template.id 
                          ? "bg-oasis-blue/10 text-oasis-blue border border-oasis-blue/20" 
                          : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <FileText className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate font-medium">{template.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedTemplate ? (
          <>
            {/* Header */}
            <div className="border-b border-slate-100 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-xl font-semibold text-slate-900 mb-1">
                    {selectedTemplate.title}
                  </h1>
                  <p className="text-slate-600 text-sm mb-3">
                    {selectedTemplate.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    {selectedTemplate.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-md font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button 
                    onClick={handleCopy}
                    className="flex items-center space-x-1 px-3 py-1.5 text-xs text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                  <button 
                    onClick={handleUse}
                    className="flex items-center space-x-1 px-3 py-1.5 text-xs text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    <span>Usar Template</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-slate-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-slate-900">Template Médico</h3>
                    <div className="text-xs text-slate-500">
                      {selectedTemplate.content.split('\n').length} linhas • {selectedTemplate.content.length} caracteres
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-mono">
                    {selectedTemplate.content}
                  </pre>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <h2 className="text-lg font-medium text-slate-900 mb-2">
                Selecione um Template
              </h2>
              <p className="text-slate-600 text-sm">
                Escolha uma categoria para ver os templates médicos disponíveis
              </p>
              <div className="mt-4 text-sm text-slate-500">
                {categories.reduce((total, cat) => total + cat.templates.length, 0)} templates disponíveis
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptMD;