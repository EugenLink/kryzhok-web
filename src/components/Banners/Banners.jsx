import { Carousel, Radio } from "antd";
import styles from "./Banners.module.scss";

export const Banners = () => {
  const onChange = (currentSlide) => {};
  return (
    <div className={styles.bannerContainer}>
      <Carousel afterChange={onChange} autoplay={true}>
        <div>
          <div
            className={styles.banner1}
            style={{
              backgroundImage: 'URL("/banners/banner1.png")',
            }}
          >
            <div className={styles.container}>
              <h1>
                Заголовок банера <br></br>
              </h1>
              <span>Текст банера</span>
            </div>
          </div>
        </div>
        <div>
          <div
            className={styles.banner1}
            style={{
              backgroundImage: 'URL("/banners/banner2.png")',
            }}
          >
            <div className={styles.container}>
              <h1>
                Заголовок банера <br></br>
              </h1>
              <span>Текст банера</span>
            </div>
          </div>
        </div>
        <div>
          <div
            className={styles.banner1}
            style={{
              backgroundImage: 'URL("/banners/banner3.png")',
            }}
          >
            <div className={`${styles.container} ${styles.last}`}>
              <h1>
                Заголовок банера <br></br>
              </h1>
              <span>Текст банера</span>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};
