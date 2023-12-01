import axios from "axios";



export type TVendedores = {
  id:number,
  nome:string,
  email:string,
  telefone:number
}

type TResponse = {
  data:TVendedores[],
  count:number
}

const getAll = async():Promise<TVendedores[] | Error>=>{
  const response = await axios.get("http://localhost:3333/vendedores")
  if(response){
    return response.data
  }else{
    return new Error("Erro na busca")
  }
}

const getFilter = async (page = 3, filter = ""):Promise<TResponse | Error>=> {
  try {
    const result = await axios.get(
      `http://localhost:3333/vendedores?_page=${page}&_limit=${5}&nome_like=${filter}`
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


const create = async (dados:Omit<TVendedores,"id" >):Promise<number | Error>=>{
  const {data}  = await axios.post("http://localhost:3333/vendedores",dados)
 if(data){
  return data.id
 }else{
  return new Error("Erro ao adicionar")
 }
}

// ...

export const VendedoresService = {
  getFilter,
  create,
  getAll
}