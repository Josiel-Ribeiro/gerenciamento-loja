import {
  
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  FormControl,
  Icon,
  InputLabel,

  LinearProgress,

  MenuItem,
  OutlinedInput,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
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
import { TProdutos, produtosServices } from "../../api/querysProdutos";
import { useEffect, useState } from "react";
import { green } from "@mui/material/colors";
import { TVendedores, VendedoresService } from "../../api/querysVendedores";

import { TVendas, vendasServices } from "../../api/queryVendas";
import { format } from "date-fns";

export type TItemVendido = {
  id: number;
  produto: string;
  valor:number;
  quantidade: number;
  estoqueMin: number;
  quantidadeVendida: number;
  valorTotal: number;
};

export const NovaVenda = () => {
  const theme = useTheme();
  const mdDawn = useMediaQuery(theme.breakpoints.down("md"))
 const [modalVenda,setModalVenda] = useState(false)
 const [modalOpen, setModalOpen] = useState(false);
 const [opemVendaConfirmada,setOpemVendaConfirmada] = useState(false)
 const [isloading,setIsloading] = useState(true)
 
  const [rows, setRows] = useState<TProdutos[]>();
  const [count, setCout] = useState(0);
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);

const [listaVendedores,setListavendedores] = useState<TVendedores[]>()

  const [nome, setNome] = useState("");
  const [itemId, setItemId] = useState(0);
  const [valor, setvalor] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [estoqueMin, setEstoqueMin] = useState(0);
  const [quantidadeVendida, setQuantidadeVendida] = useState(1);
  const [itensVendidos, setItensVendidos] = useState<TItemVendido[]>();
  const [total, setTotal] = useState(0);
  const [ nomeVendedor,setNomeVendedor] = useState("")

  useEffect(() => {
    produtosServices.getFilter(paginaAtual, busca).then((result) => {
      setIsloading(false)
      if (result instanceof Error) {
        alert("Erro na busca");
      } else {
        setRows(result.data);
        setCout(result.count);
      }
    });
  }, [busca, paginaAtual]);

  const setItem = (
    id: number,
    produto: string,
    quantidade: number,
    estoqueMin: number,
    valor:number
  ) => {
    setItemId(id);
    setNome(produto);
    setvalor(Number(valor));
    setQuantidade(Number(quantidade));
    setEstoqueMin(estoqueMin);
    setvalor(valor)
    setModalOpen(true);
  };

  const addItem = () => {
    const newItem = {
      id: itemId,
      produto: nome,
      valor:valor,
      quantidade: quantidade,
      estoqueMin: estoqueMin,
      quantidadeVendida: quantidadeVendida,
      valorTotal: quantidadeVendida * valor,
    };
console.log(newItem)
    const verificar = itensVendidos?.find(
      (item) => item.produto === newItem.produto
    );

    if (verificar === undefined) {
        setItensVendidos((prevItens) => [...(prevItens || []), newItem]);
      setQuantidade((valorAnterior) => valorAnterior - quantidadeVendida);
      setModalOpen(false);
    } else if (
      verificar.quantidadeVendida + newItem.quantidadeVendida >
      verificar.quantidade
    ) {
      alert(
        `Demenada Maior que estoque! Quantidade disponivel ${verificar.quantidade}`
      );
      setModalOpen(false);
    } else if (verificar) {
      alert("Este item ja foi adicionado");
      setModalOpen(false);
    }
  };

  const funcBusca = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
    setPaginaAtual(1);
  };

  useEffect(() => {
    if(itensVendidos){
      let newTotal = 0;
    itensVendidos?.map((item) => (newTotal = item.valorTotal + newTotal));
    setTotal(newTotal);
    }
  }, [itensVendidos]);

  const removeItem = (id: number) => {
    setItensVendidos(itensVendidos?.filter((item) => item.id !== id));
  };

  const handleGetName = (e: SelectChangeEvent)=>{
   setNomeVendedor(e.target.value)
  }

  useEffect(()=>{
    VendedoresService.getAll()
    .then((result)=>{
        if(result instanceof Error){
            return
        }else{
            setListavendedores(result)
        }
    })
  },[])

  const finalizarVenda = ()=>{

const dataAtual = new Date()

const dataFormatada = format(dataAtual, 'dd/MM/yyyy');

    let dados:Omit<TVendas,"id"> = {
      vendedor:nomeVendedor,
      venda: itensVendidos,
      total:total,
      data: dataFormatada
    }
   vendasServices.addVenda(dados)
   .then((result)=>{
    if(result instanceof Error){
      alert("erro ao adicionar nova venda")
    }else{
      setOpemVendaConfirmada(true)
    }
   })

   setItensVendidos([])
   setModalVenda(false)
  }

  return (
    <Box>
      <Typography sx={{ textAlign: "center" }}>Nova Venda</Typography>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={2}
      >
        <TextField
          onChange={funcBusca}
          size="small"
          label="Busca produto"
          sx={{
            width: theme.spacing(50),
          }}
        />
      </Box>
      <TableContainer sx={{ width: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Estoque</TableCell>
              <TableCell>Adicionar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.valor}</TableCell>
                <TableCell>{item.quantidade}</TableCell>

                <TableCell>
                  <Button
                    onClick={() =>
                      setItem(
                        item.id,
                        item.nome,
                        item.quantidade,
                        item.estoqueMin,
                        item.valor,
                        
                       
                        
                      )
                    }
                    size="small"
                    variant="contained"
                  >
                    Selecionar
                  </Button>
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
      </TableContainer>
      <Pagination
        count={Math.ceil(count / 5)}
        page={paginaAtual}
        onChange={(e, valor) => setPaginaAtual(valor)}
        sx={{ backgroundColor: theme.palette.primary.main }}
      />

      <Box
        marginTop={2}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
      >
        <Box component={Paper} padding={2} width={"80%"}>
          <Box display={"flex"} justifyContent={"space-between"}>
           
            <Typography sx={{ color: green[600], marginTop:1}}>
              Total: {total.toFixed(2)}
            </Typography>
            <Button sx={{marginTop:1}} onClick={()=>setModalVenda(true)}>Finalizar Venda</Button>
          </Box>
          <TableContainer
            sx={{ overflowx: "scroll", maxHeight: theme.spacing(20) }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Quantidade</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Remover</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itensVendidos?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.produto}</TableCell>
                    <TableCell>{item.quantidadeVendida}</TableCell>
                    <TableCell>{item.valorTotal} $</TableCell>
                    <TableCell>
                      <Button onClick={() => removeItem(item.id)}>
                        <Icon>delete</Icon>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              
         
            </Table>
          </TableContainer>
        </Box>
      </Box>

      
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.background.default,
            width: theme.spacing(28),
          }}
        >
          Selecione a quandidade
        </DialogTitle>

        <DialogActions
          sx={{
            backgroundColor: theme.palette.background.default,
            width: theme.spacing(32),
          }}
        >
          <TextField
            value={
              quantidadeVendida < 0? 1:undefined  || quantidadeVendida > quantidade?quantidade:quantidadeVendida
            }
            onChange={(e) => setQuantidadeVendida(Number(e.target.value))}
            size="small"
            type="number"
            label="Qts"
            sx={{ width: theme.spacing(10), marginRight: 5 }}
          />
          <Button onClick={addItem}>Adicionar</Button>
        </DialogActions>
      </Dialog>

<Dialog open={modalVenda}  onClose={()=>setModalVenda(false)} sx={{marginLeft:!mdDawn?32:undefined}}>
    <DialogContentText sx={{width:theme.spacing(42),backgroundColor:theme.palette.background.default}}>
        <Typography sx={{marginTop:2,textAlign:"center"}}>Valor Total da venda {total}</Typography>
    </DialogContentText>
    <DialogActions  sx={{width:theme.spacing(40),backgroundColor:theme.palette.background.default}}>
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>Vendedor responsavel</InputLabel>
            <Select value={nomeVendedor} onChange={handleGetName}  input={<OutlinedInput label="Vendedor responsavel" />}>
            
             {
                listaVendedores?.map(item =>
                    
                    <MenuItem key={item.id} value={item.nome}>
                    {item.nome}
                    </MenuItem>
                    )
             }

            </Select>
            <Button onClick={finalizarVenda}>Conformar</Button>
        </FormControl>
    </DialogActions>
</Dialog>


<Dialog open={opemVendaConfirmada} sx={{marginLeft:!mdDawn?29:undefined}}>
<DialogTitle sx={{width:mdDawn?200:400,backgroundColor:theme.palette.background.default}}>
  Venda adicionada com sucesso!
</DialogTitle>
<DialogActions sx={{bgcolor:theme.palette.background.default}}>
  <Button onClick={()=>setOpemVendaConfirmada(false)}>Voltar</Button>
</DialogActions>
</Dialog>
  

    </Box>
  );
};


