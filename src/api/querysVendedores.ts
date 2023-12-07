import axios from "axios";

const urlBase = "http://localhost:3333/vendedores"

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
  const response = await axios.get(urlBase)
  if(response){
    return response.data
  }else{
    return new Error("Erro na busca")
  }
}

const getFilter = async (page = 3, filter = ""):Promise<TResponse | Error>=> {
  try {
    const result = await axios.get(
      `${urlBase}?_page=${page}&_limit=${5}&nome_like=${filter}`
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
  const {data}  = await axios.post(urlBase,dados)
 if(data){
  return data.id
 }else{
  return new Error("Erro ao adicionar")
 }
}

const getId = async(id:number):Promise<TVendedores | Error> =>{

  const response = await axios.get(`${urlBase}/${id}`)
  if(response.data){
    return response.data
  }else{
    return new Error("erro na busca")
  }
}

const update = async(dados:TVendedores)=>{

  const info = {
    nome:dados.nome,
    email:dados.email,
    telefone:dados.telefone
  }
  const response = await axios.put(`${urlBase}/${dados.id}`,info)
  return response.data

}
// ...
const remove = async(id:number)=>{
 const response =  await axios.delete(`${urlBase}/${id}`)
 return response
}

export const VendedoresService = {
  getFilter,
  create,
  getAll,
  remove,
  getId,
  update

}