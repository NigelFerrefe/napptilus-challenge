"use client";

import { X } from "lucide-react";
import styles from "./inputSearch.module.css";

type InputSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
};

export const InputSearch = ({
  value,
  onChange,
  onClear,
  placeholder,
}: InputSearchProps) => {
    return (
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={styles.searchInput}
        />
        {value && (
          <button onClick={() => onClear()} className={styles.clearSearch} aria-label="Clear search">
            <X size={20} />
          </button>
        )}
      </div>
    )
};
