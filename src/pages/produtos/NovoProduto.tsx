import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Icon,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {  produtosServices } from "../../api/querysProdutos";
import { useNavigate } from "react-router-dom";

type dadosForm = {
  nome: string;
  valor: number;
  quantidade: number;
  estoqueMin: number;
};
export const NovoProduto = () => {
  const { register, handleSubmit,formState:{errors} } = useForm<dadosForm>();

  const [ nome,setNome] = useState('')
  const [ valor,setValor] = useState('')
  const [ quantidade,setQuantidade] = useState("")
  const [ estoqueMin,setEstoqueMin] = useState("")
  const [aviso,setAviso] = useState(false)
  const [ message,setMessage] = useState("Produto Adicionado com sucesso!")

  const navigate = useNavigate()


  
const handleSetNome = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const inputNome = e.target.value
    if(inputNome !== null && inputNome !== undefined){
      setNome(inputNome)
    }
    }

    const handleSetValor = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cleanedValue = e.target.value.replace(/[^0-9.]/g, '');
      
        if (cleanedValue !== null && cleanedValue !== undefined) {
          const isValid = /^(\d*\.?\d{0,2}|\.\d{1,2})$/.test(cleanedValue);
      
          if (isValid) {
            setValor(cleanedValue);
          }
        }
      };
  const handleSetQuantidade= (e: React.ChangeEvent<HTMLInputElement>)=>{
    const cleanedValue = e.target.value.replace(/[^0-9]/g, '')
    if(  cleanedValue !== null && valor !== undefined ){
      setQuantidade(cleanedValue)
    }
  }
  const handleSetEstoqueMin= (e: React.ChangeEvent<HTMLInputElement>)=>{
    const cleanedValue = e.target.value.replace(/[^0-9]/g, '')
    if(  cleanedValue !== null && valor !== undefined ){
      setEstoqueMin(cleanedValue)
    }
  }

const save = (dados:dadosForm)=>{
produtosServices.getFilter(1,dados.nome)
.then((result)=>{
    if(result instanceof Error){
       console.log("erro na validação")
    }else if(result.count > 0){
        setAviso(true)
        setMessage("Este produto ja esta cadastrado")
    }else{
        produtosServices.create(dados)
        setAviso(true)
        
    }
})
  
    
}


const retorno = ()=>{

    setAviso(false)
    navigate("/estoque")
}


  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        component={Paper}
        sx={{
          display: "flex",
          width: "60%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit((data)=>{
            save(data)
          })}
          sx={{
            width: "80%",
            height: "100%",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography variant="h3">Novo Produto</Typography>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
              {...register("nome")}
                required
                value={nome}
                label="Nome"
                variant="filled"
                sx={{ width: theme.spacing(60) }}
                onChange={handleSetNome}
              />
            </Grid>
            <Grid item>
              <TextField
               {...register("valor")}
              value={valor}
                required
                label={<Icon>paid</Icon>}
                sx={{ width: theme.spacing(20), marginLeft: 2, marginTop: 2 }}
                onChange={handleSetValor}
              />
              <TextField
               {...register("quantidade")}
                required
                value={quantidade}
                label="Quantidade"
                sx={{ width: theme.spacing(20), marginLeft: 2, marginTop: 2 }}
                onChange={handleSetQuantidade}
              />
              <TextField
               {...register("estoqueMin")}
                required
                value={estoqueMin}
                label="Estoque minino"
                sx={{ width: theme.spacing(20), marginLeft: 2, marginTop: 2 }}
                onChange={handleSetEstoqueMin}
              />
            </Grid>
          </Grid>

          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </Box>
      </Box>


<Dialog open={aviso} >
    <DialogTitle sx={{bgcolor:theme.palette.background.default}} >
     {message}
    </DialogTitle>

    <DialogActions sx={{bgcolor:theme.palette.background.default}}>
       <Button onClick={retorno}>Voltar</Button>
    </DialogActions>
</Dialog>

    </Box>
  );
};
