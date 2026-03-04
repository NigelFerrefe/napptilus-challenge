"use client";

import { PhoneDetail } from "@/lib/api/types";
import styles from "./SpecsInfo.module.css";

type ProductInfoProps = {
  product: PhoneDetail;
};

const SpecsInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className={styles.specsContainer}>
      <h2 className={styles.title}>SPECIFICATIONS</h2>
      <div className={styles.SpecsRow}>
        <p>BRAND</p>
        <p>{product.brand}</p>
      </div>
      <div className={styles.SpecsRow}>
        <p>NAME</p>
        <p>{product.name}</p>
      </div>
      <div className={styles.SpecsRow}>
        <p>DESCRIPTION</p>
        <p>{product.description}</p>
      </div>
      <div className={styles.SpecsRow}>
        <p>SCREEN</p>
        <p>{product.specs.screen}</p>
      </div>
      <div className={styles.SpecsRow}>
        <p>RESOLUTION</p>
        <p>{product.specs.resolution}</p>
      </div>
      <div className={styles.SpecsRow}>
        <p>PROCESSOR</p>
        <p>{product.specs.processor}</p>
      </div>
      <div className={styles.SpecsRow}>
        <p>MAIN CAMERA</p>
        <p>{product.specs.mainCamera}</p>
      </div>
      <div className={styles.SpecsRow}>
        <p>SELFIE CAMERA</p>
        <p>{product.specs.selfieCamera}</p>
      </div>
      <div className={styles.SpecsRow}>
        <p>BATTERY</p>
        <p>{product.specs.battery}</p>
      </div>
      <div className={styles.SpecsRow}>
        <p>OS</p>
        <p>{product.specs.os}</p>
      </div>
      <div className={styles.SpecsRow}>
        <p>SCREEN REFRESH RATE</p>
        <p>{product.specs.screenRefreshRate}</p>
      </div>

    </div>
  );
};

export default SpecsInfo;
