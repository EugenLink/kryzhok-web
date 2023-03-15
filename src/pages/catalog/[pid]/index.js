import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import ChapterCard from "@/components/ChapterCard/ChapterCard.jsx";
import styles from "@/styles/Catalog.module.scss";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { category } from "@/json/category.js";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Catalog() {
  const router = useRouter();
  const { name, pid } = router.query;
  const { asPath } = router;
  const path = asPath.split("?")[0];

  return (
    <div>
      <Head>
        <title>Каталог - {name}</title>
        <meta name="description" content={`Каталог - ${name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <div className={styles.breadCrumb}>
            <BreadcrumbDinamic />
          </div>
          <h2 className={styles.title}>{name}</h2>
          <div className={styles.cardWrapper}>
            {category
              .filter((el) => el.pid === pid)
              .map((el) => {
                return (
                  <ChapterCard
                    src={el.src}
                    text={el.text}
                    key={el.text}
                    link={`${path}${el.link}?name=${el.text}`}
                  />
                );
              })}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
