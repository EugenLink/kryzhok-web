import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import styles from "@/styles/Catalog.module.scss";

import { Carousel } from "@/components/Carousel/Carousel.jsx";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Head from "next/head";
import Image from "next/image.js";

export default function Phoenix({ data }) {
  return (
    <div>
      <Head>
        <title>Бренды - PHOENIX</title>
        <meta name="description" content="Бренд спортивной техники PHOENIX" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <div className={styles.breadCrumb}>
            <BreadcrumbDinamic />
          </div>
          <h2 className={styles.title}>БРЕНД: PHOENIX</h2>
          <div>
            <div className={styles.brendFlexWrapper}>
              <div className={styles.brendText}>
                <div className={styles.addedText}>
                  <p>Страна: Китай </p>
                  <p>Год основания: 1897</p>
                  <p>Страна-производитель: Китай</p>
                </div>
                <div className={styles.desc}>
                  <p>
                    Компания Phoenix, более известная как Phoenix Bicycles, была
                    основана в 1897 году, а уже в 1993 году была преобразована в
                    акционерную компанию.
                  </p>
                  <p>
                    Торговая марка Phoenix, входящая в первую десятку самых
                    известных велосипедных марок, сейчас зарегистрирована более,
                    чем в 104 странах мира.
                  </p>
                  <p>
                    Будучи одним из лучших китайских брендов, велосипеды Phoenix
                    уже много десятилетий являются самыми популярными в Китае.
                    Даже иностранные лидеры, посещающие Китай, часто получали
                    велосипед Phoenix в качестве приветственного подарка.
                  </p>
                </div>
              </div>
              <div className={styles.imageWrapper}>
                <Image
                  src={"/brends/phoenixPage.png"}
                  alt={"image"}
                  width={"350"}
                  height={"350"}
                />
              </div>
            </div>
            <div className={styles.productCarousel}>
              <p className={styles.caruselTitle}>Товары бренда:</p>
              <Carousel items={data.splice(0, 10)} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `https://u1978287.isp.regruhosting.ru/product/getByBrend.php?brend=PHOENIX`
  );

  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
