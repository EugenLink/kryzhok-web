import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import styles from "@/styles/Catalog.module.scss";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import { ProductPreview } from "@/components/Product/ProductPreview.jsx";
import getLink from "@/hooks/getLinkFromBase.js";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Catalogs({ data }) {
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
            {data.map((el) => (
              <ProductPreview
                key={el.id}
                cost={el.Cost}
                name={el.Name}
                recenz={el.recenz}
                type={el.Model}
                link={getLink(el.Chapter, el.PreChapter, el.id)}
                img={
                  el.previewImg.length
                    ? `http://u1978287.isp.regruhosting.ru/product/photos/${el.id}/previewImg/${el.previewImg}`
                    : "/noPhoto.png"
                }
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
    `http://u1978287.isp.regruhosting.ru/product/getByChapter.php?chapter=${name}`
  );

  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
