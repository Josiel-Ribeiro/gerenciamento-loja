import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Divider,
  Icon,
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
import { TVendas, vendasServices } from "../../api/queryVendas";
import { TItemVendido } from "../vendas/NovaVenda";
import * as XLSX from 'xlsx';

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format, isValid } from "date-fns";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const AdmPageInicial = () => {
  const theme = useTheme();
  const mdDawn = useMediaQuery(theme.breakpoints.down("md"));
  const lgDawn = useMediaQuery(theme.breakpoints.down("lg"));

  const [rows, setrows] = useState<TVendas[] | undefined>();

  const [dataInicial, setDataInicial] = useState("");
  const [datafinal, setDataFinal] = useState("");

  const [openList, setOpenlist] = useState(false);
  const [listaDaVenda, setListaDaVenda] = useState<TItemVendido[]>();

  const openVenda = (venda: TItemVendido[] | undefined) => {
    if (venda) {
      const newList = venda;

      setListaDaVenda(newList);
      setOpenlist(true);
    }
  };

  const handleDataInicialChange = (date: Date | null) => {
    if (date !== null) {
     
      const dataformatada = isValid(date) ? format(date, "dd/MM/yyyy") : "";

      setDataInicial(dataformatada);
    } else {
      setDataInicial("");
    }
  };

  const handleDataFinalChange = (date: Date | null) => {
    if (date !== null) {
      const dataformatada = isValid(date) ? format(date, "dd/MM/yyyy") : "";
      setDataFinal(dataformatada);
    } else {
      setDataFinal("");
    }
  };

  const filtrarPorData = () => {
    vendasServices.getAll().then((result) => {
      if (result instanceof Error) {
        alert("Erro na busca");
      } else {
        let newList = result.data.filter(
          (item) =>
            new Date(item.data) >= new Date(dataInicial) &&
            new Date(item.data) <= new Date(datafinal)
        );
        setrows(newList);
      }
    });
  };

  useEffect(() => {
    if (lgDawn) {
      vendasServices.getAll().then((result) => {
        if (result instanceof Error) {
          alert("erro na Busca");
        } else {
          setrows(result.data);
        }
      });
    }
  }, [lgDawn]);

  const relatorio = (dados: Omit<TVendas, 'id' | 'venda'>[], nome: string) => {
    const ws = XLSX.utils.json_to_sheet(dados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatorio');
    XLSX.writeFile(wb, `${nome}.xlsx`);
  };
  
  const exportarRelatorios = () => {
    if (rows) {
      const newList = rows.map(({ id, venda, ...resto }) => ({
        ...resto, // Mantém todas as outras propriedades
      }));
      relatorio(newList, 'Relatorios');
    }
  };
  
  return (
    <Box sx={{ margin: 3 }}>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 3 }}>
        Relatorio de vendas
      </Typography>
      {!lgDawn && (
        <Typography sx={{ marginBottom: 2 }}>Selecione a data</Typography>
      )}
      <Box display={"flex"} justifyContent={"space-between"}>
        {!lgDawn && (
          <Box display={"flex"} gap={5} marginRight={5}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                format="dd/MM/yyyy"
                onChange={handleDataInicialChange}
                sx={{ width: 180 }}
              />
              <DatePicker
                format="dd/MM/yyyy"
                onChange={handleDataFinalChange}
                sx={{ width: 180 }}
              />
            </LocalizationProvider>
            <Button onClick={filtrarPorData}>Buscar</Button>
          </Box>
        )}

        <Typography sx={{ color: theme.palette.primary.main }}>
          Total de registros {rows?.length}
        </Typography>
      </Box>

      <Box
        component={Paper}
        display={"flex"}
        flexDirection={"column"}
        marginTop={5}
        maxWidth={theme.spacing(200)}
      >
        <TableContainer sx={{ height:"40vh", overflowY: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: theme.palette.primary.main }}>
                  Vendedor
                </TableCell>
                <TableCell sx={{ color: theme.palette.primary.main }}>
                  Data
                </TableCell>
                <TableCell sx={{ color: theme.palette.primary.main }}>
                  Valor
                </TableCell>
                <TableCell sx={{ color: theme.palette.primary.main }}>
                  Venda
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.vendedor}</TableCell>
                  <TableCell>{item.data}</TableCell>
                  <TableCell>{item.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button onClick={() => openVenda(item.venda)}>
                      <Icon>folder_open</Icon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box><Button variant="outlined" onClick={exportarRelatorios} sx={{marginTop:2 ,marginBottom:1,marginLeft:1}}>export Relatorio</Button></Box>
      </Box>
      {openList && (
        <Dialog
          open={true}
          onClose={() => setOpenlist(false)}
          sx={{ marginLeft: !mdDawn ? 29 : undefined }}
        >
          <DialogActions
            sx={{
              width: mdDawn ? 300 : 500,
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{color:theme.palette.primary.main}}>Produto</TableCell>
                  <TableCell sx={{color:theme.palette.primary.main}}>quantidade</TableCell>
                  <TableCell sx={{color:theme.palette.primary.main}}>Valor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listaDaVenda?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.produto}</TableCell>
                    <TableCell>{item.quantidadeVendida}</TableCell>
                    <TableCell>{item.valorTotal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};
