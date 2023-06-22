import Link from "next/link.js";
import styles from "./Brends.module.scss";
export const Brends = ({ src, text, title, link = "/brends" }) => {
  return (
    <Link href={link}>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <img src={src} alt={"logo"} />
        </div>

        <div className={styles.text}>
          <p className={styles.title}>{title}</p>
          <p>
            <span>{title} - </span>
            {text}
          </p>
        </div>
      </div>
    </Link>
  );
};
