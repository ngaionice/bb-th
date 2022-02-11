import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { cartReducer, initializeCart } from "../reducers/cartReducer";

const CartContext = createContext();

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Cart context must be used inside a CartProvider.");
  }
  return context;
}

function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initializeCart());
  const value = useMemo(() => [cart, dispatch], [cart, dispatch]);

  useEffect(() => {
    localStorage.setItem("bb-cart", JSON.stringify(cart));
  }, [cart]);

  return <CartContext.Provider value={value} {...props} />;
}

export { useCart, CartProvider };
