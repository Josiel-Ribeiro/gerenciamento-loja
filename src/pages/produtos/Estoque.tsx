import { useEffect, useState } from "react";
import { TProdutos, produtosServices } from "../../api/querysProdutos";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Icon,
  InputAdornment,
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
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";


export const Estoque = () => {
  const [listaOriginal, setListaOriginal] = useState<TProdutos[]>();
  const [countOriginal, setCountOriginal] = useState(0);
  const [rows, setRows] = useState<TProdutos[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState("");
  const [idDelete, setIdDelete] = useState(0);
  const [openAviso, setOpenAviso] = useState(false);
  const [reposicao, setReposicao] = useState(0)
  const [showValidation,setShowValidation] = useState(true) 

 
  const theme = useTheme();
  const smDawn = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const setParamsNavigate = (id: string) => {
    navigate(`/estoque/edicao/${id}`);
  };

  const funcBusca = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
    setPaginaAtual(1);
  };

  useEffect(() => {
    if (totalCount <= 4) {
      setPaginaAtual(1);
    }
  }, [totalCount]);

  useEffect(() => {
    setIsloading(true);
    produtosServices.getFilter(paginaAtual, busca).then((result) => {
      setIsloading(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        // Ordena os itens com base na condição quantidade < estoqueMin

        setRows(result.data);
        setTotalCount(result.count);
      }
    });
  }, [paginaAtual, totalCount, busca]);

  const setIdIRemove = (id: number) => {
    setOpenAviso(true);
    setIdDelete(id);
  };

  const funcRemoveItem = () => {
    produtosServices.remove(idDelete).then((result) => {
      if (result instanceof Error) {
        alert("Erro ao deletar");
        setOpenAviso(false);
      } else {
        const newRows = rows.filter((item) => item.id !== idDelete);
        setRows(newRows);
        setTotalCount(rows.length);
        setOpenAviso(false);
      }
    });
  };

  const filtrarPendentes = () => {
    const newList = listaOriginal?.filter(
      (item) => item.quantidade < item.estoqueMin
    );
    if (newList) {
      setRows(newList);
      setShowValidation(false)

      return;
    } else {
      alert("Não contem nem um produto Pendente");
    }
  };


 const voltar = (e: { preventDefault: () => void; })=>{
 
  e.preventDefault();
  window.location.reload();
 }
 
  useEffect(() => {
    produtosServices.getAll().then((result) => {
      if (result instanceof Error) {
        alert("Erro na busca dos produtos pendentes");
      } else {
        setListaOriginal(result);
        setCountOriginal(result.length);
        const newList = result.filter(
          (item) => item.quantidade < item.estoqueMin
        );
        setReposicao(newList.length);
      }
    });
  }, []);

  return (
    <>
      <Box sx={{ margin: 1, display: "flex", justifyContent: "space-between" }}>
        <TextField
          variant="standard"
          label="Campo de buscar"
          onChange={funcBusca}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            ),
          }}
        />

        <Box display={"flex"} justifyContent={"center"} marginRight={3}>
          <Button variant="contained" onClick={() => navigate("/estoque/novo")}>
            <Icon>add</Icon> Novo
          </Button>
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          margin: 1,
          width: "auto",
          height:showValidation?"auto":theme.spacing(40)
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: smDawn ? "0 5px" : "0 50px" }}>
                Ações
              </TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Estoque Min</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ padding: smDawn ? "0" : undefined }}>
                  <Button onClick={() => setParamsNavigate(item.id.toString())}>
                    <Icon>edit</Icon>
                  </Button>
                  <Button onClick={() => setIdIRemove(item.id)}>
                    <Icon>delete</Icon>
                  </Button>
                </TableCell>
                <TableCell
                  sx={{
                    color: item.quantidade < item.estoqueMin ? "red" : "white",
                  }}
                >
                  {item.nome}
                </TableCell>
                <TableCell
                  sx={{
                    color: item.quantidade < item.estoqueMin ? "red" : "white",
                  }}
                >
                  {item.valor}
                </TableCell>
                <TableCell
                  sx={{
                    color: item.quantidade < item.estoqueMin ? "red" : "white",
                  }}
                >
                  {item.quantidade}
                </TableCell>
                <TableCell
                  sx={{
                    color: item.quantidade < item.estoqueMin ? "red" : "white",
                  }}
                >
                  {item.estoqueMin}
                </TableCell>
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
         { showValidation && totalCount > 0 && totalCount > 3 && (
          <Pagination
            count={Math.ceil(totalCount / 3)}
            page={paginaAtual}
            onChange={(e, valor) => setPaginaAtual(valor)}
            sx={{ background: theme.palette.primary.light }}
          />
        )}
      </TableContainer>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={3}
      >
        <Box width={"100%"} display={"flex"} justifyContent={"center"} gap={2}>
          <Box display={"flex"} flexDirection={"column"}>

            <Typography color={"red"}>

              <Button onClick={filtrarPendentes}>Reposição pendente</Button>{" "}
              {reposicao} 
            </Typography>
          
            <Button onClick={voltar}><Icon>arrow_back_ios</Icon></Button>
            
          </Box>
          <Typography marginTop={0.5}>
          Total: {totalCount}
          </Typography>
        
        </Box>
        
      </Box>

      <Dialog open={openAviso} onClose={() => setOpenAviso(false)}>
        <DialogTitle sx={{ color: "red",background:theme.palette.background.default }}>Aviso!</DialogTitle>
        <DialogContentText sx={{ padding: 1,background:theme.palette.background.default  }}>
          <Typography >
          Deseja realmente excluir este registro?
          </Typography>
          
        </DialogContentText>

        <DialogActions sx={{background:theme.palette.background.default}}>
          <Button onClick={() => setOpenAviso(false)}>Cancelar</Button>
          <Button onClick={funcRemoveItem}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
