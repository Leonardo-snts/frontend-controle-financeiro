import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PessoaList: React.FC = () => {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/pessoas/')
      .then(response => setPessoas(response.data))
      .catch(error => console.error('Erro ao buscar pessoas:', error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Pessoas</h2>
      <ul className="space-y-2">
        {pessoas.map((pessoa: any) => (
          <li key={pessoa.id} className="p-4 border rounded shadow">
            <h3 className="font-semibold">{pessoa.nome}</h3>
            <p className="text-sm text-gray-600">{pessoa.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PessoaList;
