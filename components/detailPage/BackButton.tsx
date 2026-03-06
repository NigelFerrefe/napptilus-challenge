"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import styles from "./BackButton.module.css";

const BackButton = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className={styles.backButtonContainer}>
      <button onClick={handleBack} className={styles.backButton}>
        <ArrowLeftIcon size={20} />
        <span className="textButton">BACK</span>
      </button>
    </div>
  );
};

export default BackButton;
