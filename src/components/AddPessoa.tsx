// src/components/AddPessoa.tsx
import React, { useState } from "react";
import { addPessoa } from "../services/api";

const AddPessoa: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!nome || !email) {
      setMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await addPessoa({ nome, email });
      setMessage("Pessoa adicionada com sucesso!");
      setNome("");
      setEmail("");
    } catch (error) {
      console.error(error);
      setMessage("Erro ao adicionar a pessoa.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded">
      <h2 className="text-xl font-bold text-center mb-4">Adicionar Pessoa</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
      />
      <input
        type="email"  
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
      >
        Adicionar Pessoa
      </button>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
};

export default AddPessoa;
