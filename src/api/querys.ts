import axios from "axios";
import { consumers } from "stream";

export type TProdutos = {
  id: number;
  nome: string;
  valor: number;
  quantidade: number;
  estoqueMin: number;
};

export type TResponse = {
  data: TProdutos[];
  count: number;
};

const getFilter = async (page = 3, filter = ""): Promise<TResponse | Error> => {
  try {
    const result = await axios.get(
      `http://localhost:3333/produtos?_page=${page}&_limit=${5}&nome_like=${filter}`
    );
    if (result) {
      const totalCount = result.headers["x-total-count"];
      return { data: result.data, count: totalCount };
    } else {
      return new Error("Erro ao listar os registros");
    }
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro na requisição"
    );
  }
};

// ...

const remove = async (id: number): Promise<void | Error> => {
  try {
    await axios.delete(`http://localhost:3333/produtos/${id}`);
  } catch (error) {
    return new Error("Erro ao deleltar");
  }
};
// ...
const getId = async (id: number): Promise<TProdutos | Error> => {
  try {
    const result = await axios.get(`http://localhost:3333/produtos/${id}`);
    if (result) {
      return result.data;
    } else {
      return new Error("Erro na Busca");
    }
  } catch (error) {
    return new Error("Erro na Busca");
  }
};

const update = async (dados: TProdutos):Promise<void |Error> => {
 try {
  const info = {
    nome: dados.nome,
    valor: dados.valor,
    quantidade: dados.quantidade,
    estoqueMin: dados.estoqueMin,
  };
  const id = dados.id
  await axios.put(`http://localhost:3333/produtos/${id}`,info)
 } catch (error) {
  return new Error("Erro na edição")
 }
};

export const produtosServices = {
  getFilter,
  remove,
  getId,
  update
};
