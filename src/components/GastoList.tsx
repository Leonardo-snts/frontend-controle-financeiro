import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GastoList: React.FC = () => {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/gastos/')
      .then(response => setGastos(response.data))
      .catch(error => console.error('Erro ao buscar gastos:', error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Gastos</h2>
      <ul className="space-y-2">
        {gastos.map((gasto: any) => (
          <li key={gasto.id} className="p-4 border rounded shadow">
            <h3 className="font-semibold">{gasto.descricao}</h3>
            <p className="text-sm text-gray-600">Valor: R$ {gasto.valor}</p>
            <p className="text-sm text-gray-600">Parcela: {gasto.parcela || 'N/A'}</p>
            <p className="text-sm text-gray-600">Data: {gasto.data}</p>
            <p className="text-sm text-gray-600">Pessoa: {gasto.pessoa || 'N/A'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GastoList;
