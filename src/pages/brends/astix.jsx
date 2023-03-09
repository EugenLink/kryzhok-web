import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import styles from "@/styles/Catalog.module.scss";

import { Carousel } from "@/components/Carousel/Carousel.jsx";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Head from "next/head";
import Image from "next/image.js";

export default function Astix({ data }) {
  return (
    <div>
      <Head>
        <title>Бренды - ASTIX</title>
        <meta name="description" content="Бренд бытовой техники ASTIX" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <div className={styles.breadCrumb}>
            <BreadcrumbDinamic />
          </div>
          <h2 className={styles.title}>БРЕНД: ASTIX</h2>
          <div>
            <div className={styles.brendFlexWrapper}>
              <div className={styles.brendText}>
                <div className={styles.addedText}>
                  <p>Страна: Россия </p>
                  <p>Год основания: 2017</p>
                  <p>Страна-производитель: Китай</p>
                </div>
                <div className={styles.desc}>
                  <p>
                    <span>ASTIX</span> - это российская торговая марка мелкой
                    бытовой техники. Бренд ASTIX принадлежит компании
                    «АстМаркет» — российской розничной сети по продаже
                    электронной и бытовой техники.
                  </p>
                  <p>
                    Ассортимент представлен линейкой недорогой и качественной
                    мелкой бытовой техники в таких категориях, как мясорубки,
                    термопоты и электрочайники, блендеры, утюги и др.
                  </p>
                  <p>
                    Производство на всемирно известных заводах, качественные
                    материалы и комплектующие, а также доступная цена позволят
                    ASTIX составить достойную конкуренцию популярным брендам.
                  </p>
                </div>
              </div>
              <div className={styles.imageWrapper}>
                <Image
                  src={"/brends/astixPage.png"}
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
    `https://volga24bot.com/cgi-bin/product/getByBrend.php?brend=ASTIX`
  );

  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
