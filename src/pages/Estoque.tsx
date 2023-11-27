import { useEffect, useState } from "react";
import { TProdutos, produtosServices } from "../api/querys";
import {
  Box,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

export const Estoque = () => {
  const [rows, setRows] = useState<TProdutos[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    setIsloading(true);
    produtosServices.getFilter(paginaAtual, busca).then((result) => {
      setIsloading(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        console.log(result.data);
        console.log(result.count);
        setRows(result.data);
        setTotalCount(result.count);
      }
    });
  }, [paginaAtual, busca]);
  return (
    <Box>
      <Box sx={{ margin: 1 }}>
        <TextField
          variant="standard"
          label="Campo de buscar"
          onChange={(e) => setBusca(e.target.value)}
        />
      </Box>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ margin: 1, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Validade</TableCell>
              <TableCell>Quantidade</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((item) => (
              <TableRow key={item.id}>
                <TableCell>Ações</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.valor}</TableCell>
                <TableCell>{item.validade}</TableCell>
                <TableCell>{item.quantidade}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {isloading && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
        {totalCount > 0 && totalCount > 6 && (
          <Pagination
            count={Math.ceil(totalCount / 6)}
            page={paginaAtual}
            onChange={(e, valor) => setPaginaAtual(valor)}
          />
        )}
      </TableContainer>
    </Box>
  );
};
