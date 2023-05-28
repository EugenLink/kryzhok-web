import Link from "next/link.js";
import styles from "./PhotoCard.module.scss";
const PhotoCard = ({ src, text, link }) => {
  return (
    <Link href={link}>
      <div className={styles.fillImage}>
        <img src={src} alt="" />
      </div>
    </Link>
  );
};

export default PhotoCard;
