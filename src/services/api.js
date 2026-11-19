import axios from 'axios';

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
});

export const petService = {
  async listar() {
    const { data } = await api.get('/pets');
    return data;
  },
  async buscarPorId(id) {
    const { data } = await api.get(`/pets/${id}`);
    return data;
  },
  async cadastrar(pet) {
    const { data } = await api.post('/pets', pet);
    return data;
  },
  async excluir(id) {
    await api.delete(`/pets/${id}`);
  },
};

export const tutorService = {
  async listar() {
    const { data } = await api.get('/tutores');
    return data;
  },
  async buscarPorId(id) {
    const { data } = await api.get(`/tutores/${id}`);
    return data;
  },
  async cadastrar(tutor) {
    const { data } = await api.post('/tutores', tutor);
    return data;
  },
  async excluir(id) {
    await api.delete(`/tutores/${id}`);
  },
};

export function mensagemErroApi(erro, mensagemPadrao) {
  if (axios.isAxiosError(erro)) {
    const detalhe = erro.response?.data?.detail;

    if (typeof detalhe === 'string') {
      return detalhe;
    }

    if (Array.isArray(detalhe)) {
      const mensagens = detalhe
        .map((item) => item.msg)
        .filter(Boolean);

      if (mensagens.length > 0) {
        return mensagens.join(' ');
      }
    }

    if (erro.response) {
      return `${mensagemPadrao} (HTTP ${erro.response.status}).`;
    }

    return 'Não foi possível conectar à API. Verifique se o FastAPI está em execução.';
  }

  return mensagemPadrao;
}
