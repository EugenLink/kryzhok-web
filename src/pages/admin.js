import Login from "@/components/Login/Login.jsx";
import { Edit } from "@/components/Product/Edit/Edit.jsx";
import styles from "@/styles/Admin.module.scss";
import { message } from "antd";
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
          <Edit products={data} />
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
    `https://volga24bot.com/cgi-bin/product/getAllForChange.php`
  );

  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
