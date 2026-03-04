import Link from "next/link";
import Image from "next/image";
import { Phone} from '@/lib/api/types';
import styles from "./phoneCard.module.css";

type PhoneCardProps = {
  readonly phone: Phone;
};

export const PhoneCard = ({ phone }: PhoneCardProps) => {
  return (
    <Link href={`/product/${phone.id}`} className={styles.cardContainer} aria-label={`view details for ${phone.name}`}>
     <div className={styles.imageContainer}>
  <Image
    src={phone.imageUrl}
    alt={phone.name}
    width={312}
    height={257}
    style={{ objectFit: "contain" }}
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


