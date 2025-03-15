import ProductPreviewMini from "../Product/ProductPreviewMini.jsx";
import styles from "./MainList.module.scss";
import { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Carousel } from "antd";
import CustomArrow from "../Carousel/Carousel.jsx";
import axios from "axios";

export const MainList = ({ hit = [] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [count, setCount] = useState(3);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onChange = (currentSlide) => {};
  const [dots, setDots] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://u1978287.isp.regruhosting.ru/kryzhok/products/getCoords.php"
        );

        if (response.data.status === "success") {
          setDots(response.data.data);
        } else {
        }
      } catch (e) {}
    };
    fetchData();
    setCount(getWidth());
  }, []);
  const getWidth = () => {
    const screenWidth = window.innerWidth; // Ширина окна браузера

    const blockWidth = 300;

    // Вычисляем количество блоков, которые поместятся
    const numberOfBlocks = Math.floor(screenWidth / blockWidth);
    return numberOfBlocks;
  };
  console.log(count);
  return (
    <div className="container">
      <div className={styles.textCenter}>
        <p className={styles.h1}>Веселье и открытия для всей семьи!</p>

        <div className={styles.flex}>
          <div
            className={`${isHovered ? styles.shrunk : ""} ${styles.rectangle}`}
            style={{
              backgroundImage: 'URL("/banners/1about.jpeg")',
            }}
          >
            <p className={styles.textInAbout}>Текст</p>
          </div>
          <div
            className={`${isHovered ? styles.expanded : ""} ${styles.square}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundImage: 'URL("/banners/2about.jpg")',
            }}
          >
            {" "}
            <p className={styles.textInAbout}>Текст</p>
          </div>
        </div>
      </div>

      <div className={styles.textCenter}>
        <p className={styles.h1}>Приключения ждут вас и ваших детей!</p>
        <p className={styles.h2}>Текст</p>
      </div>
      <div>
        <Carousel
          afterChange={onChange}
          slidesToShow={count >= 3 ? 3 : count}
          arrows={true}
          prevArrow={<CustomArrow direction="prev" />}
          nextArrow={<CustomArrow direction="next" />}
        >
          {hit.map((el, i) => {
            return (
              <ProductPreviewMini
                id={el.id}
                key={i}
                title={el.name}
                chapter={el.category}
                text={el.description}
                photo={el.image_preview}
              />
            );
          })}
        </Carousel>
      </div>

      <div className={styles.textCenter}>
        <p className={styles.h1}>Текст Текст Текст</p>
        <p className={styles.h2}>Текст</p>
      </div>
      <div className={styles.yMapContainer}>
        <YMaps>
          <div>
            <Map
              width={`100%`}
              height={500}
              defaultState={{ center: [46.352695, 48.02875], zoom: 12 }}
            >
              {dots.map((el, i) => (
                <Placemark
                  key={i}
                  geometry={[el.coordX, el.coordY]} // Координаты маркера
                  options={{
                    iconLayout: "default#image", // Используем стандартный макет
                    iconImageHref:
                      "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Ссылка на иконку
                    iconImageSize: [30, 30], // Размер иконки
                    iconImageOffset: [-15, -15], // Смещение иконки
                  }}
                />
              ))}
            </Map>
          </div>
        </YMaps>
      </div>
    </div>
  );
};
