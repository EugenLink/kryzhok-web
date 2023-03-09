import { Tiptap } from "@/components/Editor/Editor.js";
import styles from "@/styles/Home.module.css";
import parse from "html-react-parser";
import Head from "next/head";
import { useState } from "react";
import ReactDOMServer from "react-dom/server";
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
        <button
          onClick={() => {
            const id = Date.now();
            const html = parse(description, {
              replace: (domNode) => {
                if (domNode.attribs && domNode.name === "img") {
                  const alt = domNode.attribs.alt;

                  return (
                    <div
                      alt={alt}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={`https://volga24bot.com/cgi-bin/news/photos/${id
                          .toString()
                          .substring(5)}/${alt}`}
                        alt={alt}
                      />
                    </div>
                  );
                }
              },
            });
            if (html.length) {
              const names = html?.map((el) => el.props.alt);

              const filtredImages = images.filter((el) => {
                return names.includes(el.name);
              });
              const htmlString = ReactDOMServer.renderToString(html);

              let formData = new FormData();

              filtredImages.forEach((el) => {
                formData.append(el.name, el);
              });

              formData.append(
                "title",
                "Texnika room во всех соцсетях и мессенджерах."
              );

              formData.append("id", id.toString().substring(5));
              formData.append("content", htmlString);
              formData.append("images", filtredImages);
              fetch("https://volga24bot.com/cgi-bin/news/pushToNews.php", {
                method: "POST",
                body: formData,
              });
            }
          }}
        >
          Save
        </button>
      </main>
      <Footer />
    </div>
  );
}
