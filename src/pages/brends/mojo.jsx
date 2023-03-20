import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import styles from "@/styles/Catalog.module.scss";

import { Carousel } from "@/components/Carousel/Carousel.jsx";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Head from "next/head";
import Image from "next/image.js";

export default function Mojo({ data }) {
  return (
    <div>
      <Head>
        <title>Бренды - MOJO</title>
        <meta name="description" content="Бренд бытовой техники MOJO" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <div className={styles.breadCrumb}>
            <BreadcrumbDinamic />
          </div>
          <h2 className={styles.title}>БРЕНД: MOJO</h2>
          <div>
            <div className={styles.brendFlexWrapper}>
              <div className={styles.brendText}>
                <div className={styles.addedText}>
                  <p>Страна: Россия </p>
                  <p>Год основания: 2020</p>
                  <p>Страна-производитель: Китай</p>
                </div>
                <div className={styles.desc}>
                  <p>
                    <span>MOJO</span> - компания, основанная в России в 2020
                    году. Занимается производством и продажей современной
                    бытовой техники. Заслуженным хитом MOJO является линейка
                    стильных планетарных миксеров под любой запрос и вкус. Также
                    бренд постоянно пополняет каталог товаров для кухни и дома,
                    отслеживая потребительский спрос.
                  </p>
                  <p>
                    Вся продукция производится в КНР, под строгим контролем
                    сотрудников компании MOJO.
                  </p>
                </div>
              </div>
              <div className={styles.imageWrapper}>
                <Image
                  src={"/brends/mojoPage.png"}
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
    `http://u1978287.isp.regruhosting.ru/product/getByBrend.php?brend=MOJO`
  );

  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
