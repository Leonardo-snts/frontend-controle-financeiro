import React, { useState, useEffect } from 'react';
import { fetchPessoas, updatePessoa, deletePessoa } from '../services/api';

interface Pessoa {
  id: number;
  nome: string;
  email: string;
}

const PessoaList: React.FC = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [editingPessoa, setEditingPessoa] = useState<Pessoa | null>(null);
  const [updatedNome, setUpdatedNome] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');

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

  const handleEdit = (pessoa: Pessoa) => {
    setEditingPessoa(pessoa);
    setUpdatedNome(pessoa.nome);
    setUpdatedEmail(pessoa.email);
  };

  const handleUpdate = async () => {
    if (!editingPessoa) return;
    try {
      await updatePessoa(editingPessoa.id, { nome: updatedNome, email: updatedEmail });
      setPessoas((prevPessoas) =>
        prevPessoas.map((p) => (p.id === editingPessoa.id ? { ...p, nome: updatedNome, email: updatedEmail } : p))
      );
      setEditingPessoa(null);
    } catch (error) {
      console.error('Erro ao atualizar pessoa:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePessoa(id);
      setPessoas((prevPessoas) => prevPessoas.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Erro ao excluir pessoa:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Pessoas</h2>
      <ul className="space-y-2">
        {pessoas.map((pessoa) => (
          <li key={pessoa.id} className="p-4 border rounded shadow">
            {editingPessoa && editingPessoa.id === pessoa.id ? (
              <div>
                <input
                  type="text"
                  value={updatedNome}
                  onChange={(e) => setUpdatedNome(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setEditingPessoa(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold">{pessoa.nome}</h3>
                <p className="text-sm text-gray-600">{pessoa.email}</p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleEdit(pessoa)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(pessoa.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PessoaList;
