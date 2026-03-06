import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider, CartContext } from "@/context/CartContext";
import { useContext } from "react";
import { CART_STORAGE_KEY } from "@/lib/constants";
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

const TestComponent = () => {
  const cart = useContext(CartContext);
  return (
    <button onClick={() => cart?.addToCart(mockItem)}>
      {cart?.totalItems}
    </button>
  );
};

describe("CartContext - localStorage persistence", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("persists cart to localStorage when item is added", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    await user.click(screen.getByRole("button"));

    const stored = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = JSON.parse(stored!);
    expect(parsed.items).toHaveLength(1);
    expect(parsed.items[0].id).toBe(mockItem.id);
  });

  it("loads cart from localStorage on mount", () => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({ items: [mockItem] }),
    );

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    const stored = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = JSON.parse(stored!);
    expect(parsed.items).toHaveLength(1);
    expect(parsed.items[0].id).toBe(mockItem.id);
  });
});
