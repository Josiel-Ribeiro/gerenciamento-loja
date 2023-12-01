import { Navigate, Route, Routes } from "react-router-dom";
import { PaginaInicial } from "../pages/PaginaInicial";
import { Estoque } from "../pages/produtos/Estoque";
import { EdicaoProdutos } from "../pages/produtos/EdicaoProdutos";
import { NovoProduto } from "../pages/produtos/NovoProduto";
import { ListaVendedores } from "../pages/vendedores/ListaVendedores";
import { NovoVendedor } from "../pages/vendedores/NovoVendedor";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<PaginaInicial />} />
      <Route path="/estoque" element={<Estoque />} />
      <Route path="/estoque/edicao/:id" element={<EdicaoProdutos/>} />
      <Route path="/estoque/novo" element={<NovoProduto/>} />
      <Route path="/vendedores" element={<ListaVendedores/>}/>
      <Route path="/vendedores/novo" element={<NovoVendedor/>}/>
      <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
    </Routes>
  );
};
