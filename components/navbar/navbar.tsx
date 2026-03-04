"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import styles from "./navbar.module.css";
import inactiveBagIcon from "@/assets/bag-icon-inactive.svg";
import activeBagIcon from "@/assets/bag-icon-active.svg";
import { useCart } from "@/hooks/useCart";

export const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <div className={styles.navbar}>
      <Link href="/">
        <Image src={logo} alt="MBST home" width={74} height={24} />
      </Link>
      <Link href="/cart" className={styles.cartContainer}>
        <Image
          src={totalItems > 0 ? activeBagIcon : inactiveBagIcon}
          alt="" 
          width={20}
          height={20}
        />
        <span
          className={styles.cartCount}
          aria-label={`${totalItems} products in cart`}
        >
          {totalItems}
        </span>
      </Link>
    </div>
  );
};


