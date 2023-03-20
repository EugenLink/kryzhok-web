import { Articles } from "@/components/Creator/Arcticles.jsx";
import { News } from "@/components/Creator/News.jsx";
import { Recipes } from "@/components/Creator/Recipes.jsx";
import Login from "@/components/Login/Login.jsx";
import { Edit } from "@/components/Product/Edit/Edit.jsx";
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
      label: "Товары",
      key: "product",
    },
    {
      label: "Новости",
      key: "news",
    },
    {
      label: "Рецепты",
      key: "recipes",
    },
    {
      label: "Статьи",
      key: "articles",
    },
  ];
  const [current, setCurrent] = useState("product");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

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
        {contextHolder}
        {logIn ? (
          <div>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={Navitems}
            />
            {current === "product" ? <Edit products={data} /> : null}
            {current === "news" ? <News /> : null}
            {current === "articles" ? <Articles /> : null}
            {current === "recipes" ? <Recipes /> : null}
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
    `http://u1978287.isp.regruhosting.ru/product/getAllForChange.php`
  );

  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
