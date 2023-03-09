import moment from "moment";
import Image from "next/image.js";
import Link from "next/link.js";
import styles from "./ArticleCard.module.scss";
const ArticleCard = ({
  src,
  previewText = "",
  title = "",
  link = "",
  date = "",
  author = "",
}) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>
        <Link href={link}>{title}</Link>
      </p>
      <div className={styles.imageContainer}>
        <Image src={src} alt={"article"} fill className={styles.image} />
      </div>
      <p className={styles.previewText}>
        {previewText} <Link href={link}>Читать далее...</Link>
      </p>
      <div className={styles.bottomBlock}>
        <p style={{ fontWeight: 500 }}>Автор: {author}</p>
        <p>{moment(date).format("DD.MM.YYYY HH:mm")}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
