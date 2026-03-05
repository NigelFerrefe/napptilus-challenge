"use client";
import { useCart } from "@/hooks/useCart";
import styles from "./CartInfo.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

const Cart = () => {
  const {
    items,
    totalPrice,
    addToCart,
    totalItems,
    removeFromCart,
    clearCart,
  } = useCart();
  const router = useRouter();

  const handlePayment = () => {
    alert("Thanks for your purchase");
    clearCart();
    router.push("/");
  };

  return (
    <div className={styles.cartContainer}>
      <h2>CART ({totalItems})</h2>
      <div className={styles.cartProductContainer}>
        {items.map((item) => (
          <div key={item.id} className={styles.cartProductRow}>
            <div className={styles.cartImageContainer}>
              <Image
                src={item.imageUrl}
                fill
                alt={item.name}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className={styles.cartInfoDeleteContainer}>
              <div className={styles.cartProductInfoContainer}>
                <div className={styles.cartSelectedPhone}>
                  <p>{item.name.toUpperCase()}</p>
                  <div className={styles.cartSelectedOption}>
                    <p>{item.capacity}</p>
                    <span>|</span>
                    <p>{item.colorName}</p>
                  </div>
                </div>
                <div>
                  <p>{item.price} EUR</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className={styles.deleteProduct}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cartTotalContainer}>
        {totalItems > 0 && (
          <div className={styles.cartTotal}>
            <p>TOTAL</p>
            <p>{totalPrice} EUR</p>
          </div>
        )}
        <div className={styles.cartButtons}>
          <Button variant="secondary" onClick={() => router.push("/")}>
            CONTINUE SHOPPING
          </Button>
          {totalItems > 0 && (
            <Button variant="primary" onClick={handlePayment}>
              PAY
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Cart;
