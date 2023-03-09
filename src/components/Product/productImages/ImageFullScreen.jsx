import Close from "@/img/close.png";
import Blender1 from "@/img/products/blender1/blender1.png";
import Blender2 from "@/img/products/blender1/blender2.png";
import Blender3 from "@/img/products/blender1/blender3.png";
import Image from "next/image.js";
import { useState } from "react";
import styles from "./ProductImages.module.scss";
export const ImageFullScreen = () => {
  const [active, setActive] = useState(Blender1);
  return (
    <div className={styles.fullImageWrapper}>
      <Image src={Close} alt="close" className={styles.closeButton} />
      <div className={styles.fullImageLeft}>
        <div className={styles.ImagePicker}>
          <div
            className={`${styles.imageWrapper} ${
              active === Blender2 ? styles.active : null
            }`}
            onClick={() => setActive(Blender2)}
          >
            <Image src={Blender2} alt="img1" width={"auto"} height={"68"} />
          </div>
          <div
            className={`${styles.imageWrapper} ${
              active === Blender1 ? styles.active : null
            }`}
            onClick={() => setActive(Blender1)}
          >
            <Image src={Blender1} alt="img1" width={"auto"} height={"68"} />
          </div>
          <div
            className={`${styles.imageWrapper} ${
              active === Blender3 ? styles.active : null
            }`}
            onClick={() => setActive(Blender3)}
          >
            <Image src={Blender3} alt="img1" width={"auto"} height={"68"} />
          </div>
        </div>
      </div>
      <div className={styles.zoomWrapper}>
        <div>
          <Image src={active} alt={"img"} className={styles.Image} fill />
        </div>
      </div>
    </div>
  );
};
