import { MainList } from "@/components/MainList/MainList.jsx";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import Header from "../components/Header/Header";
import { Banners } from "./../components/Banners/Banners";

import Footer from "./../components/Footer/Footer";

export default function Home({ data }) {
  console.log(data);
  return (
    <div>
      <Head>
        <title>Texnika Room</title>
        <meta name="description" content="Шоурум бытовой техники" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <Banners />
        <MainList hit={data.hit} newI={data.new} />
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://volga24bot.com/cgi-bin/product/getHitAndNew.php`
  );

  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
