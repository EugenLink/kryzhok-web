import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Like from "@/components/Like/Like.jsx";
import Like2 from "@/img/hearth.png";
import Clock from "@/img/time.png";
import styles from "@/styles/Catalog.module.scss";
import parse from "html-react-parser";

import Head from "next/head";
import Image from "next/image.js";
import { useRouter } from "next/router";

export default function Recipe({ data }) {
  const router = useRouter();
  const { name } = router.query;

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
          <div>
            <div className={styles.backgroundWrapper}>
              <div className={styles.contentStyle}>
                <Image
                  src={`https://volga24bot.com/cgi-bin/recipes/photos/${data[0]}/logo.png`}
                  alt="Банер"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                className={styles.flex}
                style={{ justifyContent: "space-between" }}
              >
                <div className={`${styles.flex} ${styles.textWithIcon}`}>
                  <Image src={Clock} alt={"like"} width={16} height={16} />
                  <p>{data[5]}</p>
                </div>
                <div className={`${styles.flex} ${styles.textWithIcon}`}>
                  <Image src={Like2} alt={"like"} width={16} height={16} />
                  <p>{data[7]}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.parsedItems}>{parse(data[2])}</div>
          <Like likes={data[7]} id={data[0]} />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { recipe } = context.params;

  // Fetch data from external API

  const res = await fetch(
    `https://volga24bot.com/cgi-bin/recipes/getRecipe.php?id=${recipe}`
  );
  const data = await res.json();

  // Pass data to the page via props
  fetch(
    `https://volga24bot.com/cgi-bin/recipes/setView.php?id=${data[0]}&views=${
      +data[6] + 1
    }`
  );
  return { props: { data } };
}
