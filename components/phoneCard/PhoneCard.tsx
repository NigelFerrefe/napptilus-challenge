import Link from "next/link";
import Image from "next/image";
import { Phone } from "@/lib/api/types";
import styles from "./PhoneCard.module.css";

type PhoneCardProps = {
  readonly phone: Phone;
};

export const PhoneCard = ({ phone }: PhoneCardProps) => {
  return (
    <Link
      href={`/product/${phone.id}`}
      className={styles.cardContainer}
      aria-label={`view details for ${phone.name}`}
    >
      <div className={styles.imageContainer}>
        <Image
          src={phone.imageUrl}
          alt=""
          fill
          style={{ objectFit: "contain" }}
          sizes="(min-width: 1024px) 312px, (min-width: 768px) 345px, 329px"
          priority
        />
      </div>
      <div className={styles.infoContainer}>
        <p>{phone.brand.toUpperCase()}</p>
        <div className={styles.namePriceContainer}>
          <p>{phone.name.toUpperCase()}</p>
          <p>{phone.basePrice} EUR</p>
        </div>
      </div>
    </Link>
  );
};
