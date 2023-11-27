import {  Box, ThemeProvider } from '@mui/material';

import { DarkTheme } from './themes/DarkTheme';
import { MenuLateral} from './components/menu-lateral/MenuLateral';
import { AppRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';



export const App = () => {
  
  return (
    
<ThemeProvider theme={DarkTheme}>
<Box sx={{width:"100vw",height:"100vh",background:DarkTheme.palette.background.default}}>
    <BrowserRouter>
  <MenuLateral>
  <AppRoutes/>
    </MenuLateral>
    
    </BrowserRouter>  
</Box>
</ThemeProvider>
  );
}

export default App;
