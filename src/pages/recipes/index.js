import styles from "@/styles/Catalog.module.scss";

import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import ChapterCard from "@/components/ChapterCard/ChapterCard.jsx";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { recipesCategory } from "@/json/recipesCategory.js";
import Head from "next/head";
import { useRouter } from "next/router.js";
export default function Catalog() {
  const router = useRouter();

  const { asPath } = router;
  const path = asPath.split("?")[0];

  return (
    <div>
      <Head>
        <title>Рецепты</title>
        <meta name="description" content="Рецепты Texnika Room" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <div className={styles.breadCrumb}>
            <BreadcrumbDinamic />
          </div>
          <h2 className={styles.title}>Рецепты для нашей техники</h2>
          <div className={styles.cardWrapper}>
            {recipesCategory.map((el) => {
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
