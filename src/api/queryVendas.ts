import axios from "axios"
import { TItemVendido } from "../pages/vendas/NovaVenda"


export type TVendas = {
 id:number,
  vendedor:string,
  venda: TItemVendido[] | undefined,
  total:number,
  data:string
}

type TResponse = {
  data:TVendas[],
  count:number
}

const getAll = async():Promise<TResponse | Error>=>{
  const response = await axios.get(`http://localhost:3333/vendas`)
if(response){
  const totalCount = response.headers["x-total-count"]
return {data:response.data,count:totalCount}
}else{
  return new Error("Erro na busca")
}
}





const addVenda = async(dados:Omit<TVendas,"id">):Promise<number | Error>=>{

  const response = await axios.post("http://localhost:3333/vendas",dados)
  if(response){
  return response.data
  }else{
    return new Error("Erro ao adicionar")
  }

}


export const vendasServices = {
  addVenda,
  getAll
}