"use client";

import { useState, useEffect } from "react";
import { Phone } from "@/lib/api/types";
import { getPhones } from "@/lib/api/api";
import { SearchBar } from "../searchBar/searchBar";
import styles from "./phoneList.module.css";
import { useSearchParams } from "next/navigation";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_OFFSET } from "@/lib/constants";
import { PhoneCard } from "../phoneCard/phoneCard";

export const PhoneList = () => {
  const [phonesList, setPhonesList] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const limit = Number(searchParams.get("limit")) || DEFAULT_PAGE_LIMIT;
  const offset = Number(searchParams.get("offset")) || DEFAULT_PAGE_OFFSET;

  useEffect(() => {
    const fetchPhones = async () => {
      setIsLoading(true);
      const results = await getPhones(query || undefined, limit, offset);
      setPhonesList(results);
      setIsLoading(false);
    };

    fetchPhones();
  }, [query, limit, offset]);

  return (
    <>
      <SearchBar resultsCount={phonesList.length} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.grid}>
          {phonesList.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      )}
    </>
  );
};
