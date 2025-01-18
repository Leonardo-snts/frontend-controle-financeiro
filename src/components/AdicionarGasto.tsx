import React, { useState, useEffect } from 'react';
import { fetchPessoas, addGasto } from '../services/api';

interface Pessoa {
  id: number;
  nome: string;
}

const AdicionarGasto: React.FC = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [parcela, setParcela] = useState('');
  const [data, setData] = useState('');
  const [pessoasSelecionadas, setPessoasSelecionadas] = useState<number[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPessoas();
        setPessoas(data);
      } catch (error) {
        console.error('Erro ao buscar pessoas:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const valorDividido = pessoasSelecionadas.length > 0 ? parseFloat(valor) / pessoasSelecionadas.length : parseFloat(valor);
      const gasto = {
        descricao,
        parcela,
        valor: valorDividido, 
        pessoa: pessoasSelecionadas,
        data,
      };
  
      await addGasto(gasto); 
      setDescricao('');
      setValor('');
      setParcela('');
      setData('');
      setPessoasSelecionadas([]);
      alert('Gasto adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar gasto:', error);
      alert('Erro ao adicionar gasto.');
    }
  };  

  const handleCheckboxChange = (id: number) => {
    if (pessoasSelecionadas.includes(id)) {
      setPessoasSelecionadas(pessoasSelecionadas.filter((pessoaId) => pessoaId !== id));
    } else {
      setPessoasSelecionadas([...pessoasSelecionadas, id]);
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
          type="text"
          value={parcela}
          onChange={(e) => setParcela(e.target.value)}
          placeholder="Parcela"
          className="block w-full p-2 border rounded"
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />
        <div className="block w-full p-2 boreder rounded">
          {pessoas.map((pessoa) => (
            <label key={pessoa.id} className="block">
              <input 
                type="checkbox"
                value={pessoa.id}
                checked={pessoasSelecionadas.includes(pessoa.id)}
                onChange={() => handleCheckboxChange(pessoa.id)}
                className="mr-2" 
              />
              {pessoa.nome}
            </label>
          ))}
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default AdicionarGasto;
