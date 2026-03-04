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
    <div className={styles.productContainer}>
      <Image src={mainImage} width={260} height={273} alt="phone" />
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
                >
                  <span>{option.capacity} GB</span>
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
                  className={styles.colorButton}
                  onMouseEnter={() => setHoveredColor(option.name)}
                  onMouseLeave={() => setHoveredColor(null)}
                  onClick={() => setSelectedColor(option)}
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
          <Button
            onClick={handleAddToCart}
            disabled={isDisabled}
          >
            ADD
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
