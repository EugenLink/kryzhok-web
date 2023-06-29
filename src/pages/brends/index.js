import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import styles from "@/styles/Catalog.module.scss";

import { Brends } from "@/components/Brends/Brends.jsx";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Head from "next/head";

export default function Catalog() {
  return (
    <div>
      <Head>
        <title>Бренды</title>
        <meta name="description" content="Бренды Texnika Room" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <div className={styles.breadCrumb}>
            <BreadcrumbDinamic />
          </div>
          <h2 className={styles.title}>НАШИ БРЕНДЫ</h2>
          <div className={styles.cardWrapper}>
            <div className={styles.brendsWrapper}>
              <Brends
                src="/brends/astix.png"
                title={"ASTIX"}
                text={"это российская торговая марка мелкой бытовой техники."}
                link={"/brends/astix"}
              />
              <Brends
                src="/brends/gurman.png"
                title={"GURMAN"}
                text={
                  "российская торговая марка бытовой техники, специализирующаяся на кухонной технике."
                }
                link={"/brends/gurman"}
              />
              <Brends
                src="/brends/jaco.png"
                title={"JACOO"}
                text={
                  "российская торговая марка бытовой техники. Ассортимент представлен мелкой и крупной бытовой, а также климатической техникой недорогого ценового сегмента."
                }
                link={"/brends/jacco"}
              />
              <Brends
                src="/brends/mogo.png"
                title={"MOJO"}
                text={
                  "занимается произв одством и продажей современной бытовой техники. Заслуженным хитом MOJO является линейка стильных планетарных миксеров под любой запрос и вкус."
                }
                link={"/brends/mojo"}
              />
              <Brends
                src="/brends/phoenix.png"
                title={"PHOENIX"}
                text={
                  "торговая марка, входит в первую десятку самых известных велосипедных марок, сейчас зарегистрирована более, чем в 104 странах мира."
                }
                link={"/brends/phoenix"}
              />
              <Brends
                src="/brends/holleberg.png"
                title={"HOLLEBERG"}
                text={
                  "российская торговая марка телевизоров и прочей электроники. Бренд HOLLEBERG наиболее известен своими телевизорами.Сегодня производитель регулярно пополняет свой модельный ряд в разных направлениях."
                }
                link={"/brends/holleberg"}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
