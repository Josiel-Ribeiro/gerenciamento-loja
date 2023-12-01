import {
  Box,
  Button,
  Icon,
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

  const theme = useTheme();
  const mdDawn = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate()

  useEffect(() => {
    VendedoresService.getFilter(paginaAtual, busca).then((result) => {
      if (result instanceof Error) {
        return result instanceof Error;
      } else {
        setRows(result.data);
        setTotalCount(result.count);
      }
    });
  }, [paginaAtual, busca, totalCount]);

  return (
    <Box>
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
                  <Button>
                    <Icon>edit</Icon>
                  </Button>
                  <Button>
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
        <Button variant="contained" onClick={()=>navigate("/vendedores/novo")}>Novo Registro</Button>
      </Box>
    </Box>
  );
};
