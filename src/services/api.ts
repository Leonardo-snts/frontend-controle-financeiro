import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const addPessoa = async (data: any) => {
  try {
    const response = await api.post('/adicionar-pessoa/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPessoas = async () => {
  try {
    const response = await api.get('/pessoas/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addGasto = async (data: any) => {
  try {
    const response = await api.post('/gastos/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGastos = async () => {
  try {
    const response = await api.get('/gastos/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGasto = async (id: number, data: any) => {
  console.log("Atualizando gasto:", { id, data }); // Log para verificar os valores
  try {
    const response = await api.put(`/gastos/${id}/`, data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar gasto:", error.response || error.message);
    throw error;
  }
};

export const deleteGasto = async (id: number) => {
  try {
    await api.delete(`/gastos/${id}/`);
  } catch (error) {
    throw error;
  }
};

export const dividirGasto = async (id: number, pessoasIds: number[]) => {
  try {
    const response = await api.post(`/gastos/${id}/dividir_gasto/`, {
      pessoas_ids: pessoasIds
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao dividir gasto:', error);
    throw error;
  }
};

export const updatePessoa = async (id: number, data: any) => {
  try {
    const response = await api.put(`/pessoas/${id}/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deletePessoa = async (id: number) => {
  try {
    await api.delete(`/pessoas/${id}/`);
  } catch (error) {
    throw error;
  }
}

export const fetchTotalGastos = async () => {
  try {
    const response = await api.get('/total-gastos/');
    return response.data;
  } catch (error) {
    throw error;
  }
};
