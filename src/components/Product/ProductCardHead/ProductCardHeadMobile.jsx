import Star from "@/img/star.png";
import Image from "next/image.js";
import { useState } from "react";
import ReactItemsCarousel from "react-items-carousel";
import styles from "./ProductCardHead.module.scss";
export const ProductCardHeadMobile = ({ item }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  return (
    <div className={styles.productCardWrapper}>
      <div className={styles.mainText}>
        <p style={{ fontWeight: 500 }}>
          {item.name} <span style={{ fontWeight: 600 }}>{item.type}</span>
        </p>
        <div className={styles.flex}>
          <div className={styles.raiting}>
            <Image src={Star} alt={"stars"} width="16" height="15" />
            <Image src={Star} alt={"stars"} width="16" height="15" />
            <Image src={Star} alt={"stars"} width="16" height="15" />
            <Image src={Star} alt={"stars"} width="16" height="15" />
            <Image src={Star} alt={"stars"} width="16" height="15" />
          </div>
          <div className={styles.recenz}>{item.reviews?.length} Отзыва</div>
        </div>
      </div>
      <div>
        <div className={styles.caurusel}>
          <ReactItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={1}
            slidesToScroll={1}
          >
            {item.photos ? (
              item.photos.map((el) => {
                return (
                  <div className={styles.ImageFullScreenWrapper} key={el}>
                    <Image src={el} alt={"img"} className={styles.Image} fill />
                  </div>
                );
              })
            ) : (
              <div className={styles.ImageFullScreenWrapper}>
                <Image
                  src={"/noPhoto.png"}
                  alt={"img"}
                  className={styles.Image}
                  fill
                />
              </div>
            )}
          </ReactItemsCarousel>
          <div className={styles.caruselDots}>
            {item.photos
              ? item.photos.map((el, i) => {
                  return (
                    <span
                      className={`${styles.caruselDot} ${
                        i === activeItemIndex ? styles.activeDot : null
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
          {item.ozon === "Y" ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
            >
              OZON
            </a>
          ) : (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
            >
              OZON
            </a>
          )}
          {item.wb === "Y" ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
            >
              Wildberries
            </a>
          ) : (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
            >
              Wildberries
            </a>
          )}
          {item.ym === "Y" ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
            >
              Яндекс Маркет
            </a>
          ) : (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
            >
              Яндекс Маркет
            </a>
          )}
          {item.ali === "Y" ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
            >
              Aliexpress
            </a>
          ) : (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
            >
              Aliexpress
            </a>
          )}
          {item.am === "Y" ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
            >
              Астмаркет
            </a>
          ) : (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
            >
              Астмаркет
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
