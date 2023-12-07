import {
  Box,
  Button,
  Icon,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import {VendedoresService } from "../../api/querysVendedores";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EdicaoVendedor = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate()

  const [nome, setNome] = useState("Nome");
  const [email, setEmail] = useState("Email");
  const [telefone, setTelefone] = useState<number>(99999999999);

 
 
const save = ()=>{
const info ={
    id:Number(id),nome,email,telefone
}
    VendedoresService.update(info)
    .then((result)=>{
        console.log(result)
    })
    navigate("/vendedores")
    
}
 
  useEffect(() => {
    VendedoresService.getId(Number(id)).then((result) => {
      if (result instanceof Error) {
        alert("Error na Busca");
      } else {
        setNome(result.nome);
        setEmail(result.email);
        setTelefone(Number(result.telefone));
      }
    });
  }, []);

  return (
    <Box
      component={Paper}
      height={theme.spacing(60)}
      margin={5}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        component={"form"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={3}
        margin={2}
        
      >
        <Typography variant="h4">Edicão de registro</Typography>
        <TextField
        onChange={(e)=>setNome(e.target.value)}
        
          value={nome}
        
          variant="filled"
          sx={{ width: theme.spacing(40),'& input':{
            textAlign:"center"
          }}}
        />
        <TextField
        onChange={(e)=>setEmail(e.target.value)}
          
          value={email}
          variant="filled"
   
          sx={{ width: theme.spacing(40),'& input':{
            textAlign:"center"
          } }}
        />
        <TextField
        onChange={(e)=>setTelefone(Number(e.target.value))}
      
          value={telefone}
        
          variant="filled"
          sx={{ width: theme.spacing(30),'& input':{
            textAlign:"center"
          } }}
        />

        <Button onClick={save} variant="contained">
          Salvar
        </Button>
        <Button onClick={()=>navigate("/vendedores")}><Icon>keyboard_return</Icon></Button>
      </Box>
    </Box>
  );
};
