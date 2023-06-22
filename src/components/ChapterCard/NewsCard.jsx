import Link from "next/link.js";
import styles from "./NewsCard.module.scss";
const NewsCard = ({ src, text, date, link }) => {
  return (
    <Link href={link}>
      <div className={styles.wrapper}>
        <div className={styles.image}>
          <div className={styles.imageWrapper}>
            <img alt="Mountains" src={src} fill className={styles.customImg} />
          </div>
        </div>
        <div className={styles.text}>
          <p className={styles.date}>{date}</p>
          <p className={styles.title}>{text}</p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
