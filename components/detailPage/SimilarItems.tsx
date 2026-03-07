"use client";

import { useRef, useState } from "react";
import { PhoneCard } from "@/components/phoneCard/PhoneCard";
import { PhoneDetail } from "@/lib/api/types";
import styles from "./SimilarItems.module.css";

type ProductInfoProps = {
  product: PhoneDetail;
};

const SimilarItems = ({ product }: ProductInfoProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);

  const handleBarScroll = () => {
    if (!ref.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) return;

    setProgress(scrollLeft / maxScroll);
  };

  const updateScrollFromMouse = (clientX: number) => {
    if (!barRef.current || !ref.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max(x / rect.width, 0), 1);

    const maxScroll = ref.current.scrollWidth - ref.current.clientWidth;
    ref.current.scrollLeft = percentage * maxScroll;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    updateScrollFromMouse(e.clientX);

    const handleMove = (event: MouseEvent) => {
      updateScrollFromMouse(event.clientX);
    };

    const handleUp = () => {
      globalThis.removeEventListener("mousemove", handleMove);
      globalThis.removeEventListener("mouseup", handleUp);
    };

    globalThis.addEventListener("mousemove", handleMove);
    globalThis.addEventListener("mouseup", handleUp);
  };

  const fillWidth = 100 / product.similarProducts.length;
  const fillLeft = progress * (100 - fillWidth);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!ref.current) return;

    const scrollAmount = ref.current.clientWidth;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      ref.current.scrollLeft += scrollAmount;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      ref.current.scrollLeft -= scrollAmount;
    }
  };

  return (
    <section className={styles.similarItemsContainer}>
      <div className={styles.innerContainer}>
      <h2 className={styles.title}>SIMILAR PRODUCTS</h2>

      <div
        id="similar-products-list"
        className={styles.similarItems}
        ref={ref}
        onScroll={handleBarScroll}
      >
        {product.similarProducts.map((similar) => (
          <div key={similar.id}>
            <PhoneCard phone={similar} />
          </div>
        ))}
      </div>

      <div
        role="slider"
        aria-label="Scroll similar products"
        aria-controls="similar-products-list"
        aria-valuetext={`${Math.round(progress * 100)}% scrolled`}
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        className={styles.progressBar}
        ref={barRef}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
      >
        <div
          className={styles.progressFill}
          style={{
            width: `${fillWidth}%`,
            left: `${fillLeft}%`,
          }}
        />
      </div>
      </div>
    </section>
  );
};

export default SimilarItems;
