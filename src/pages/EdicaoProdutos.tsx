import { Box, Button, Grid,  TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  produtosServices } from "../api/querys";



export const EdicaoProdutos = () => {
  const { id } = useParams();
  const idNumero = Number(id);

 

  const [ nome,setNome] = useState("")
  const [ valor,setValor] = useState(0)
  const [ quantidade,setQuantidade] = useState(0)
  const [ estoqueMin,setEstoqueMin] = useState(0)


  

  const theme = useTheme();
 const navigate = useNavigate()

  const saveEdit = ()=>{

    const dados = {id:idNumero, nome,valor,quantidade,estoqueMin}
  produtosServices.update(dados)
  .then((result)=>{
    if(result instanceof Error){
        alert("Error na ediçao")
    }return;
  })
  
 navigate("/estoque")
  }

const handleSetNome = (e: React.ChangeEvent<HTMLInputElement>)=>{
setNome(e.target.value)
}
const handleSetValor= (e: React.ChangeEvent<HTMLInputElement>)=>{
    setValor(Number(e.target.value))
}
const handleSetQuantidade= (e: React.ChangeEvent<HTMLInputElement>)=>{
    setQuantidade(Number(e.target.value))
}
const handleSetEstoqueMin= (e: React.ChangeEvent<HTMLInputElement>)=>{
    setEstoqueMin(Number(e.target.value))
}

  useEffect(() => {
    produtosServices.getId(idNumero).then((result) => {
      if (result instanceof Error) {
        alert(result);
      } else {
        setNome(result.nome)
        setValor(result.valor)
        setQuantidade(result.quantidade)
        setEstoqueMin(result.estoqueMin)
      }
    });
  }, []);
  return (
    <>
    <Box
      component="form"
      sx={{
        width: "80%",
        height: "100%",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"column",
        gap:3
      }}
    >
        <Typography variant="h3">
            Edição de Produtos
        </Typography>
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
          label="Nome"
          value={nome}
         
            onChange={handleSetNome}
            variant="filled"
  
            sx={{ width: theme.spacing(60) }}
          />
        </Grid>
        <Grid item>
          <TextField
          label="Valor"
          onChange={handleSetValor}
           value={valor}
           
          
            sx={{ width: theme.spacing(20), marginLeft: 2,marginTop:2 }}
          />
          <TextField
          label="Quantidade"
          onChange={handleSetQuantidade}
           value={quantidade}
         
       
            sx={{ width: theme.spacing(20), marginLeft: 2,marginTop:2}}
          />
          <TextField
          label="Estoque minino"
          onChange={handleSetEstoqueMin}
           value={estoqueMin}
         
           
            sx={{ width: theme.spacing(20), marginLeft: 2, marginTop:2 }}
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" onClick={saveEdit}>Salvar</Button>
    </Box>

    
    </>
  );
};
