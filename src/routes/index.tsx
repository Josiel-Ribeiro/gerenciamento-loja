import { Navigate, Route, Router, Routes } from "react-router-dom";
import { PaginaInicial } from "../pages/PaginaInicial";
import { Estoque } from "../pages/produtos/Estoque";
import { EdicaoProdutos } from "../pages/produtos/EdicaoProdutos";
import { NovoProduto } from "../pages/produtos/NovoProduto";
import { ListaVendedores } from "../pages/vendedores/ListaVendedores";
import { NovoVendedor } from "../pages/vendedores/NovoVendedor";
import { EdicaoVendedor } from "../pages/vendedores/EdicaoVendedor";
import { NovaVenda } from "../pages/vendas/NovaVenda";
import { AdmPageInicial } from "../pages/adm/AdmPageInicial";
import { Comicionamento } from "../pages/comicionamento/Comicionamento";





export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<PaginaInicial />} />
      <Route path="/estoque" element={<Estoque />} />
      <Route path="/estoque/edicao/:id" element={<EdicaoProdutos/>} />
      <Route path="/estoque/novo" element={<NovoProduto/>} />


      <Route path="/adm" element={<AdmPageInicial/>}/>
      <Route path="/vendedores" element={<ListaVendedores/>}/>
      <Route path="/vendedores/novo" element={<NovoVendedor/>}/>
      <Route path="/vendedores/edicao/:id" element={<EdicaoVendedor/>}/>
      <Route path="/nova-venda" element={<NovaVenda/>}/>


      <Route path="/comicionamento" element={<Comicionamento/>}/>

     



      <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
    </Routes>
  );
};
