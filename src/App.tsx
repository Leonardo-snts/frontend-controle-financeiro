// src/App.tsx
import React from "react";
import UploadPDF from "./components/UploadPDF";
import AddPessoa from "./components/AddPessoa";
import AdicionarGasto from "./components/AdicionarGasto";
import AdicionarPessoa from "./components/AdicionarPessoa";
import GastoList from "./components/GastoList";
import PessoaList from "./components/PessoaList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-10">Gerenciador de Gastos</h1>
      <UploadPDF />
      <AddPessoa />
      <AdicionarGasto />
      <GastoList />
      <PessoaList />
    </div>
  );
};

export default App;
