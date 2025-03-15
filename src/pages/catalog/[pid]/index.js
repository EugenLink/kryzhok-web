import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import styles from "@/styles/Catalog.module.scss";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import Head from "next/head";

import { useRouter } from "next/router.js";
import { useEffect, useState } from "react";
import { YMaps, Map, Panorama, Placemark } from "@pbe/react-yandex-maps";
import { Carousel, Image } from "antd";
import { Box, Tab, Tabs } from "@mui/material";
import CustomArrow from "@/components/Carousel/Carousel";
import ProductPreviewMini from "@/components/Product/ProductPreviewMini";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProductCard({ item, hits }) {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const onChange = (currentSlide) => {};
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [count, setCount] = useState(3);
  useEffect(() => {
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
    <div>
      <Head>
        <title>
          {item.name} - {item.description}
        </title>
        <meta name="description" content={`${item.Name} ${item.Model}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <div className={styles.breadCrumb}>
            <BreadcrumbDinamic />
          </div>
          <div>
            <h2 className={styles.title2}>{item.name}</h2>

            <div className={styles.cardFirstBlock}>
              <div className={styles.text}>
                <div>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      TabIndicatorProps={{ sx: { display: "none" } }}
                      className={styles.tabss}
                      sx={{
                        "& .MuiTabs-flexContainer": {
                          flexWrap: "wrap",
                        },
                      }}
                    >
                      {item.description ? (
                        <Tab
                          label="Описание"
                          {...a11yProps(0)}
                          className={styles.tabs}
                        />
                      ) : null}

                      {item.services ? (
                        <Tab
                          label="Направление"
                          {...a11yProps(1)}
                          className={styles.tabs}
                        />
                      ) : null}

                      {item.heading ? (
                        <Tab
                          label="Услуги"
                          {...a11yProps(2)}
                          className={styles.tabs}
                        />
                      ) : null}

                      {item.peculiarity ? (
                        <Tab
                          label="Доп. услуги"
                          {...a11yProps(3)}
                          className={styles.tabs}
                        />
                      ) : null}
                    </Tabs>
                  </Box>
                  {item.description ? (
                    <CustomTabPanel value={value} index={0}>
                      {item.description}
                    </CustomTabPanel>
                  ) : null}

                  {item.services ? (
                    <CustomTabPanel value={value} index={1}>
                      {item.services}
                    </CustomTabPanel>
                  ) : null}

                  {item.heading ? (
                    <CustomTabPanel value={value} index={2}>
                      {item.heading}
                    </CustomTabPanel>
                  ) : null}

                  {item.peculiarity ? (
                    <CustomTabPanel value={value} index={3}>
                      {item.peculiarity}
                    </CustomTabPanel>
                  ) : null}
                </div>

                <div className={styles.bottomInfo}>
                  <div>
                    <p>
                      Время работы:{" "}
                      <span style={{ fontWeight: 500 }}>{item.timeJob}</span>
                    </p>
                    <p>
                      Адрес:{" "}
                      <span style={{ fontWeight: 500 }}>{item.address}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Ссылки:{" "}
                      <span style={{ fontWeight: 500 }}>{item.links}</span>
                    </p>
                    <p>
                      Телефон:{" "}
                      <span style={{ fontWeight: 500 }}>{item.phone}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  src={`https://u1978287.isp.regruhosting.ru/kryzhok/products/images/${item.id}/${item.image_preview}`} // Замените на ваше изображение
                  alt="Пример изображения"
                  width="100%" // Ширина изображения
                  height="100%" // Высота изображения
                  layout="responsive"
                />
              </div>
            </div>

            <div style={{ marginTop: 40, marginBottom: 40 }}>
              <YMaps>
                <div>
                  <Map
                    width={`100%`}
                    height={500}
                    defaultState={{
                      center: [item.coordX, item.coordY],
                      zoom: 16,
                    }}
                  >
                    <Placemark
                      geometry={[item.coordX, item.coordY]} // Координаты маркера
                      properties={{
                        hintContent: item.name, // Подсказка при наведении
                        balloonContent: item.address, // Содержимое балуна
                      }}
                      options={{
                        iconLayout: "default#image", // Используем стандартный макет
                        iconImageHref:
                          "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Ссылка на иконку
                        iconImageSize: [30, 30], // Размер иконки
                        iconImageOffset: [-15, -15], // Смещение иконки
                      }}
                    />
                  </Map>
                </div>
              </YMaps>
            </div>
          </div>
          {item.images ? (
            <div className={styles.gallery}>
              <h4>Галерея</h4>
              <div className={styles.imagesGalery}>
                {item.images.split(",").map((el, index) => (
                  <Image
                    key={index}
                    src={`https://u1978287.isp.regruhosting.ru/kryzhok/products/images/${item.id}/${el}`} // Замените на ваше изображение
                    alt={`Slide ${index + 1}`}
                    style={{
                      width: "300px", // Ширина на весь контейнер
                      height: "300px", // Фиксированная высота
                    }}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className={styles.productCardWrapper}></div>
          {hits ? (
            <div className={styles.recomended}>
              <p className={styles.titleRecomended}>Так же рекомендуем</p>
              <Carousel
                afterChange={onChange}
                slidesToShow={count}
                arrows={true}
                prevArrow={<CustomArrow direction="prev" />}
                nextArrow={<CustomArrow direction="next" />}
              >
                {hits.map((el, i) => {
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
          ) : null}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { pid } = context.params;
  const { chapter } = context.query;
  // Fetch data from external API
  const res = await fetch(
    `https://u1978287.isp.regruhosting.ru/kryzhok/products/getById.php?id=${pid}`
  );

  const item = await res.json();
  const hitsReq = await fetch(
    `https://u1978287.isp.regruhosting.ru/kryzhok/products/getByChaperForCarousel.php?chapter=${chapter}`
  );

  const hits = await hitsReq.json();
  // Pass data to the page via props
  return { props: { item, hits } };
}
