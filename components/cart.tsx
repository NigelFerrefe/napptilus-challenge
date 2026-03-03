'use client';
import { useCart } from "@/hooks/useCart";
import type { PhoneDetail } from "@/lib/api/types";

type CartProps = {
  phone: PhoneDetail;
};

export default function Cart({ phone }: CartProps) {
  const { items, totalPrice, addToCart, totalItems, removeFromCart, clearCart } = useCart();

  const handleAddToCart = () => {
  const item = {
    id: crypto.randomUUID(),
    productId: phone.id,
    name: phone.name,
    colorName: phone.colorOptions[1].name,
    imageUrl: phone.colorOptions[1].imageUrl,
    capacity: phone.storageOptions[1].capacity,
    price: phone.storageOptions[1].price,
  };
  addToCart(item);
};


  return (
    <div>
      <h1>Cart</h1>
      {items.map(item => (  
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.id}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice}</p>
      <button onClick={clearCart}>Clear Cart</button>
      <br />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}