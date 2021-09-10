import React from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core/';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Home from './views/Home/Home';
import Appbar from './components/Appbar';
import "@fontsource/poppins";
import { CartProvider } from './contexts/CartContext';
import { CommonProvider } from './contexts/CommonContext';

const THEME = createMuiTheme({
  typography: {
    "fontFamily": `"Poppins", 'sans-sarif'`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  }
});

function App() {
  return (
    <>
      <CommonProvider>
        <CartProvider>
          <MuiThemeProvider theme={THEME}>
            <CssBaseline />
            <Appbar />
            <Home />
          </MuiThemeProvider>
        </CartProvider>
      </CommonProvider>
    </>
  );
}

export default App;
