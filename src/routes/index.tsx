import { Navigate, Route, Routes } from "react-router-dom";
import { PaginaInicial } from "../pages/PaginaInicial";
import { Estoque } from "../pages/Estoque";
import { EdicaoProdutos } from "../pages/EdicaoProdutos";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<PaginaInicial />} />
    
      <Route path="/estoque" element={<Estoque />} />
      <Route path="/estoque/edicao/:id" element={<EdicaoProdutos/>} />
      <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
    </Routes>
  );
};
