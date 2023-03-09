import dynamic from "next/dynamic";
import Image from "next/image.js";
import Link from "next/link.js";
import { useState } from "react";
import Banner2 from "../../img/banner2.png";
import Banner3 from "../../img/banner3.png";
import Banner4 from "../../img/banner4.png";
import Kitchen from "../../img/kitching.png";
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
            url="https://www.youtube.com/watch?v=gmyIXR7pd0c"
            controls={false}
            width={"100%"}
            height={"100%"}
            style={{ top: "0", left: "0", position: "absolute" }}
          />
        </div>
      </div>
      <div className={styles.rubrics}>
        <Link href="/recipes">
          <div className={styles.backgroundWrapper}>
            <div className={styles.contentStyle}>
              <Image
                src={Kitchen}
                alt="Банер"
                style={{ backgroundSize: "cover" }}
              />
            </div>
            <div
              className={styles.bannerText}
              style={{ background: " rgba(208, 12, 12, 0.89)" }}
            >
              <p>Готовим вместе с “ Texnika room ”</p>
            </div>
          </div>
        </Link>
        <Link href="/catalog/kitchen?name=Кухня">
          <div className={styles.backgroundWrapper}>
            <div className={styles.contentStyle}>
              <Image
                src={Banner2}
                alt="Банер"
                style={{ backgroundSize: "cover" }}
              />
            </div>
            <div
              className={styles.bannerText}
              style={{ background: " rgba(190, 152, 108, 0.9)" }}
            >
              <p>Все для вашей кухни</p>
            </div>
          </div>
        </Link>
        <Link href="/articles">
          <div className={styles.backgroundWrapper}>
            <div className={styles.contentStyle}>
              <Image
                src={Banner3}
                alt="Банер"
                style={{ backgroundSize: "cover" }}
              />
            </div>
            <div
              className={styles.bannerText}
              style={{ background: "rgba(122, 55, 231, 0.9)" }}
            >
              <p>Полезные статьи</p>
            </div>
          </div>
        </Link>
        <div className={styles.backgroundWrapper}>
          <div className={styles.contentStyle}>
            <Image
              src={Banner4}
              alt="Банер"
              style={{ backgroundSize: "cover" }}
            />
          </div>
          <div
            className={styles.bannerText}
            style={{ background: "rgba(118, 209, 127, 0.9)" }}
          >
            <p>Готовые решения для вашего дома</p>
          </div>
        </div>
      </div>
    </div>
  );
};
