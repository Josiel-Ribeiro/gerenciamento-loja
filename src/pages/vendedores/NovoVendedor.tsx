import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TVendedores, VendedoresService } from "../../api/querysVendedores";
import { error } from "console";
import { useNavigate } from "react-router-dom";

type TForm = {
  nome: string;
  email: string;
  telefone: number;
};
export const NovoVendedor = () => {
  const theme = useTheme();
  const navigate = useNavigate()

  const [telefone, setTelefone] = useState("");
  const [open,setOpen] = useState(false)
  const [rows, setRows] = useState<TVendedores[]>([])
  const [message,setMessage] = useState("Novo Vendedor adicionado com sucesso")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>();

  const handleSetTlefone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = e.target.value.replace(/[^0-9.]/g, "");

    if (cleanedValue !== null && cleanedValue !== undefined) {
      const isValid = /^(\d*\.?\d{0,2}|\.\d{1,2})$/.test(cleanedValue);

      if (isValid) {
        setTelefone(cleanedValue.substring(0, 11));
      }
    }
  };

 const save = (dados:Omit<TVendedores,"id">)=>{
const validar = rows.find(item => item.nome.toLocaleLowerCase() === dados.nome.toLocaleLowerCase())
if(validar === undefined){

    VendedoresService.create(dados)
    .then((result)=>{
        if(result instanceof Error){
            alert("erro ao adicionar")
        }else{
         
 setOpen(true)

          
        }
    })
}else{
    setMessage("Ja existe um registro com este nome")
    
    setOpen(true)
}
 }


 const retorno = ()=>{
    setOpen(false)
    navigate("/vendedores")

 }

  useEffect(()=>{
    VendedoresService.getAll()
    .then((result)=>{
       if(result instanceof Error){
           alert("erro na busca de vendedores")
       }else{
          
         setRows(result)
       }
    })
     },[])
     
     
  

  return (
    <Box
      
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        component={"form"}
        onSubmit={handleSubmit((dados) => {
          save(dados);
        })}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Typography variant="h5">Novo Registro</Typography>
        <TextField
          label="Nome"
          size="small"
          error={errors.nome ? true : false}
          sx={{ width: theme.spacing(40) }}
          {...register("nome", { required: true })}
        />
        <TextField
          label="E-mail"
          size="small"
          error={errors.email ? true : false}
          sx={{ width: theme.spacing(40) }}
          {...register("email", { required: true })}
        />
        <TextField
          label="Numero de telefone"
          error={errors.telefone ? true : false}
          onInput={handleSetTlefone}
          value={telefone}
          size="small"
          variant="filled"
          sx={{ width: theme.spacing(28) }}
          {...register("telefone", { required: true, maxLength: 11 })}
        />
        <Button type="submit">Adicionar</Button>
      </Box>
      <Dialog open={open} onClose={()=>setOpen(false)}>
      <DialogTitle>
        {message}
      </DialogTitle>
      <DialogActions>
        <Button onClick={retorno}>Voltar</Button>
      </DialogActions>
      </Dialog>
    </Box>
  );
};
