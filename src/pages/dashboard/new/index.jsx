import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import DashboardWrapper from "@/components/Dashboard/Dashboard";
import ObjectCreate from "@/components/Dashboard/ObjectCreate";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { $user } from "@/state/products";
import styles from "@/styles/Catalog.module.scss";
import { useStore } from "effector-react";
import parse from "html-react-parser";
import moment from "moment";

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function New() {
  const router = useRouter();
  const user = useStore($user); // Получаем данные пользователя из хранилища

  useEffect(() => {
    // Получаем ID пользователя из localStorage
    const userId = localStorage.getItem("user");

    if (!userId) {
      router.push("/"); // Перенаправляем на страницу входа, если пользователь не авторизован
      return;
    }
  }, [router, user]);

  return (
    <div>
      <Head>
        <title>Личный кабинет</title>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <ObjectCreate />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://u1978287.isp.regruhosting.ru/kryzhok/articles/getAll.php`
  );

  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
