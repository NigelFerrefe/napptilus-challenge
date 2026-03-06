"use client";

import { PhoneDetail } from "@/lib/api/types";
import styles from "./SpecsInfo.module.css";

type ProductInfoProps = {
  product: PhoneDetail;
};

const SpecsInfo = ({ product }: ProductInfoProps) => {
  return (
    <section className={styles.specsContainer}>
      <h2 className={styles.title}>SPECIFICATIONS</h2>
      <dl>
        <div className={styles.SpecsRow}>
          <dt>BRAND</dt>
          <dd>{product.brand}</dd>
        </div>
        <div className={styles.SpecsRow}>
          <dt>NAME</dt>
          <dd>{product.name}</dd>
        </div>
        <div className={styles.SpecsRow}>
          <dt>DESCRIPTION</dt>
          <dd>{product.description}</dd>
        </div>
        <div className={styles.SpecsRow}>
          <dt>SCREEN</dt>
          <dd>{product.specs.screen}</dd>
        </div>
        <div className={styles.SpecsRow}>
          <dt>RESOLUTION</dt>
          <dd>{product.specs.resolution}</dd>
        </div>
        <div className={styles.SpecsRow}>
          <dt>PROCESSOR</dt>
          <dd>{product.specs.processor}</dd>
        </div>
        <div className={styles.SpecsRow}>
          <dt>MAIN CAMERA</dt>
          <dd>{product.specs.mainCamera}</dd>
        </div>
        <div className={styles.SpecsRow}>
          <dt>SELFIE CAMERA</dt>
          <dd>{product.specs.selfieCamera}</dd>
        </div>
        <div className={styles.SpecsRow}>
          <dt>BATTERY</dt>
          <dd>{product.specs.battery}</dd>
        </div>
        <div className={styles.SpecsRow}>
          <dt>OS</dt>
          <dd>{product.specs.os}</dd>
        </div>
        <div className={styles.SpecsRow}>
          <dt>SCREEN REFRESH RATE</dt>
          <dd>{product.specs.screenRefreshRate}</dd>
        </div>
      </dl>
    </section>
  );
};

export default SpecsInfo;
