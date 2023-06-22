import Arrow from "@/img/RightArrowWhite.png";
import Image from "next/image.js";
import Link from "next/link.js";
import styles from "./ChapterCard.module.scss";
const ChapterCard = ({ src, text, link }) => {
  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.contentStyle}>
        <img src={src} alt="Банер" />
      </div>
      <Link href={link}>
        <div className={styles.bannerText}>
          <p>{text}</p>
          <Image src={Arrow} width={24} height={24} alt={"arrow"} />
        </div>
      </Link>
    </div>
  );
};

export default ChapterCard;
