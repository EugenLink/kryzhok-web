import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import styles from "@/styles/Catalog.module.scss";
import parse from "html-react-parser";
import moment from "moment";

import Head from "next/head";
import { useRouter } from "next/router";

export default function News({ data }) {
  const router = useRouter();
  const { name } = router.query;
  console.log(data)
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
          <h2 className={styles.title} style={{ fontWeight: 500 }}>
            {data.title}
          </h2>

          <div className={styles.parsedItems}>{parse(data.content)}</div>
          <div className={styles.bottomBlock}>
            <p style={{ fontWeight: 500 }}>Автор: {data.author}</p>
            <p>{moment(data.created_at).format("DD.MM.YYYY HH:mm")}</p>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { article } = context.params;

  // Fetch data from external API

  const res = await fetch(
    `https://api.kryzhok.ru/articles/get.php?id=${article}`
  );
  const data = await res.json();

  // Pass data to the page via props

  return { props: { data } };
}
