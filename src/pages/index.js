import { Loader } from "@/components/Loader/Loader.jsx";
import { MainList } from "@/components/MainList/MainList.jsx";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { Banners } from "./../components/Banners/Banners";

import Footer from "./../components/Footer/Footer";

export default function Home({ data }) {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoad(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Head>
        <title>Texnika Room</title>
        <meta
          name="description"
          content="Шоурум бытовой техники Texnika Room"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        {load ? null : <Loader />}

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
