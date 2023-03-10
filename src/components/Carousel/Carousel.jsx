import getLink from "@/hooks/getLinkFromBase.js";
import useWindowSize from "@/hooks/getWindowSize.js";
import Image from "next/image.js";
import { useState } from "react";
import ItemsCarousel from "react-items-carousel";
import ArrowLeft from "../../img/ArrowLeft.png";
import ArrowRight from "../../img/ArrowRigth.png";
import { ProductPreview } from "../Product/ProductPreview.jsx";
import styles from "./Carousel.module.scss";

export const Carousel = ({ items }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const size = useWindowSize();
  const chevronWidth = 40;

  return (
    <div>
      <div className={styles.caurusel}>
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={
            Math.floor(size.width / 220) > 6 ? 6 : Math.floor(size.width / 220)
          }
          slidesToScroll={
            Math.floor(size.width / 220) > 6 ? 6 : Math.floor(size.width / 220)
          }
          leftChevron={
            <div className={styles.slideButton}>
              <Image src={ArrowLeft} alt={"arrowleft"} />
            </div>
          }
          rightChevron={
            <div className={styles.slideButton}>
              <Image src={ArrowRight} alt={"arrowleft"} />
            </div>
          }
          chevronWidth={chevronWidth}
        >
          {items.map((el) => (
            <ProductPreview
              key={el.id}
              cost={el.Cost}
              name={el.Name}
              type={el.Model}
              link={getLink(el.Chapter, el.PreChapter, el.id)}
              recenz={el.recenz}
              img={
                el.previewImg.length
                  ? `https://volga24bot.com/cgi-bin/product/photos/${el.id}/previewImg/${el.previewImg}`
                  : "/noPhoto.png"
              }
            />
          ))}
        </ItemsCarousel>
        <div className={styles.caruselDots}>
          {[...Array(items.length)].map((el, i) => {
            return (
              <span
                className={`${styles.caruselDot} ${
                  activeItemIndex === i ? styles.activeDot : null
                }`}
                key={i}
              ></span>
            );
          })}
        </div>
      </div>
      <div className={`${styles.caurusel} ${styles.mobile}`}>
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={
            Math.floor(size.width / 220) > 6 ? 6 : Math.floor(size.width / 180)
          }
          slidesToScroll={
            Math.floor(size.width / 220) > 6 ? 6 : Math.floor(size.width / 220)
          }
          leftChevron={
            <div className={styles.slideButton}>
              <Image src={ArrowLeft} alt={"arrowleft"} />
            </div>
          }
          rightChevron={
            <div className={styles.slideButton}>
              <Image src={ArrowRight} alt={"arrowleft"} />
            </div>
          }
          chevronWidth={chevronWidth}
        >
          {items.map((el) => (
            <ProductPreview
              key={el.id}
              cost={el.Cost}
              name={el.Name}
              recenz={el.recenz}
              type={el.Model}
              link={getLink(el.Chapter, el.PreChapter, el.id)}
              img={
                el.previewImg.length
                  ? `https://volga24bot.com/cgi-bin/product/photos/${el.id}/previewImg/${el.previewImg}`
                  : "/noPhoto.png"
              }
            />
          ))}
        </ItemsCarousel>
        <div className={styles.caruselDots}>
          {[...Array(items.length)].map((el, i) => {
            return (
              <span
                className={`${styles.caruselDot} ${
                  activeItemIndex === i ? styles.activeDot : null
                }`}
                key={i}
              ></span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
