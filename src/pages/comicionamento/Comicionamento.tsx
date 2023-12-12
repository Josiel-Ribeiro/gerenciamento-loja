import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ChangeEvent, useEffect, useState } from "react";
import { TVendedores, VendedoresService } from "../../api/querysVendedores";
import { format, isValid } from "date-fns";
import { TVendas, vendasServices } from "../../api/queryVendas";
import { ca } from "date-fns/locale";

type TInfo = {
  nome: string;
  total: number;
};
export const Comicionamento = () => {
  const [vendas,setVendas] = useState<TVendas[]>()
  const [calculo,setCalculo] = useState<TInfo>()
  const [vendedores, setVendores] = useState<TVendedores[]>();
  const [porcentagem,setPorcentagem] = useState<string>("0")
  const [valor,setValor] = useState(0)
  const [nome, setNome] = useState<string>("");
  const [ dataInicial,setDataInicial] = useState("")
  const [ dataFinal,setDataFinal] = useState("")
  const theme = useTheme();
  const smDawn = useMediaQuery(theme.breakpoints.down("sm"));




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

const buscar = ()=>{
 
  const dados:TInfo = {nome:"",total:0}
  if(dataFinal && dataInicial && nome){
  let newList =   vendas?.filter(item => item.vendedor === nome && (item.data >= dataInicial) && (item.data <= dataFinal))
  if( newList && newList?.length > 0){
   dados.nome = newList[0].vendedor
   for(let i = 0; i < newList.length;i ++){
    dados.total += newList[i].total
   }
   setCalculo(dados)
   setValor((dados.total / 100)*Number(porcentagem))
  }else{
    dados.nome = nome
    dados.total = 0
    setCalculo(dados)
    setValor(0)
  }
  
 
  }else{
    alert("Preencha todos os campos")
  }

  if(dataFinal < dataInicial){
    alert("Data final menor que data inicial")
  }
  
}

const handleSetPorcentagem = (e: React.ChangeEvent<HTMLInputElement>) => {
  const cleanedValue = e.target.value.replace(/[^0-9.]/g, '');

  if (cleanedValue !== null && cleanedValue !== undefined) {
    const isValid = /^(\d*\.?\d{0,2}|\.\d{1,2})$/.test(cleanedValue);

    if (isValid) {
      setPorcentagem(cleanedValue);
    }
  }
};

  useEffect(() => {
    VendedoresService.getAll().then((result) => {
      if (result instanceof Error) {
        alert("erro na busca");
      } else {
        setVendores(result);
      }
    });
  }, []);

  useEffect(()=>{
    vendasServices.getAll()
    .then((result)=>{
      if(result instanceof Error){
        alert("erro na busca de vendas")
      }else{
        setVendas(result.data)
      }
    })
  },[])

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", color: theme.palette.primary.main }}
      >
        Cálculo de Comissões
      </Typography>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        
      </Box>
      
      <Box display={"flex"} justifyContent={"center"}  margin={2}>
      
        <Box
          component={Paper}
          sx={{ display: smDawn ? "block" : "flex" }}
          gap={3}
          padding={2}
          marginTop={2}
          width={smDawn?"100%":undefined}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box>
              <DatePicker label="Data inicial" format="dd/MM/yyyy" onChange={handleDataInicialChange} sx={{ width:smDawn?"100%":undefined}}/>
            </Box>
            <Box marginTop={smDawn ? 2 : undefined}>
              <DatePicker label="Data final" format="dd/MM/yyyy"  onChange={handleDataFinalChange} sx={{ width:smDawn?"100%":undefined}}/>
            </Box>
          </LocalizationProvider>
          <TextField value={porcentagem} onChange={handleSetPorcentagem} label="%" sx={{width:100,marginTop:smDawn?2:undefined}}/>
          <FormControl variant="standard" sx={{ width: !smDawn? 170:"100%",marginTop:smDawn?2:undefined}}>
            <InputLabel>Nome</InputLabel>
            <Select value={nome} onChange={e =>setNome(e.target.value)}>
              {vendedores?.map((item) => (
                <MenuItem key={item.id} value={item.nome}>
                  {item.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button onClick={buscar} size="small" sx={{ height: 35, marginTop: 2 }}>
            Buscar
          </Button>
        </Box>
      </Box>

     <Box margin={2}>
     <TableContainer sx={{ width: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center", color: theme.palette.primary.main }}>Nome</TableCell>
              <TableCell sx={{ textAlign: "center", color: theme.palette.primary.main }}>Total</TableCell>
              <TableCell sx={{ textAlign: "center", color: theme.palette.primary.main }}>Comissão</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow >
              <TableCell sx={{textAlign:"center"}}>{calculo?.nome}</TableCell>
              <TableCell sx={{textAlign:"center"}}>{calculo?.total}</TableCell>
              <TableCell sx={{textAlign:"center"}}> {valor.toFixed(2)} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
     </Box>
    </Box>
  );
};
