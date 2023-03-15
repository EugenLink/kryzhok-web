import { Button, Input, message, Upload } from "antd";
import parse from "html-react-parser";
import ReactDOMServer from "react-dom/server";

import moment from "moment";
import Link from "next/link.js";
import { useEffect, useState } from "react";
import { Tiptap } from "../Editor/Editor.js";
import styles from "./Creator.module.scss";

export const News = () => {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [logo, setLogo] = useState(null);
  const [title, setTitle] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [allNews, setAllNews] = useState([]);

  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options;

    setLogo(file);
    onSuccess("Ok");
  };
  useEffect(() => {
    fetch(`https://volga24bot.com/cgi-bin/news/getAllNews.php`)
      .then((res) => res.json())
      .then((res) => setAllNews(res));
  }, []);

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <div className={styles.editor}>
        <h2>Текущие новости</h2>
        {allNews.length ? (
          <ul className={styles.list}>
            {allNews.map((el) => {
              return (
                <li key={el[0]}>
                  <p>
                    {el[1]} - {moment(el[3]).format("DD.MM.YYYY HH:mm")}
                  </p>
                  <div>
                    <Link href={`/news/${el[0]}?name=${el[1]}`} legacyBehavior>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        style={{ marginRight: "20px" }}
                      >
                        <Button type="primary">Просмотр новости</Button>
                      </a>
                    </Link>
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        fetch(
                          `https://volga24bot.com/cgi-bin/news/deleteNews.php?id=${el[0]}`
                        )
                          .then((res) => res.json())
                          .then((res) => {
                            if (res === "true") {
                              const ftlr = allNews.filter(
                                (el2) => el[0] !== el2[0]
                              );
                              setAllNews(ftlr);
                              messageApi.success("Новость успешно удалена");
                            } else {
                              messageApi.error("Произошла ошибка");
                            }
                          });
                      }}
                    >
                      Удалить
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p style={{ textAlign: "center", padding: 20 }}>ПУСТО</p>
        )}
        <h2>Добавить новую новость</h2>
        <div className={styles.flex}>
          <div className={styles.editorInput}>
            <p>Заголовок новости:</p>
            <Input
              placeholder="Заголовок"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.editorInput}>
            <p>Основное фото:</p>
            <Upload
              customRequest={uploadImage}
              onChange={() => {}}
              name="file"
              onRemove={() => setLogo(null)}
            >
              {logo ? null : <Button>Нажмите для загрузки</Button>}
            </Upload>
          </div>
        </div>

        <Tiptap setDescription={setDescription} images={setImages} />
        <div className={styles.buttonSave}>
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

              if (html) {
                const names = Array.from(html)?.map((el) => el.props.alt);

                const filtredImages = images?.filter((el) => {
                  return names.includes(el.name);
                });

                const htmlString = ReactDOMServer.renderToString(html);

                let formData = new FormData();

                filtredImages.forEach((el) => {
                  formData.append(el.name, el);
                });
                formData.append("logo", logo);
                formData.append("title", title);

                formData.append("id", id.toString().substring(5));
                formData.append("content", htmlString);
                formData.append("images", filtredImages);

                fetch("https://volga24bot.com/cgi-bin/news/pushToNews.php", {
                  method: "POST",
                  body: formData,
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res === "true") {
                      const newNews = [
                        id.toString().substring(5),
                        title,
                        "",
                        moment().toDate(),
                      ];
                      setAllNews([newNews, ...allNews]);
                      messageApi.success("Новость успешно загружена");

                      setTitle("");

                      setImages([]);
                    } else {
                      messageApi.error("Произошла ошибка");
                    }
                  });
              }
            }}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};
