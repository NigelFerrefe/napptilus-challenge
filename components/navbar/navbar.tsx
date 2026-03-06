"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import styles from "./navbar.module.css";
import inactiveBagIcon from "@/assets/bag-icon-inactive.svg";
import activeBagIcon from "@/assets/bag-icon-active.svg";
import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const displayItems = mounted ? totalItems : 0;
  return (
    <nav className={styles.navbar}>
      <Link href="/" aria-label="Go home">
        <Image src={logo} alt="" width={74} height={24} priority />
      </Link>
      <Link href="/cart" className={styles.cartContainer} aria-label={`Cart, ${displayItems} items`}>
        <Image
          src={displayItems > 0 ? activeBagIcon : inactiveBagIcon}
          alt=""
          width={20}
          height={20}
        />
        <span
          className={styles.cartCount}
          aria-hidden="true"
        >
          {displayItems}
        </span>
      </Link>
    </nav>
  );
};
