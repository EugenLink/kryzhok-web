import { Banners } from "@/components/Banners/Banners.jsx";
import { Loader } from "@/components/Loader/Loader.jsx";
import { MainList } from "@/components/MainList/MainList.jsx";
import styles from "@/styles/Home.module.css";

import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "./../components/Footer/Footer";

export default function Home({ data }) {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoad(true), 3000);
    return () => clearTimeout(timer);
    
  }, []);
  
  return (
    <div>
      <Head>
        <title>Кружок</title>
        <meta name="description" content="Кружок" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        {load ? null : <Loader />}

        <Banners />

        {/* <MainList hit={data} /> */}
        <MainList hit={[{
  id : 1,
  title : "Футбольная академия",
  chapter : '12312',
  date : "26 Ноября, 2024",
  photo : "noPhoto.jpg",
  width : 320,
  likedPop : false,
  text : "Откройте мир футбола вместе с нами! В нашей Детской Академии Футбола ваш ребенок научится не только мастерству игры, но и командной работе, дисциплине и уверенности в себе. Присоединяйтесь к нам и дайте вашему ребенку шанс стать настоящим чемпионом!",
}, {
  id : 2,
  title : "Футбольная академия",
  chapter : '12312',
  date : "26 Ноября, 2024",
  photo : "noPhoto.jpg",
  width : 320,
  likedPop : false,
  text : "Откройте мир футбола вместе с нами! В нашей Детской Академии Футбола ваш ребенок научится не только мастерству игры, но и командной работе, дисциплине и уверенности в себе. Присоединяйтесь к нам и дайте вашему ребенку шанс стать настоящим чемпионом!",
}, {
  id : 3,
  title : "Футбольная академия",
  chapter : '12312',
  date : "26 Ноября, 2024",
  photo : "noPhoto.jpg",
  width : 320,
  likedPop : false,
  text : "Откройте мир футбола вместе с нами! В нашей Детской Академии Футбола ваш ребенок научится не только мастерству игры, но и командной работе, дисциплине и уверенности в себе. Присоединяйтесь к нам и дайте вашему ребенку шанс стать настоящим чемпионом!",
}, {
  id : 3,
  title : "Футбольная академия",
  chapter : '12312',
  date : "26 Ноября, 2024",
  photo : "noPhoto.jpg",
  width : 320,
  likedPop : false,
  text : "Откройте мир футбола вместе с нами! В нашей Детской Академии Футбола ваш ребенок научится не только мастерству игры, но и командной работе, дисциплине и уверенности в себе. Присоединяйтесь к нам и дайте вашему ребенку шанс стать настоящим чемпионом!",
}]} />
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  try {
    const res = await fetch(
      "https://u1978287.isp.regruhosting.ru/kryzhok/products/getHits.php"
    );

    const data = await res.json();

    return { props: { data } };
  } catch (error) {
    console.error("Fetch error:", error);

    return {
      props: {
        data: [],
      },
    };
  }
}
