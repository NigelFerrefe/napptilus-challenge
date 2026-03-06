"use client";
import { useCart } from "@/hooks/useCart";
import styles from "./CartInfo.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { useEffect, useState } from "react";

const Cart = () => {
  const { items, totalPrice, totalItems, removeFromCart, clearCart } =
    useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handlePayment = () => {
    alert("Thanks for your purchase");
    clearCart();
    router.push("/");
  };

  return (
    <div className={styles.cartWrapper}>
      <div className={styles.cartContainer}>
        <h2>CART ({totalItems})</h2>
        <div className={styles.cartProductContainer}>
          {items.map((item) => (
            <div key={item.id} className={styles.cartProductRow}>
              <div className={styles.cartImageContainer}>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(min-width: 768px) 262px, 160px"
                  priority
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
                  aria-label={`Delete ${item.name} from cart`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile layout */}
        <div className={styles.cartTotalMobile}>
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

      {/* Tablet+ layout */}
      <div className={styles.cartTotalTablet}>
        <div className={styles.cartContinueButton}>
          <Button variant="secondary" onClick={() => router.push("/")}>
            CONTINUE SHOPPING
          </Button>
        </div>
        <div className={styles.cartTotalPay}>
          {totalItems > 0 && (
            <div className={styles.cartTotal}>
              <p>TOTAL</p>
              <p>{totalPrice} EUR</p>
            </div>
          )}
          {totalItems > 0 && (
            <div className={styles.cartPayButton}>
              <Button variant="primary" onClick={handlePayment}>
                PAY
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Cart;