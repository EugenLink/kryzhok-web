import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import styles from "@/styles/Catalog.module.scss";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import getLink from "@/hooks/getLinkFromBase.js";
import Head from "next/head";
import { useRouter } from "next/router";
import ProductPreviewMini from "@/components/Product/ProductPreviewMini";

export default function Catalog({ data }) {
  const router = useRouter();
  const { name } = router.query;
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

          <div className={styles.productsWrapper}>
            {data.map((el, i) => (
              <ProductPreviewMini
                key={i}
                title={el.name}
                photo={el.image_preview}
                text={el.description}
                id={el.id}
                chapter={el.category}
              />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.query;

  // Fetch data from external API
  const res = await fetch(
    `https://u1978287.isp.regruhosting.ru/kryzhok/products/getByChapter.php?category=${name}`
  );

  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
