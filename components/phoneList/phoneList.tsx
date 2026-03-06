"use client";

import { useState, useEffect } from "react";
import { Phone } from "@/lib/api/types";
import { getPhones } from "@/lib/api/api";
import { SearchBar } from "../searchBar/searchBar";
import styles from "./phoneList.module.css";
import { useSearchParams } from "next/navigation";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_OFFSET } from "@/lib/constants";
import { PhoneCard } from "../phoneCard/phoneCard";

type PhoneListProps = {
  initialPhones: Phone[];
};

export const PhoneList = ({ initialPhones }: PhoneListProps) => {
  const [phonesList, setPhonesList] = useState<Phone[]>(initialPhones);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const limit = Number(searchParams.get("limit")) || DEFAULT_PAGE_LIMIT;
  const offset = Number(searchParams.get("offset")) || DEFAULT_PAGE_OFFSET;

  useEffect(() => {
    if (!query) return;

    const fetchPhones = async () => {
      setIsLoading(true);
      const results = await getPhones(query || undefined, limit, offset);
      setPhonesList(results);
      setIsLoading(false);
    };

    fetchPhones();
  }, [query, limit, offset]);

  const displayPhones = query ? phonesList : initialPhones;

  return (
    <>
      <SearchBar resultsCount={displayPhones.length} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.grid}>
          {displayPhones.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      )}
    </>
  );
};
