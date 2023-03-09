import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import styles from "@/styles/Catalog.module.scss";

import { Carousel } from "@/components/Carousel/Carousel.jsx";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Head from "next/head";
import Image from "next/image.js";

export default function Jacco({ data }) {
  return (
    <div>
      <Head>
        <title>Бренды - JACCO</title>
        <meta name="description" content="Бренд бытовой техники JACCO" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <div className={styles.breadCrumb}>
            <BreadcrumbDinamic />
          </div>
          <h2 className={styles.title}>БРЕНД: JACCO</h2>
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
                    <span>JACCO </span> - российская торговая марка бытовой
                    техники. Бренд JACOO принадлежит компании «АстМаркет» —
                    российской розничной сети по продаже электронной и бытовой
                    техники.
                  </p>
                  <p>
                    Ассортимент представлен мелкой и крупной бытовой, а также
                    климатической техникой недорогого ценового сегмента.
                    Продукцию JACOO обслуживают авторизованные сервисные центры,
                    которые расположены во всех регионах, где доступна продукция
                    компании. Все заводы, производящие продукцию JACOO, оснащены
                    высокотехнологичным роботизированным оборудованием и
                    сертифицированы по стандарту ISO 9001, что гарантирует
                    высокий уровень качества сборки.
                  </p>
                  <p>
                    Подавляющее большинство техники составляют модели,
                    оснащенные необходимым минимумом функций, удобные в
                    управлении и обслуживании. Это позволяет JACOO успешно
                    конкурировать с более известными мировыми брендами.
                  </p>
                </div>
              </div>
              <div className={styles.imageWrapper}>
                <Image
                  src={"/brends/jacoPage.png"}
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
    `https://volga24bot.com/cgi-bin/product/getByBrend.php?brend=JACCO`
  );

  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
