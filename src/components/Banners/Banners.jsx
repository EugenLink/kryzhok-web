import { Carousel } from "antd";
import Image from "next/image.js";
import Banner from "../../img/banner1.png";
import BannerPhone from "../../img/bannerPhone.png";
import styles from "./Banners.module.scss";
const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export const Banners = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div className={styles.bannerContainer}>
      <Carousel afterChange={onChange} autoplay={true}>
        <div>
          <div className={styles.contentStyle}>
            <Image
              src={Banner}
              alt="Банер"
              style={{ objectFit: "cover" }}
              className={styles.bannerDesc}
            />
            <Image
              src={BannerPhone}
              alt="Банер"
              style={{ objectFit: "cover" }}
              className={styles.bannerPhone}
            />
          </div>
        </div>
        <div>
          <div className={styles.contentStyle}>
            <Image
              src={Banner}
              alt="Банер"
              style={{ objectFit: "cover" }}
              className={styles.bannerDesc}
            />
            <Image
              src={BannerPhone}
              alt="Банер"
              style={{ objectFit: "cover" }}
              className={styles.bannerPhone}
            />
          </div>
        </div>
        <div>
          <div className={styles.contentStyle}>
            <Image
              src={Banner}
              alt="Банер"
              style={{ objectFit: "cover" }}
              className={styles.bannerDesc}
            />
            <Image
              src={BannerPhone}
              alt="Банер"
              style={{ objectFit: "cover" }}
              className={styles.bannerPhone}
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
};
