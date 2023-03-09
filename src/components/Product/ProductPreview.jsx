import Image from "next/image.js";
import Link from "next/link.js";
import styles from "./ProductPreview.module.scss";

export const ProductPreview = ({ name, cost, type, recenz, link = "" }) => {
  return (
    <Link href={link}>
      <div className={styles.productPreview}>
        <div className={styles.productImage}>
          <Image
            src={"/noPhoto.png"}
            alt={name}
            style={{ backgroundSize: "cover" }}
            fill
          />
        </div>
        <div className={styles.textBlock}>
          <p className={styles.costNormal}>
            {cost}
            <span className={styles.rub}></span>
          </p>

          <div className={styles.titles}>
            <p>{name}</p>
            <p style={{ fontWeight: 600 }}>{type}</p>
          </div>
          <p className={styles.recenz}>{recenz} Отзыва</p>
        </div>
      </div>
    </Link>
  );
};
