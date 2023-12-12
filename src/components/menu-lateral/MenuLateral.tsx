import {
 
  Box,
  Button,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemButton,

  ListItemText,
  Paper,
 
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { blue } from "@mui/material/colors";

import { ReactNode, useState } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";

export const MenuLateral = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const [selectPaginaInicial, setSelectedPagianaInicial] = useState(false);
  const [selectEstoque, setSelectEstoque] = useState(false);
  const [selectNovaVenda, setSelectNovaVenda] = useState(false);
  const [selectAdmVendedores, setSlectAdmVendedores] = useState(false);
  const [selectAdm, setSelectAdm] = useState(false);
  const [selectComicionamento, setSelectComicionamento] = useState(false);

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
    setSelectAdm(false);
    setSlectAdmVendedores(false);
    setSelectNovaVenda(false);
    setSelectComicionamento(false)
  };
  const navigateEstoque = () => {
    navigate("/estoque");
    setSelectedPagianaInicial(false);
    setSelectEstoque(true);
    setSelectenumeroVendas(false);
    setSelectCadastro(false);
    setSelectAdm(false);
    setSlectAdmVendedores(false);
    setSelectNovaVenda(false);
    setSelectComicionamento(false)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  };

  const navigateVendedores = () => {
    navigate("/vendedores");
    setSelectedPagianaInicial(false);
    setSelectEstoque(false);
    setSelectenumeroVendas(false);
    setSelectCadastro(false);
    setSelectAdm(false);
    setSlectAdmVendedores(true);
    setSelectNovaVenda(false);
    setSelectComicionamento(false)
  };

  const navigateNovaVenda = () => {
    navigate("/nova-venda");
    setSelectNovaVenda(true);
    setSelectedPagianaInicial(false);
    setSelectEstoque(false);
    setSelectenumeroVendas(false);
    setSelectCadastro(false);
    setSelectAdm(false);
    setSlectAdmVendedores(false);
    setSelectComicionamento(false)
  };

  const navigateAdminidtrativo= () => {
    navigate("/adm");
    setSelectNovaVenda(false);
    setSelectedPagianaInicial(false);
    setSelectEstoque(false);
    setSelectenumeroVendas(false);
    setSelectCadastro(false);
    setSelectAdm(true);
    setSlectAdmVendedores(false);
    setSelectComicionamento(false)
  
  };

  const navigateComicionamento= () => {
    navigate("/comicionamento");
    setSelectNovaVenda(false);
    setSelectedPagianaInicial(false);
    setSelectEstoque(false);
    setSelectenumeroVendas(false);
    setSelectCadastro(false);
    setSelectAdm(false);
    setSlectAdmVendedores(false);
    setSelectComicionamento(true)
  
  };



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
            <ListItem sx={{ padding: 3 }}>
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
              <ListItemButton
                selected={selectNovaVenda}
                onClick={navigateNovaVenda}
              >
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
              <ListItemButton
                selected={selectAdmVendedores}
                onClick={navigateVendedores}
              >
                <Icon>groups</Icon>
                <ListItemText>
                  <Typography sx={{ marginLeft: 2 }}>Vendedores</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem sx={{ padding: 3 }}>
              <ListItemButton selected={selectAdm} onClick={navigateAdminidtrativo}>
                <Icon>attach_money</Icon>
                <ListItemText>
                  <Typography sx={{ marginLeft: 2 }}>Vendas</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem sx={{ padding: 3 }}>
              <ListItemButton selected={selectComicionamento} onClick={navigateComicionamento}>
                <Icon>monetization_on</Icon>
                <ListItemText>
                  <Typography sx={{ marginLeft: 2 }}>Comicionamento</Typography>
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
            sx={{color:blue[900],fontWeight:'bold'}}
          >
            Gerenciamento
          </Typography>
        </Box>

        {children}
      </Box>
    </>
  );
};
