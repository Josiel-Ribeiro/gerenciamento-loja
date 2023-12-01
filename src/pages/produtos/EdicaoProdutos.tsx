import { Box, Button,Grid,  Icon,  TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  produtosServices } from "../../api/querysProdutos";



export const EdicaoProdutos = () => {
  const { id } = useParams();
  const idNumero = Number(id);

 

  const [ nome,setNome] = useState('')
  const [ valor,setValor] = useState('')
  const [ quantidade,setQuantidade] = useState("")
  const [ estoqueMin,setEstoqueMin] = useState("")


  


  const theme = useTheme();
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

  useEffect(() => {
    produtosServices.getId(idNumero).then((result) => {
      if (result instanceof Error) {
        alert(result);
      } else {
        setNome(result.nome)
        setValor(result.valor.toString())
        setQuantidade(result.quantidade.toString())
        setEstoqueMin(result.estoqueMin.toString())
      }
    });
  }, []);


  
  const saveEdit = ()=>{
    const valorFormatado = Number(parseFloat(valor).toFixed(2))
    const dados = {id:idNumero, nome,valor:Number(valorFormatado),quantidade:Number(quantidade),estoqueMin:Number(estoqueMin)}

    
     if(dados.valor > 0){
      produtosServices.update(dados)
      .then((result)=>{
        if(result instanceof Error){
            alert("Error na ediçao")
        }return;
      })
     }else{
      alert("O valor do produto deve ser maior que 0")
      return;
     }
      
      navigate("/estoque")

    
    
 
  
 
  }
  return (
    <>
    <Box
      component="form"
       onSubmit={saveEdit}
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
           required
          label="Nome"
          value={nome}
         
          
            onChange={handleSetNome}
            variant="filled"
  
            sx={{ width: theme.spacing(60) }}
          />
        </Grid>
        <Grid item>
          <TextField
          
           required
          label={<Icon>paid</Icon>}
          onChange={handleSetValor}
           value={valor}
        
           
          
            sx={{ width: theme.spacing(20), marginLeft: 2,marginTop:2 }}
          />
          <TextField
           required
          label="Quantidade"
          onChange={handleSetQuantidade}
           value={quantidade}
        
       
            sx={{ width: theme.spacing(20), marginLeft: 2,marginTop:2}}
          />
          <TextField
          required
          label="Estoque minino"
          onChange={handleSetEstoqueMin}
           value={estoqueMin}
          
         
           
            sx={{ width: theme.spacing(20), marginLeft: 2, marginTop:2 }}
          />
        </Grid>
      </Grid>

     <Button variant="contained"  type="submit">Salvar</Button>
     <Button onClick={()=>navigate("/estoque")}><Icon>arrow_back</Icon></Button>
    </Box>

   

    
    </>
  );
};
