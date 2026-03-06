import { cartReducer, CartState } from "@/context/cartReducer"; 
import { CartItem } from "@/lib/cart/types";


const mockItem: CartItem = {
  id: "1",
  productId: "SMG-S24U",
  name: "Galaxy S24 Ultra",
  price: 1229,
  colorName: "Titanium Violet",
  capacity: "256 GB",
  imageUrl: "https://example.com/image.webp",
};


const addItem = (state: CartState, item: CartItem) =>
  cartReducer(state, { type: "ADD", payload: item });

const removeItem = (state: CartState, id: string) =>
  cartReducer(state, { type: "REMOVE", payload: { id } });


const initialState: CartState = { items: [] };

describe("cartReducer", () => {
  it("adds an item to the cart", () => {
    const newState = addItem(initialState, mockItem);

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toMatchObject({
      id: mockItem.id,
      name: mockItem.name,
      price: mockItem.price,
    });
  });

  it("removes an item from the cart", () => {
    const stateWithItem: CartState = { items: [mockItem] };
    
    const newState = removeItem(stateWithItem, mockItem.id);

    expect(newState.items).toHaveLength(0);
  });

  it("clears all items from the cart", () => {
    const item2: CartItem = { ...mockItem, id: "2", price: 500 };
    const stateWithItems: CartState = { items: [mockItem, item2] };
    expect(stateWithItems.items).toHaveLength(2);
    const newState = cartReducer(stateWithItems, { type: "CLEAR" });

    expect(newState.items).toHaveLength(0);
  });

  it("calculates total price correctly", () => {
    const item2: CartItem = { ...mockItem, id: "2", price: 500 };
    const state: CartState = { items: [mockItem, item2] };

    const total = state.items.reduce((acc, item) => acc + item.price, 0);

      expect(total).toBe(mockItem.price + item2.price);
  });
});