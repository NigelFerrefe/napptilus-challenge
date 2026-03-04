"use client";

import { useState, useEffect } from "react";
import styles from "./searchBar.module.css";
import { InputSearch } from "../ui/inputSearch";
import { useRouter, useSearchParams } from "next/navigation";

type SearchBarProps = {
  readonly resultsCount: number;
};

export const SearchBar = ({ resultsCount }: SearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("query", query);
      } else {
        params.delete("query");
      }
      router.replace(`/?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.searchContainer} role="search">
      <InputSearch
        value={query}
        onChange={setQuery}
        onClear={() => setQuery("")}
        placeholder="Search..."
      />
      <p className={styles.results}>{resultsCount} RESULTS</p>
    </div>
  );
};