import React, { useState } from 'react';
import axios from 'axios';

const AdicionarPessoa: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/pessoas/', { nome, email });
      setNome('');
      setEmail('');
      alert('Pessoa adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar pessoa:', error);
      alert('Erro ao adicionar pessoa.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Adicionar Pessoa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="block w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default AdicionarPessoa;
