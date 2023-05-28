import dynamic from "next/dynamic";
import Link from "next/link.js";
import { useState } from "react";
import { Carousel } from "../Carousel/Carousel.jsx";
import styles from "./MainList.module.scss";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export const MainList = ({ newI = [], hit = [] }) => {
  const [selected, setSelected] = useState("hits");

  return (
    <div className="container">
      <nav className={styles.productType}>
        <p
          style={selected !== "hits" ? { color: "#969696" } : null}
          onClick={() => setSelected("hits")}
        >
          ХИТЫ
        </p>
        <p
          style={selected !== "new" ? { color: "#969696" } : null}
          onClick={() => setSelected("new")}
        >
          НОВИНКИ
        </p>
      </nav>
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      ></div>
      <Carousel items={selected === "hits" ? hit : newI} />
      <div className={styles.videoBlockWrapper}>
        <h2>Наша стильная техника</h2>
        <div className={styles.videoBlock}>
          <ReactPlayer
            url="mainvideo.mp4"
            controls={true}
            width={"100%"}
            height={"100%"}
            style={{ top: "0", left: "0", position: "absolute" }}
          />
        </div>
      </div>
      <div className={styles.rubrics}>
        {/* <Link href="/recipes">
          <div className={styles.rubricWrapper}>
            <div className={styles.fillImage}>
              <Image src={Kitchen} alt="Банер" fill />
            </div>
            <div
              className={styles.bannerText}
              style={{ background: " rgba(208, 12, 12, 0.89)" }}
            >
              <p>
                Готовим вместе с <br /> “ Texnika room ”
              </p>
            </div>
          </div>
        </Link> */}
        <Link href="/recipes">
          <div className={styles.rubricWrapper}>
            <div className={styles.fillImage}>
              <img src={"/banners/Link1.png"} alt="Банер" />
            </div>
          </div>
        </Link>
        <Link href="/catalog/kitchen?name=Кухня">
          <div className={styles.rubricWrapper}>
            <div className={styles.fillImage}>
              <img src={"/banners/Link2.png"} alt="Банер" />
            </div>
          </div>
        </Link>
        <Link href="/articles">
          <div className={styles.rubricWrapper}>
            <div className={styles.fillImage}>
              <img src={"/banners/Link3.png"} alt="Банер" />
            </div>
          </div>
        </Link>
        <Link href="/articles">
          <div className={styles.rubricWrapper}>
            <div className={styles.fillImage}>
              <img src={"/banners/Link4.png"} alt="Банер" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
