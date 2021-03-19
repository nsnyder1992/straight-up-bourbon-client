import { createContext } from "react";

const defaultCart = {
  products: [],
  subtotalCost: 0,
  numItems: 0,
};

export const CartContext = createContext(defaultCart);
