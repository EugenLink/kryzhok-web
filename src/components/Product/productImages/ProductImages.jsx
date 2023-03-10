import Image from "next/image.js";
import { useEffect, useState } from "react";
import styles from "./ProductImages.module.scss";

export const ProductImages = ({ images, id }) => {
  const [active, setActive] = useState("/noPhoto.png");

  useEffect(() => {
    if (images) {
      console.log(`/${images[0]}`);
      setActive(`/${images[0]}`);
    } else {
      console.log("NO-PHOTO");
      setActive("/noPhoto.png");
    }
  }, [images]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.ImagePicker}>
        {images
          ? images.map((el) => {
              return (
                <div
                  key={el}
                  className={`${styles.imageWrapper} ${
                    active === `/${el}` ? styles.active : null
                  }`}
                  onClick={() => setActive(`/${el}`)}
                >
                  <Image
                    src={`https://volga24bot.com/cgi-bin/product/photos/${id}/images/${el}`}
                    alt="img1"
                    className={styles.ImageSmall}
                    fill
                  />
                </div>
              );
            })
          : null}
      </div>
      <div className={styles.ImageFullScreenWrapper}>
        <Image
          src={
            images
              ? `https://volga24bot.com/cgi-bin/product/photos/${id}/images${active}`
              : active
          }
          alt={"img"}
          className={styles.Image}
          fill
        />
      </div>
    </div>
  );
};
