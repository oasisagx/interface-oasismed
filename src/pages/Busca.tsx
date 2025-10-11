import React from 'react';
import BuscaInput from '../components/BuscaInput';

const Busca: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Buscando por:', query);
    // A lógica de busca será implementada aqui futuramente
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-white">
      <div className="w-full px-6">
        <BuscaInput onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default Busca;
