import { Tiptap } from "@/components/Editor/Editor.js";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "./../components/Footer/Footer";

export default function Test() {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

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
        <Tiptap setDescription={setDescription} images={setImages} />
      </main>
      <Footer />
    </div>
  );
}
