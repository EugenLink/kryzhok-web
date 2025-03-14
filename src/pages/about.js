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
        <meta name="description" content="Поиск места для детей" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <div className={styles.breadCrumb}>
            <BreadcrumbDinamic />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
