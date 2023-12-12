import {
  Box,
  Button,
  Dialog,
  DialogActions,
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
import { useEffect, useState } from "react";
import { TVendedores, VendedoresService } from "../../api/querysVendedores";
import { useNavigate } from "react-router-dom";

export const ListaVendedores = () => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState<TVendedores[]>([]);
  const [isloading, setIsloading] = useState(false);
  const [openAvisoDelete, setOpenAvisoDelete] = useState(false);
  const [itemDelete, setItemDelete] = useState(0);

  const theme = useTheme();
  const mdDawn = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();


  const funcBusca = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
    setPaginaAtual(1);
  };
  useEffect(() => {
    setIsloading(true);
    VendedoresService.getFilter(paginaAtual, busca).then((result) => {
      setIsloading(false);
      if (result instanceof Error) {
        return result instanceof Error;
      } else {
        setRows(result.data);
        setTotalCount(result.count);
      }
    });
  }, [paginaAtual, busca, totalCount]);

  const setIdDelete = (id: number) => {
    setOpenAvisoDelete(true);
    setItemDelete(id);
  };

  const deleteItem = () => {
    VendedoresService.remove(itemDelete);
    setOpenAvisoDelete(false);
    setRows(rows.filter((item) => item.id !== itemDelete));
    navigate("/vendedores");
  };

  const setParamsVendedor = (id: string) => {
    navigate(`/vendedores/edicao/${id}`);
  };

  return (
    <Box>
      <Box margin={3}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            ),
          }}
          onChange={funcBusca}
          size="small"
          placeholder="Buscar Vendedor"
        />
      </Box>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ margin: 3, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography sx={{ marginLeft: 4 }}>Ações</Typography>
              </TableCell>
              <TableCell>
                <Typography>Nome</Typography>
              </TableCell>
              {!mdDawn && (
                <>
                  <TableCell>
                    <Typography>Email</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Telefone</Typography>
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Button onClick={() => setParamsVendedor(item.id.toString())}>
                    <Icon>edit</Icon>
                  </Button>
                  <Button onClick={() => setIdDelete(item.id)}>
                    <Icon>delete</Icon>
                  </Button>
                </TableCell>
                <TableCell>
                  <Typography>{item.nome}</Typography>
                </TableCell>
                {!mdDawn && (
                  <>
                    <TableCell>
                      <Typography>{item.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{item.telefone}</Typography>
                    </TableCell>
                  </>
                )}
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
        <Pagination
          count={Math.ceil(totalCount / 5)}
          page={paginaAtual}
          onChange={(e, newPage) => setPaginaAtual(newPage)}
        />
      </TableContainer>

      <Box display={"flex"} justifyContent={"center"}>
        <Button
          variant="contained"
          onClick={() => navigate("/vendedores/novo")}
        >
          <Icon sx={{marginRight:1}}>person_add</Icon >
          Novo Registro
        </Button>
      </Box>

      <Dialog open={openAvisoDelete} onClose={() => setOpenAvisoDelete(false)}>
        <DialogTitle bgcolor={theme.palette.background.default}>
          Deseja realmente excluir este registro?
        </DialogTitle>
        <DialogActions sx={{ bgcolor: theme.palette.background.default }}>
          <Button onClick={() => setOpenAvisoDelete(false)} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={deleteItem} variant="outlined">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
