// src/components/TotalGastosPorPessoa.tsx
import React, { useEffect, useState } from "react";
import { fetchTotalGastos } from "../services/api";

interface Pessoa {
  id: number;
  nome: string;
  email: string;
  total_gastos: number;
}

const TotalGastosPessoa: React.FC = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalGastosData = async () => {
      try {
        setLoading(true);
        const data = await fetchTotalGastos();
        setPessoas(data);
      } catch (err) {
        console.error("Erro ao buscar dados de gastos:", err);
        setError("Não foi possível carregar os dados. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalGastosData();
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-center">Carregando...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Total de Gastos por Pessoa</h2>
      {pessoas.length > 0 ? (
        <ul className="space-y-4">
          {pessoas.map((pessoa) => (
            <li
              key={pessoa.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <p className="text-lg font-semibold text-gray-700">
                Nome: <span className="text-gray-900">{pessoa.nome}</span>
              </p>
              <p className="text-gray-600">
                Email: <span className="text-gray-800">{pessoa.email}</span>
              </p>
              <p className="text-gray-800 text-lg mt-2">
                <strong>Total de Gastos:</strong> R$ {pessoa.total_gastos.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">Nenhuma pessoa encontrada.</p>
      )}
    </div>
  );
};

export default TotalGastosPessoa;
