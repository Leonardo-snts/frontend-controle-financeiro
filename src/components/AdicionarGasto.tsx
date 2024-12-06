import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdicionarGasto: React.FC = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [pessoa, setPessoa] = useState('');
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    axios.get('/api/pessoas/')
      .then(response => setPessoas(response.data))
      .catch(error => console.error('Erro ao buscar pessoas:', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/gastos/', { descricao, valor, data, pessoa });
      setDescricao('');
      setValor('');
      setData('');
      setPessoa('');
      alert('Gasto adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar gasto:', error);
      alert('Erro ao adicionar gasto.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Adicionar Gasto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Valor"
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />
        <select
          value={pessoa}
          onChange={(e) => setPessoa(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        >
          <option value="">Selecione uma pessoa</option>
          {pessoas.map((pessoa: any) => (
            <option key={pessoa.id} value={pessoa.id}>
              {pessoa.nome}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default AdicionarGasto;
