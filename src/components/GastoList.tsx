import React, { useState, useEffect } from "react";
import { fetchGastos, fetchPessoas, updateGasto, deleteGasto } from "../services/api";

const GastoList: React.FC = () => {
  const [gastos, setGastos] = useState<any[]>([]);
  const [pessoas, setPessoas] = useState<any[]>([]);
  const [editingGasto, setEditingGasto] = useState<any | null>(null);
  const [updatedDescricao, setUpdatedDescricao] = useState("");
  const [updatedValor, setUpdatedValor] = useState(0);
  const [updateParcela, setUpdateParcela] = useState(0);
  const [updatedData, setUpdatedData] = useState("");
  const [updatedPessoa, setUpdatedPessoa] = useState<number | null>(null);
  const [selectedPeople, setSelectedPeople] = useState<number[]>([]);
  const [showDivideModal, setShowDivideModal] = useState(false);
  const [currentDividingGasto, setCurrentDividingGasto] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gastosData = await fetchGastos();
        const pessoasData = await fetchPessoas();
        setGastos(gastosData);
        setPessoas(pessoasData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenDivideModal = (gasto: any) => {
    if (gasto.is_divided) {
      alert("Este gasto já foi dividido e não pode ser dividido novamente.");
      return;
    }
    setCurrentDividingGasto(gasto);
    setSelectedPeople([]);
    setShowDivideModal(true);
  };

  const togglePersonSelection = (pessoaId: number) => {
    setSelectedPeople(prev =>
      prev.includes(pessoaId)
        ? prev.filter(id => id !== pessoaId)
        : [...prev, pessoaId]
    );
  };

  const handleDivideGasto = async () => {
    try {
      if (!currentDividingGasto || selectedPeople.length === 0) {
        alert("Selecione pelo menos uma pessoa para dividir o gasto.");
        return;
      }
  
      // Verificar novamente se o gasto já está dividido
      if (currentDividingGasto.is_divided) {
        alert("Este gasto já foi dividido anteriormente.");
        setShowDivideModal(false);
        return;
      }
  
      const valorPorPessoa = parseFloat(
        (currentDividingGasto.valor / selectedPeople.length).toFixed(2)
      );
  
      const updatePromises = selectedPeople.map((pessoaId) => {
        return updateGasto(currentDividingGasto.id, {
          descricao: `${currentDividingGasto.descricao} (Dividido)`,
          valor: valorPorPessoa,
          parcela: currentDividingGasto.parcela,
          data: currentDividingGasto.data,
          pessoa: [pessoaId],
          valor_original: currentDividingGasto.valor,
          is_divided: true,
        });
      });
  
      await Promise.all(updatePromises);
  
      // Atualizar o gasto atual para is_divided: true
      const updatedGastos = await fetchGastos();
      setGastos(updatedGastos);
  
      alert("Gasto dividido com sucesso!");
      setShowDivideModal(false);
    } catch (error) {
      console.error("Erro ao dividir gasto:", error);
      alert("Erro ao dividir o gasto. Verifique os dados e tente novamente.");
    }
  };  

  const getPessoaNomes = (pessoaIds: number[]) => {
    return pessoaIds.map(id => {
      const pessoa = pessoas.find(p => p.id === id);
      return pessoa ? pessoa.nome : "N/A";
    }).join(', ');
  };

  const DivideModal = () => {
    if (!showDivideModal || !currentDividingGasto) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 className="text-xl font-bold mb-4">Dividir Gasto</h3>
          <p className="mb-2">Descrição: {currentDividingGasto.descricao}</p>
          <p className="mb-4">Valor Total: R$ {currentDividingGasto.valor}</p>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Selecione as pessoas:</h4>
            <div className="max-h-48 overflow-y-auto">
              {pessoas.map((pessoa: any) => (
                <label key={pessoa.id} className="flex items-center space-x-2 p-2 hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={selectedPeople.includes(pessoa.id)}
                    onChange={() => togglePersonSelection(pessoa.id)}
                    className="rounded"
                  />
                  <span>{pessoa.nome}</span>
                </label>
              ))}
            </div>
          </div>

          {selectedPeople.length > 0 && (
            <p className="text-green-600 mb-4">
              Valor por pessoa: R$ {(currentDividingGasto.valor / selectedPeople.length).toFixed(2)}
            </p>
          )}

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowDivideModal(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={handleDivideGasto}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              disabled={selectedPeople.length === 0}
            >
              Confirmar Divisão
            </button>
          </div>
        </div>
      </div>
    );
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
      await updateGasto(editingGasto.id, {
        descricao: updatedDescricao,
        valor: updatedValor,
        parcela: updateParcela,
        data: updatedData,
        pessoa: updatedPessoa
      });
      setEditingGasto(null);
      const updatedGastos = await fetchGastos();
      setGastos(updatedGastos);
    } catch (error) {
      console.error("Erro ao atualizar gasto:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteGasto(id);
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
                <h3 className="text-lg font-semibold">Editar Descrição:</h3>
                <input
                  type="text"
                  value={updatedDescricao}
                  onChange={(e) => setUpdatedDescricao(e.target.value)}
                  className="p-2 border rounded w-full"
                />
                <h3 className="text-lg font-semibold">Editar Valor:</h3>
                <input
                  type="number"
                  value={updatedValor}
                  onChange={(e) => setUpdatedValor(Number(e.target.value))}
                  className="p-2 border rounded w-full"
                />
                <h3 className="text-lg font-semibold">Editar Parcela:</h3>
                <input
                  type="number"
                  value={updateParcela}
                  onChange={(e) => setUpdateParcela(Number(e.target.value))}
                  className="p-2 border rounded w-full"
                />
                <h3 className="text-lg font-semibold">Editar Data:</h3>
                <input
                  type="date"
                  value={updatedData}
                  onChange={(e) => setUpdatedData(e.target.value)}
                  className="p-2 border rounded w-full"
                />
                <h3 className="text-lg font-semibold">Editar Pessoa:</h3>
                <select
                  value={updatedPessoa || ""}
                  onChange={(e) => setUpdatedPessoa(Number(e.target.value))}
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
                <p className="text-sm text-gray-600">
                  Valor Atual: R$ {gasto.valor}
                </p>
                <p className="text-sm text-gray-600">
                  Parcela: {gasto.parcela || "N/A"}
                </p>
                <p className="text-sm text-gray-600">Data: {gasto.data}</p>
                <p className="text-sm text-gray-600">
                  Pessoas: {gasto.pessoa && gasto.pessoa.length > 0 ? getPessoaNomes(gasto.pessoa) : "N/A"}
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
                  <button
                    onClick={() => handleOpenDivideModal(gasto)}
                    className={`px-4 py-2 rounded ${gasto.is_divided
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-purple-500 text-white hover:bg-purple-600"
                      }`}
                    disabled={gasto.is_divided}
                  >
                    {gasto.is_divided ? 'Gasto já dividido' : 'Dividir Gasto'}
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <DivideModal />
    </div>
  );
};

export default GastoList;
