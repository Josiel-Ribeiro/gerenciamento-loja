import axios from "axios";

export type TProdutos = {
  id: number;
  nome: string;
  valor: number;
  quantidade: number;
  estoqueMin: number;
  validade: string;
};

export type TResponse = {
  data: TProdutos[];
  count: number;
};

const getFilter = async (page = 3, filter = ""): Promise<TResponse | Error> => {
  try {
    const result = await axios.get(
      `http://localhost:3333/produtos?_page=${page}&_limit=${6}&nome_like=${filter}`
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

// ...

export const produtosServices = {
  getFilter,
};
