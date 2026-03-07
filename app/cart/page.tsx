import Cart from "@/components/cart/CartInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};


export default function CartPage() {
  return (
    <main className="cartPageContainer">
      <Cart />
    </main>
  );
}
