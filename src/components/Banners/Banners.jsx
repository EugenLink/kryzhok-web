import { Carousel } from "antd";
import styles from "./Banners.module.scss";

export const Banners = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div className={styles.bannerContainer}>
      <Carousel afterChange={onChange} autoplay={true}>
        <div>
          <div
            className={styles.banner1}
            style={{
              backgroundImage: 'URL("/banners/1.png")',
            }}
          >
            <div className={styles.container}>
              <h1>
                Техника для вашего <br></br>дома и уюта
              </h1>
              <span>Стильный шоурум бытовой техники</span>
            </div>
          </div>
        </div>
        <div>
          <div
            className={styles.banner1}
            style={{
              backgroundImage: 'URL("/banners/2.png")',
            }}
          >
            <div className={styles.container}>
              <h1>
                Не плати за бренд,<br></br>плати за качество
              </h1>
            </div>
          </div>
        </div>
        <div>
          <div
            className={styles.banner1}
            style={{
              backgroundImage: 'URL("/banners/3.png")',
            }}
          >
            <div className={`${styles.container} ${styles.last}`}>
              <h1>
                Наша команда посетила все <br></br> заводы производителей лично!
              </h1>
              <span>
                Мы объездили много выставок, чтобы выбрать <br /> качество по
                доступной цене
              </span>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};
