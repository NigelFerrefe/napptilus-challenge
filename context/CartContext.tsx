"use client";

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { cartReducer, type CartState } from "./cartReducer";
import { CartItem } from "../lib/cart/types";
import { CART_STORAGE_KEY } from "@/lib/constants";

type CartContextType = {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

type CartProviderProps = {
  readonly children: React.ReactNode;
};

const initialState: CartState = { items: [] };

export const CartContext = createContext<CartContextType | null>(null);

const loadCartFromStorage = (): CartState => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialState;
  } catch {
    return initialState;
  }
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
    loadCartFromStorage,
  );

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const totalPrice = state.items.reduce((acc, item) => acc + item.price, 0);
  const totalItems = state.items.length;
  const addToCart = useCallback(
    (item: CartItem) => dispatch({ type: "ADD", payload: item }),
    [],
  );

  const removeFromCart = useCallback(
    (id: string) => dispatch({ type: "REMOVE", payload: { id } }),
    [],
  );

  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const contextValue = useMemo(
    () => ({
      items: state.items,
      totalPrice,
      totalItems,
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [state.items, totalPrice, totalItems, addToCart, removeFromCart, clearCart],
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
