"use client";

import { useRef, useState } from "react";
import { PhoneCard } from "@/components/phoneCard/phoneCard";
import { PhoneDetail } from "@/lib/api/types";
import styles from "./SimilarItems.module.css";
type ProductInfoProps = {
  product: PhoneDetail;
};

const SimilarItems = ({ product }: ProductInfoProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleBarScroll = () => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const index = scrollLeft / maxScroll;
    setProgress(index);
  };
  return (
    <div className={styles.similarItemsContainer}>
      <h2 className={styles.title}>SIMILAR PRODUCTS</h2>

      <div className={styles.similarItems} ref={ref} onScroll={handleBarScroll}>
        {product.similarProducts.map((similar) => (
          <div key={similar.id}>
            <PhoneCard phone={similar} />
          </div>
        ))}
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default SimilarItems;
