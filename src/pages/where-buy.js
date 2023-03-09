import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import styles from "@/styles/Catalog.module.scss";
import Head from "next/head";
import Image from "next/image.js";
import Header from "../components/Header/Header";
import Footer from "./../components/Footer/Footer";

export default function Feedback() {
  return (
    <div>
      <Head>
        <title>Где купить</title>
        <meta name="description" content="Шоурум бытовой техники" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <div className={styles.breadCrumb}>
            <BreadcrumbDinamic />
          </div>
          <h2 className={styles.title}>Где купить наш товар?</h2>
          <div className={styles.textWrapper}>
            <p className={styles.textCenter}>
              Весь представленный на сайте товар вы можете приобрести в любом,
              удобном вам, маркетплейсе: <span>OZON</span>,{" "}
              <span>Wildberries</span>, <span>AliExpress</span> или{" "}
              <span>Яндекс Маркет</span>.
            </p>
            <div className={styles.markplaces}>
              <div className={styles.mpImage}>
                <Image src={"/marketplaces/ozon.png"} alt={"ozon"} fill />
              </div>
              <div className={styles.mpImage}>
                <Image src={"/marketplaces/wb.png"} alt={"wb"} fill />
              </div>
              <div className={styles.mpImage}>
                <Image src={"/marketplaces/ali.png"} alt={"ali"} fill />
              </div>
              <div className={styles.mpImage}>
                <Image src={"/marketplaces/ym.png"} alt={"ym"} fill />
              </div>
            </div>
            <p className={styles.textCenter}>
              Также наши товары можно встретить на прилавках сети магазинов
              бытовой техники и электроники <span>АстМаркет</span> .
            </p>
            <div className={styles.markplaces}>
              <div className={styles.mpImage}>
                <Image src={"/marketplaces/am.png"} alt={"am"} fill />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
