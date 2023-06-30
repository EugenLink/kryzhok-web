import getActiveItemIndexCarousel from "@/hooks/getActiveItemIndexCarousel.js";
import { num_word } from "@/hooks/num_words.js";
import Star from "@/img/star.png";
import Image from "next/image.js";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { useState } from "react";
import ReactItemsCarousel from "react-items-carousel";
import styles from "./ProductCardHead.module.scss";
export const ProductCardHeadMobile = ({ item, anchor }) => {
  const router = useRouter();
  console.log(item);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  return (
    <div className={styles.productCardWrapper}>
      <div className={styles.mainText}>
        <p style={{ fontWeight: 500 }}>
          {item.Name} <span style={{ fontWeight: 600 }}>{item.Model}</span>
        </p>
        <div className={styles.flex}>
          <div className={styles.raiting}>
            <Image src={Star} alt={"stars"} width="16" height="15" />
            <Image src={Star} alt={"stars"} width="16" height="15" />
            <Image src={Star} alt={"stars"} width="16" height="15" />
            <Image src={Star} alt={"stars"} width="16" height="15" />
            <Image src={Star} alt={"stars"} width="16" height="15" />
          </div>
          <Link href={`${router.asPath}#recenz`} onClick={anchor}>
            <div className={styles.recenz}>
              {item.recenz}{" "}
              {num_word(+item.recenz, ["Отзыв", "Отзыва", "Отзывов"])}
            </div>
          </Link>
        </div>
      </div>
      <div>
        <div className={styles.caurusel}>
          <ReactItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={getActiveItemIndexCarousel(
              activeItemIndex,
              item.images.split(";").length,
              1
            )}
            numberOfCards={1}
            slidesToScroll={1}
          >
            {item.images ? (
              item.images.split(";").map((el) => {
                return (
                  <div className={styles.ImageFullScreenWrapper} key={el}>
                    <img
                      src={`https://u1978287.isp.regruhosting.ru/product/photos/${item.id}/images/${el}`}
                      alt={"img"}
                      className={styles.Image}
                    />
                  </div>
                );
              })
            ) : (
              <div className={styles.ImageFullScreenWrapper}>
                <img
                  src={"/noPhoto.png"}
                  alt={"img"}
                  className={styles.Image}
                />
              </div>
            )}
          </ReactItemsCarousel>
          <div className={styles.caruselDots}>
            {item.images
              ? item.images.split(";").map((el, i) => {
                  return (
                    <span
                      className={`${styles.caruselDot} ${
                        i ===
                        getActiveItemIndexCarousel(
                          activeItemIndex,
                          item.images.split(";").length,
                          1
                        )
                          ? styles.activeDot
                          : null
                      }`}
                      key={el}
                    ></span>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <div>
        <p className={styles.cost}>
          {item.Cost}
          <span className={styles.rub}></span>
        </p>
        <p style={{ fontSize: 14, fontWeight: 400 }}>
          Купите в любимом интернет - магазине:
        </p>
        <div className={styles.magazines}>
          {item.OZON.length ? (
            <a target="_blank" rel="noopener noreferrer" href={item.OZON}>
              OZON
            </a>
          ) : null}
          {item.WB.length ? (
            <a target="_blank" rel="noopener noreferrer" href={item.WB}>
              Wildberries
            </a>
          ) : null}
          {item.YM.length ? (
            <a target="_blank" rel="noopener noreferrer" href={item.YM}>
              Яндекс Маркет
            </a>
          ) : null}

          {item.AM.length ? (
            <a target="_blank" rel="noopener noreferrer" href={item.AM}>
              Астмаркет
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};
