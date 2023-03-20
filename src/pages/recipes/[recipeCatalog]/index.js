import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import styles from "@/styles/Catalog.module.scss";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import ChapterCardRecipe from "@/components/ChapterCard/ChapterCardRecipe.jsx";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Catalogs({ data }) {
  const router = useRouter();
  const { recipeCatalog, name } = router.query;

  return (
    <div>
      <Head>
        <title>{name}</title>
        <meta name="description" content={name} />
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
            {data
              .filter((el) => el[3] === recipeCatalog)
              .map((el) => {
                return (
                  <ChapterCardRecipe
                    text={el[1]}
                    src={`http://u1978287.isp.regruhosting.ru/recipes/photos/${el[0]}/logo.png`}
                    link={`/recipes/${recipeCatalog}/${el[0]}?name=${el[1]}`}
                    key={el[0]}
                    time={el[5]}
                    views={el[6]}
                    likes={el[7]}
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
    `http://u1978287.isp.regruhosting.ru/recipes/getRecipes.php`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
