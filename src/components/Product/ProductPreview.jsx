import { num_word } from "@/hooks/num_words.js";
import Image from "next/image.js";
import Link from "next/link.js";
import styles from "./ProductPreview.module.scss";

export const ProductPreview = ({
  name,
  cost,
  type,
  recenz,
  link = "",
  img,
}) => {
  return (
    <Link href={link}>
      <div className={styles.productPreview}>
        <div className={styles.productImage}>
          <Image src={img} alt={name} fill />
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
          <p className={styles.recenz}>
            {recenz} {num_word(+recenz, ["Отзыв", "Отзыва", "Отзывов"])}
          </p>
        </div>
      </div>
    </Link>
  );
};
