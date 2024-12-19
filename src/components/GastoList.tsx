import React, { useState, useEffect } from "react";
import axios from "axios";

const GastoList: React.FC = () => {
  const [gastos, setGastos] = useState([]);
  const [pessoas, setPessoas] = useState([]);
  const [editingGasto, setEditingGasto] = useState<any | null>(null);
  const [updatedDescricao, setUpdatedDescricao] = useState("");
  const [updatedValor, setUpdatedValor] = useState(0);
  const [updateParcela, setUpdateParcela] = useState(0);
  const [updatedData, setUpdatedData] = useState("");
  const [updatedPessoa, setUpdatedPessoa] = useState("");

  useEffect(() => {
    fetchGastos();
    fetchPessoas();
  }, []);

  const fetchGastos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/gastos/");
      setGastos(response.data);
    } catch (error) {
      console.error("Erro ao buscar gastos:", error);
    }
  };

  const fetchPessoas = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/pessoas/");
      setPessoas(response.data);
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
    }
  };

  const handleEdit = (gasto: any) => {
    setEditingGasto(gasto);
    setUpdatedDescricao(gasto.descricao);
    setUpdatedValor(gasto.valor);
    setUpdateParcela(gasto.parcela);
    setUpdatedData(gasto.data);
    setUpdatedPessoa(gasto.pessoa);
  };

  const handleUpdate = async () => {
    if (!editingGasto) return;

    try {
      await axios.put(`http://localhost:8000/api/gastos/${editingGasto.id}/`, {
        descricao: updatedDescricao,
        valor: updatedValor,
        parcela: updateParcela,
        data: updatedData,
        pessoa: updatedPessoa,
      });
      setEditingGasto(null);
      fetchGastos();
    } catch (error) {
      console.error("Erro ao atualizar gasto:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/gastos/${id}/`);
      setGastos(gastos.filter((gasto: any) => gasto.id !== id));
    } catch (error) {
      console.error("Erro ao excluir gasto:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Gastos</h2>
      <ul className="space-y-2">
        {gastos.map((gasto: any) => (
          <li
            key={gasto.id}
            className="p-4 border rounded shadow flex flex-col space-y-2"
          >
            {editingGasto && editingGasto.id === gasto.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={updatedDescricao}
                  onChange={(e) => setUpdatedDescricao(e.target.value)}
                  className="p-2 border rounded w-full"
                />
                <input
                  type="number"
                  value={updatedValor}
                  onChange={(e) => setUpdatedValor(Number(e.target.value))}
                  className="p-2 border rounded w-full"
                />
                <input
                  type="number"
                  value={updateParcela}
                  onChange={(e) => setUpdateParcela(Number(e.target.value))}
                  className="p-2 border rounded w-full"
                />
                <input
                  type="date"
                  value={updatedData}
                  onChange={(e) => setUpdatedData(e.target.value)}
                  className="p-2 border rounded w-full"
                />
                <select
                  value={updatedPessoa}
                  onChange={(e) => setUpdatedPessoa(e.target.value)}
                  className="p-2 border rounded w-full"
                >
                  <option value="">Selecione uma pessoa</option>
                  {pessoas.map((pessoa: any) => (
                    <option key={pessoa.id} value={pessoa.id}>
                      {pessoa.nome}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setEditingGasto(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold">{gasto.descricao}</h3>
                <p className="text-sm text-gray-600">Valor: R$ {gasto.valor}</p>
                <p className="text-sm text-gray-600">
                  Parcela: {gasto.parcela || "N/A"}
                </p>
                <p className="text-sm text-gray-600">Data: {gasto.data}</p>
                <p className="text-sm text-gray-600">
                  Pessoa: {gasto.pessoa || "N/A"}
                </p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleEdit(gasto)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(gasto.id)}
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

export default GastoList;
