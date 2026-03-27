import ProductPreviewMini from "../Product/ProductPreviewMini.jsx";
import styles from "./MainList.module.scss";
import { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Carousel } from "antd";
import CustomArrow from "../Carousel/Carousel.jsx";
import axios from "axios";
import ReactDOMServer from "react-dom/server";
import Link from "next/link.js";

const BalloonContent = ({ el }) => (
  <div style={{
    fontFamily: "Arial, sans-serif",
    maxWidth: 280,
    padding: 10,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    lineHeight: 1.4
  }}>
    <Link
          href={`/catalog/${el.id}`}
          className={styles.readLink}
        >
    <h2 style={{ margin: "0 0 8px 0", fontSize: 16, color: "#2c3e50", fontWeight: 'bold', textDecoration: 'underline'}}>
      {el.name}
    </h2>
    </Link>

    <p style={{ margin: "2px 0" }}><strong>Адрес:</strong> {el.address}</p>
    <p style={{ margin: "2px 0" }}><strong>Время работы:</strong> {el.timeJob}</p>
    <p style={{ margin: "2px 0" }}>
      <strong>Телефон:</strong>{" "}
      <a href={`tel:${el.phone}`} style={{ color: "#2980b9", textDecoration: "none" }}>
        {el.phone}
      </a>
    </p>
    <p style={{ margin: "5px 0 2px 0" }}><strong>Услуги:</strong></p>
    <ul style={{ paddingLeft: 15, margin: 0 }}>
{el.heading}    </ul>
    
  </div>
);

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
          "https://api.kryzhok.ru/products/getCoords.php"
        );
        if (response.status === 200) {
          setDots(response.data);
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
      <Map
        width="100%"
        height={500}
        defaultState={{ center: [46.352695, 48.02875], zoom: 12 }}
      >
        {dots.map((el, i) => (
           <Placemark
            key={i}
            geometry={[el.lat, el.lon]}
            properties={{
              balloonContent: ReactDOMServer.renderToStaticMarkup(<BalloonContent el={el} />)
            }}
            options={{
              iconLayout: "default#image",
              iconImageHref: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              iconImageSize: [30, 30],
              iconImageOffset: [-15, -15],
              balloonCloseButton: true
            }}
            modules={["geoObject.addon.balloon"]}
          />
        ))}
      </Map>
    </YMaps>
      </div>
    </div>
  );
};
