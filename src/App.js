import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { CartProvider } from "./context/cartContext";

import AppBar from "./components/AppBar";
import ProductsScreen from "./screens/ProductsScreen";
import { Route, Routes } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import { theme } from "./theme";

function App() {
  return (
    <Container maxWidth="lg">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartProvider>
          <AppBar />
          <Box sx={{ padding: 4 }}>
            <Routes>
              <Route path="/" element={<ProductsScreen />} />
              <Route path="/cart" element={<CartScreen />} />
            </Routes>
          </Box>
        </CartProvider>
      </ThemeProvider>
    </Container>
  );
}

export default App;
