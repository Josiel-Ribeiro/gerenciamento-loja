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
import { useNavigate } from "react-router-dom";


export const Estoque = () => {
  
  const [rows, setRows] = useState<TProdutos[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState("");
  const [idDelete, setIdDelete] = useState(0);
  const [openAviso, setOpenAviso] = useState(false);
  const [reposicao,setReposicao] = useState(0)


  


const theme = useTheme()
const smDawn = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate();
  const setParamsNavigate = (id: string) => {
    navigate(`/estoque/edicao/${id}`);
  };



  const funcBusca = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
    setPaginaAtual(1);
  };



  useEffect(()=>{
 if(totalCount <= 5){
  setPaginaAtual(1)
 }
  },[totalCount])

  useEffect(() => {
    
      setIsloading(true);
    produtosServices.getFilter(paginaAtual, busca).then((result) => {
      setIsloading(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {

        const produtosAReposicao = []

        result.data.map(item =>{
          if(item.quantidade < item.estoqueMin){
            produtosAReposicao.push(item)
          }
        })
        // Ordena os itens com base na condição quantidade < estoqueMin
        const listOrder = result.data.sort((a, b) => {
          const quantidadeA = a.quantidade;
          const estoqueMinA = a.estoqueMin;
          const quantidadeB = b.quantidade;
          const estoqueMinB = b.estoqueMin;
  
          // Ajuste a lógica conforme necessário para seus tipos de dados
          // Neste exemplo, ordenamos de forma decrescente, colocando os itens com quantidade < estoqueMin primeiro
          return (quantidadeA < estoqueMinA ? -1 : 1) - (quantidadeB < estoqueMinB ? -1 : 1);
        });
  
        setRows(listOrder);
        setTotalCount(result.count);
        setReposicao(produtosAReposicao.length)
      }
    });
  }, [paginaAtual,totalCount, busca]);



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
        setTotalCount(rows.length)
        setOpenAviso(false);
      }
    });
  };

  


  return (
   <>
      <Box sx={{ margin: 1, display:"flex", justifyContent:"space-between" }}>
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
       
       
          
          <Box 
      display={"flex"}
      justifyContent={"center"}
      marginRight={3}
      >
         
        
        <Button variant="contained" onClick={()=>navigate("/estoque/novo")}>
          <Icon>add</Icon> Novo 
        </Button>
      </Box>
     
      </Box>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ margin: 1, width:"auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding:smDawn? "0 5px":"0 50px" }}>Ações</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Estoque Min</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{padding:smDawn? "0":undefined}}>
                  <Button onClick={() => setParamsNavigate(item.id.toString())}>
                    <Icon>edit</Icon>
                  </Button>
                  <Button onClick={() => setIdIRemove(item.id)}>
                    <Icon>delete</Icon>
                  </Button>
                </TableCell>
                <TableCell sx={{color:item.quantidade < item.estoqueMin?"red":"white"}}>{item.nome}</TableCell>
                <TableCell sx={{color:item.quantidade < item.estoqueMin?"red":"white"}}>{item.valor}</TableCell>
                <TableCell sx={{color:item.quantidade < item.estoqueMin?"red":"white"}}>{item.quantidade}</TableCell>
                <TableCell sx={{color:item.quantidade < item.estoqueMin?"red":"white"}}>{item.estoqueMin}</TableCell>
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
        {totalCount > 0 && totalCount > 5 && (
          <Pagination
            count={Math.ceil(totalCount/5)}
            page={paginaAtual}
            onChange={(e, valor) => setPaginaAtual(valor)}
            sx={{background:theme.palette.primary.light}}
          />
        )}
      </TableContainer>
      <Box   display={"flex"} justifyContent={"center"} alignItems={"center"} gap={3}>
        



            
      <Box width={"100%"} display={"flex"} justifyContent={"center"} gap={2}>
      <Box >
          <Typography color={"red"}>
     Reposição pendente {reposicao}
          </Typography>
         </Box>


         <Box marginRight={8}>
          <Typography color={theme.palette.primary.main} >
     Total {totalCount}
          </Typography>
         </Box>
      

          </Box>
      </Box>


      <Dialog open={openAviso} onClose={() => setOpenAviso(false)}>
        <DialogTitle sx={{ color: "red" }}>Aviso!</DialogTitle>
        <DialogContentText sx={{ padding: 1 }}>
          Deseja realmente excluir este registro?
        </DialogContentText>

        <DialogActions>
          <Button onClick={() => setOpenAviso(false)}>Cancelar</Button>
          <Button onClick={funcRemoveItem}>Confirmar</Button>
        </DialogActions>
      </Dialog>

    
      </>
  );
};
