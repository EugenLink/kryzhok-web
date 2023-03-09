import Image from "next/image.js";
import Link from "next/link.js";
import styles from "./Brends.module.scss";
export const Brends = ({ src, text, title, link = "/brends" }) => {
  return (
    <Link href={link}>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <Image src={src} alt={"logo"} width={180} height={50} />
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
