import {
  Accordion,
  AccordionActions,
  AccordionSummary,
  Box,
  Button,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TableFooter,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { ReactNode, useState } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";

export const MenuLateral = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const [selectPaginaInicial, setSelectedPagianaInicial] = useState(false);
  const [selectEstoque, setSelectEstoque] = useState(false);
const [selectAdmVendedores,setSlectAdmVendedores] = useState(false)
const [selectAdmComicionamento,setSlectAdmComicionamento] = useState(false)


  const [selectNumeroVendas, setSelectenumeroVendas] = useState(false);
  const [selectCadastro, setSelectCadastro] = useState(false);

  const theme = useTheme();
  const mdDawn = useMediaQuery(theme.breakpoints.down("md"));

  const navigatePaginainicial = () => {
    navigate("/pagina-inicial");
    setSelectedPagianaInicial(true);
    setSelectEstoque(false);
    setSelectenumeroVendas(false);
    setSelectCadastro(false);
    setSlectAdmComicionamento(false)
    setSlectAdmVendedores(false)
  };
  const navigateEstoque = () => {
    navigate("/estoque");
    setSelectedPagianaInicial(false);
    setSelectEstoque(true);
    setSelectenumeroVendas(false);
    setSelectCadastro(false);
    setSlectAdmComicionamento(false)
    setSlectAdmVendedores(false)
  };


  const navigateVendedores = ()=>{
    navigate('/vendedores')
    setSelectedPagianaInicial(false);
    setSelectEstoque(false);
    setSelectenumeroVendas(false);
    setSelectCadastro(false);
    setSlectAdmComicionamento(false)
    setSlectAdmVendedores(true)
  }
 

  return (
    <>
      <Drawer
        open={open}
        onClose={() => setopen(false)}
        variant={mdDawn ? "temporary" : "permanent"}
    
      >
        <Box
          width={theme.spacing(30)}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          bgcolor={mdDawn ? theme.palette.background.default : undefined}
        >
          <List>
            <ListItem sx={{ padding: 3, }}>
              <ListItemButton
                selected={selectPaginaInicial}
                onClick={navigatePaginainicial}
              >
                <Icon>home</Icon>
                <ListItemText>
                  <Typography sx={{ marginLeft: 2 }}>Pagina Inicial</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem sx={{ padding: 3 }}>
              <ListItemButton>
                <Icon>add_circle_outline</Icon>
                <ListItemText>
                  <Typography sx={{ marginLeft: 2 }}>Nova venda</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem sx={{ padding: 3 }}>
              <ListItemButton
                selected={selectEstoque}
                onClick={navigateEstoque}
              >
                <Icon>inventory_2</Icon>
                <ListItemText>
                  <Typography sx={{ marginLeft: 2 }}>Estoque</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem sx={{ padding: 3 }}>
              <ListItemButton selected={selectAdmVendedores} onClick={navigateVendedores}>
                <Icon>attach_money</Icon>
                <ListItemText>
                  <Typography sx={{ marginLeft: 2 }}>
                    Vendedores
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>

           
           

            <ListItem sx={{ padding: 3 }}>
              <ListItemButton>
                <Icon>attach_money</Icon>
                <ListItemText>
                  <Typography sx={{ marginLeft: 2 }}>
                    Comicionamento
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>

           

          </List>
        </Box>
      </Drawer>

      <Box
        height={"100vh"}
        marginLeft={mdDawn ? "0" : theme.spacing(30)}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box component={Paper} margin={1} bgcolor={theme.palette.primary.main}>
          {mdDawn && (
            <Button onClick={() => setopen(!open)}>
              <Icon
                sx={{
                  color: theme.palette.background.default,
                }}
              >
                menu
              </Icon>
            </Button>
          )}
          <Typography
            variant="h5"
            textAlign={"center"}
            marginBottom={mdDawn ? 2 : undefined}
            padding={!mdDawn ? 2 : undefined}
          >
            Gerenciamento
          </Typography>
        </Box>

    
       {children}
      
      </Box>
    </>
  );
};
