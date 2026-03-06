"use client";

import { PhoneDetail } from "@/lib/api/types";
import Image from "next/image";
import styles from "./ProductInfo.module.css";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import Button from "../ui/Button";

type ProductInfoProps = {
  product: PhoneDetail;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { addToCart } = useCart();
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<
    (typeof product.colorOptions)[0] | null
  >(null);
  const [selectedStorage, setSelectedStorage] = useState<
    (typeof product.storageOptions)[0] | null
  >(null);
  const id = product.id;

  const defaultPrice = Math.min(
    product.basePrice,
    ...product.storageOptions.map((option) => option.price),
  );
  const displayPrice = selectedStorage?.price ?? defaultPrice;
  const mainImage = selectedColor?.imageUrl ?? product.colorOptions[0].imageUrl;
  const isDisabled = !selectedColor || !selectedStorage;
  const handleAddToCart = () => {
    if (selectedColor && selectedStorage) {
      addToCart({
        id: crypto.randomUUID(),
        productId: id,
        name: product.name,
        price: selectedStorage.price,
        colorName: selectedColor.name,
        capacity: selectedStorage.capacity,
        imageUrl: selectedColor.imageUrl,
      });
    }
  };

  return (
    <section className={styles.productContainer}>
      <div className={styles.productImageContainer}>
        <Image
          src={mainImage}
          fill
          alt={product.name}
          style={{ objectFit: "contain" }}
          sizes="(min-width: 1024px) 510px, (min-width: 768px) 337px, 260px"
        />
      </div>
      <div className={styles.productInfoContainer}>
        <div className={styles.productTitlePrice}>
          <p className={styles.tittle}>{product.name.toUpperCase()}</p>
          <p className={styles.price}>
            {selectedStorage
              ? `${displayPrice} EUR`
              : `From ${displayPrice} EUR`}
          </p>
        </div>
        <div className={styles.selectorsContainer}>
          <div className={styles.storageContainer}>
            <p>STORAGE ¿HOW MUCH SPACE DO YOU NEED?</p>
            <div className={styles.storageOption}>
              {product.storageOptions.map((option) => (
                <button
                  key={`${id}-${option.capacity}`}
                  onClick={() => setSelectedStorage(option)}
                  className={
                    selectedStorage?.capacity === option.capacity
                      ? styles.selectedStorage
                      : ""
                  }
                  aria-label={`Storage ${option.capacity}`}
                  aria-pressed={selectedStorage?.capacity === option.capacity}
                >
                  <span>{option.capacity}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.colorsContainer}>
            <p>COLOR. PICK YOUR FAVORITE</p>

            <div className={styles.colorsOptions}>
              {product.colorOptions.map((option) => (
                <button
                  key={`${id}-${option.name}`}
                  className={`${styles.colorButton} ${selectedColor?.name === option.name ? styles.selectedColor : ""}`}
                  onMouseEnter={() => setHoveredColor(option.name)}
                  onMouseLeave={() => setHoveredColor(null)}
                  onClick={() => setSelectedColor(option)}
                  aria-label={`Color ${option.name}`}
                  aria-pressed={selectedColor?.name === option.name}
                >
                  <div
                    className={styles.colorSquare}
                    style={{ backgroundColor: option.hexCode }}
                  />
                </button>
              ))}
            </div>

            <span className={styles.colorLabel}>
              {hoveredColor ?? selectedColor?.name}
            </span>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={handleAddToCart} disabled={isDisabled}>
            ADD
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
