import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import styles from "@/styles/Catalog.module.scss";

import ArticleCard from "@/components/ChapterCard/ArticleCard.jsx";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Head from "next/head";
import { useRouter } from "next/router.js";

export default function News({ data }) {
  const router = useRouter();

  const { asPath } = router;
  const path = asPath.split("?")[0];

  return (
    <div>
      <Head>
        <title>Меропириятия</title>
        <meta name="description" content="Мероприятия" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <div className={styles.breadCrumb}>
            <BreadcrumbDinamic />
          </div>
          <h2 className={styles.title}>МЕРОПРИЯТИЯ</h2>
          <div className={styles.articlesWrapper}>
            {data.map((el) => {
              return (
                <ArticleCard
                  key={el[0]}
                  title={el[1]}
                  src={`https://u1978287.isp.regruhosting.ru/kryzhok/articles/photos/${el[0]}/logo.png`}
                  previewText={el[2]}
                  date={el[4]}
                  author={el[5]}
                  link={`${path}/${el[0]}?name=${el[1]}`}
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

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://u1978287.isp.regruhosting.ru/kryzhok/articles/getAll.php`
  );

  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
