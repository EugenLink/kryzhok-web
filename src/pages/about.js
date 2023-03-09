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
        <title>О компании</title>
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
          <h1 className={styles.Maintitle}>Texnika room</h1>
          <p className={styles.subTitle}>
            Самый стильный шоурум бытовой техники
          </p>
          <div className={styles.aboutWrapper}>
            <div className={styles.flex}>
              <div className={styles.aboutText}>
                <h3>О НАС</h3>
                <p>
                  Мы производим и продаем самую стильную и качественную бытовую
                  технику по доступным ценам.
                </p>
                <p>
                  Все товары создаем сами, работая с заводами-производителями
                  напрямую.
                </p>
                <p>
                  Каждая модель проверена нами лично на предмет качества и
                  функциональности. Мы позаботились о том, чтобы нашим
                  покупателям было удобно.
                </p>
              </div>
              <div className={styles.aboutImage}>
                <div className={styles.backgroundWrapper}>
                  <Image src="/about/first.png" alt="about" fill />
                </div>
              </div>
            </div>
            <div className={`${styles.flex} ${styles.reverse}`}>
              <div className={styles.aboutImage}>
                <div className={styles.backgroundWrapper}>
                  <Image src="/about/second.png" alt="about" fill />
                </div>
              </div>
              <div className={styles.aboutText}>
                <h3>КАЧЕСТВО И ДОСТУПНОСТЬ</h3>
                <p>
                  Мы предлагаем наш товар по самым выгодным ценам, не в убыток
                  качеству и комфорту.
                </p>
                <p>
                  Контроль на каждом этапе - это неотъемлемая часть нашей
                  работы. Ведь мы стремимся к тому, чтобы наша техника приносила
                  вам только удовольствие и комфорт.
                </p>
              </div>
            </div>
            <p className={styles.bottomTitle}>
              Уже более 2х лет мы успешно сотрудничаем с крупнейшими
              маркетплейсами, на которых довольные покупатели оставили нам уже
              более 200 000 отзывов.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
