// src/App.tsx
import React from "react";
import UploadPDF from "./components/UploadPDF";
import AddPessoa from "./components/AddPessoa";
import AdicionarGasto from "./components/AdicionarGasto";
import GastoList from "./components/GastoList";
import PessoaList from "./components/PessoaList";
import TotalGastosPessoa from "./components/TotalGastoPessoa";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-10 tracking-tight">
          Gerenciador de Gastos
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <UploadPDF />
          <AddPessoa />
          <AdicionarGasto />
          <TotalGastosPessoa />
          <GastoList />
          <PessoaList />
        </div>
      </div>
    </div>
  );
};

export default App;
