import { CartItem } from "@/lib/cart/types";

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "CLEAR" };

export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "CLEAR":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
}
