import { Articles } from "@/components/Creator/Arcticles.jsx";
import { FeedBackControl } from "@/components/Creator/Feedback.jsx";
import { News } from "@/components/Creator/News.jsx";
import { SubsControl } from "@/components/Creator/Subs.jsx";
import Login from "@/components/Login/Login.jsx";
import styles from "@/styles/Admin.module.scss";
import { Menu, message } from "antd";
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "./../components/Footer/Footer";

export default function Admin({ data }) {
  const [logIn, setLogIn] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("login");

      setLogIn(saved);
    }
  }, []);
  const Navitems = [
    {
      label: "Новости",
      key: "news",
    },

    {
      label: "Мероприятия",
      key: "articles",
    },
    {
      label: "Обратная связь",
      key: "feedback",
      danger: data.fbc,
    },
    {
      label: "Подписки",
      key: "subs",
      danger: data.sbc,
    },
  ];
  const [current, setCurrent] = useState("product");
  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div>
      <Head>
        <title>Кружок админка</title>
        <meta name="description" content="Кружок" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        {contextHolder}
        {logIn ? (
          <div>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={Navitems}
            />
            {current === "news" ? <News /> : null}
            {current === "articles" ? <Articles /> : null}
            {current === "feedback" ? <FeedBackControl /> : null}
            {current === "subs" ? <SubsControl /> : null}
          </div>
        ) : (
          <div className={styles.center}>
            <div className={styles.loginWrapper}>
              <Login
                func={() => {
                  messageApi.success("Вы успешно вошли");
                  localStorage.setItem("login", true);
                  setLogIn(true);
                }}
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://u1978287.isp.regruhosting.ru/product/getAllForChange.php`
  );

  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
