import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import styles from "@/styles/Catalog.module.scss";

import { Carousel } from "@/components/Carousel/Carousel.jsx";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Head from "next/head";
import Image from "next/image.js";

export default function Holleberg({ data }) {
  return (
    <div>
      <Head>
        <title>Бренды - HOLLEBERG</title>
        <meta
          name="description"
          content="российская торговая марка телевизоров и прочей электроники HOLLEBERG"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <div className={styles.breadCrumb}>
            <BreadcrumbDinamic />
          </div>
          <h2 className={styles.title}>БРЕНД: HOLLEBERG</h2>
          <div>
            <div className={styles.brendFlexWrapper}>
              <div className={styles.brendText}>
                <div className={styles.addedText}>
                  <p>Страна: Россия </p>
                  <p>Год основания: 2018</p>
                  <p>Страна-производитель: Китай</p>
                </div>
                <div className={styles.desc}>
                  <p>
                    <span>HOLLEBERG</span> - российская торговая марка
                    телевизоров и прочей электроники. Торговая марка HOLLEBERG
                    была запущена как собственная торговая марка сети магазинов
                    бытовой техники и электроники «АстМаркет».
                  </p>
                  <p>
                    Бренд HOLLEBERG наиболее известен своими телевизорами.
                    Сегодня производитель регулярно пополняет свой модельный ряд
                    в разных направлениях.
                  </p>
                  <p>
                    ся продукция HOLLEBERG сертифицирована по государственным
                    стандартам и обеспечена гарантийной поддержкой на территории
                    РФ.
                  </p>
                </div>
              </div>
              <div className={styles.imageWrapper}>
                <Image
                  src={"/brends/hollebergPage.png"}
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
    `https://u1978287.isp.regruhosting.ru/product/getByBrend.php?brend=HOLLEBERG`
  );

  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
