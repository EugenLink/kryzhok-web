import Image from "next/image.js";
import Link from "next/link.js";
import Clock from "../../img/clock.png";
import Like from "../../img/like.png";
import Views from "../../img/view.png";
import styles from "./ChapterCardRecipe.module.scss";
const ChapterCardRecipe = ({
  src,
  text,
  link,
  time = "40 минут",
  views = "120",
  likes = "122",
}) => {
  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.contentStyle}>
        <img src={src} alt="Банер" />
      </div>
      <Link href={link}>
        <div className={styles.bannerText}>
          <p>{text}</p>
          <div className={styles.underText}>
            <div className={styles.flex}>
              <div className={`${styles.flex} ${styles.textWithIcon}`}>
                <Image src={Clock} alt={"like"} width={14} height={14} />
                <p>{time}</p>
              </div>
              <div className={`${styles.flex} ${styles.textWithIcon}`}>
                <Image src={Views} alt={"like"} width={14} height={14} />
                <p>{views}</p>
              </div>
            </div>
            <div className={`${styles.flex} ${styles.textWithIcon}`}>
              <Image src={Like} alt={"like"} width={14} height={14} />
              <p>{likes}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChapterCardRecipe;
