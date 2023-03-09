import Image from "next/image.js";
import { useState } from "react";
import styles from "./ProductImages.module.scss";

export const ProductImages = ({ images }) => {
  const [active, setActive] = useState(images ? images[0] : "/noPhoto.png");
  return (
    <div className={styles.wrapper}>
      <div className={styles.ImagePicker}>
        {images
          ? images.map((el) => {
              return (
                <div
                  key={el}
                  className={`${styles.imageWrapper} ${
                    active === el ? styles.active : null
                  }`}
                  onClick={() => setActive(el)}
                >
                  <Image src={el} alt="img1" width={"auto"} height={"68"} />
                </div>
              );
            })
          : null}
      </div>
      <div className={styles.ImageFullScreenWrapper}>
        <Image src={active} alt={"img"} className={styles.Image} fill />
      </div>
    </div>
  );
};
