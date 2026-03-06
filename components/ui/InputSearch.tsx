"use client";

import { X } from "lucide-react";
import styles from "./InputSearch.module.css";

type InputSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  ariaLabel?: string;
};

export const InputSearch = ({
  value,
  onChange,
  onClear,
  placeholder,
  ariaLabel,
}: InputSearchProps) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.searchInput}
        aria-label={ariaLabel}
      />
      {value && (
        <button
          onClick={() => onClear()}
          className={styles.clearSearch}
          aria-label="Clear search"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};
