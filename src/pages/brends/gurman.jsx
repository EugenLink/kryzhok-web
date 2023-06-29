import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import styles from "@/styles/Catalog.module.scss";

import { Carousel } from "@/components/Carousel/Carousel.jsx";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Head from "next/head";
import Image from "next/image.js";

export default function Gurman({ data }) {
  return (
    <div>
      <Head>
        <title>Бренды - GURMAN</title>
        <meta name="description" content="Бренд бытовой техники GURMAN" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <div className={styles.breadCrumb}>
            <BreadcrumbDinamic />
          </div>
          <h2 className={styles.title}>БРЕНД: GURMAN</h2>
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
                    Бренд GURMAN принадлежит компании «АстМаркет». GURMAN -
                    российская торговая марка бытовой техники,
                    специализирующаяся на кухонной технике.
                  </p>
                  <p>
                    Бренд сохраняет высокое качество производимой продукции,
                    благодаря автоматизированной сборке на современном
                    оборудовании проверенных производителей. При этом техника
                    бренда достаточно бюджетная и доступна практически каждому.
                  </p>
                  <p>
                    Производство на всемирно известных заводах, качественные
                    материалы и комплектующие, а также доступная цена позволят
                    GURMAN составить достойную конкуренцию популярным брендам.
                  </p>
                </div>
              </div>
              <div className={styles.imageWrapper}>
                <Image
                  src={"/brends/gurmanPage.png"}
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
    `https://u1978287.isp.regruhosting.ru/product/getByBrend.php?brend=GURMAN`
  );

  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
