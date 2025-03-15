import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import FeedBackForm from "@/components/FeedBackForm/FeedBackForm.jsx";
import styles from "@/styles/Catalog.module.scss";
import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "./../components/Footer/Footer";

export default function Feedback() {
  return (
    <div>
      <Head>
        <title>Обратная связь</title>
        <meta name="description" content="Кружок" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <div className={styles.breadCrumb}>
            <BreadcrumbDinamic />
          </div>
          <h2 className={styles.title}>Обратная связь</h2>
          <div className={styles.cardWrapper}>
            <FeedBackForm />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
