import { Button, Input, message, Upload } from "antd";
import parse from "html-react-parser";
import ReactDOMServer from "react-dom/server";

import moment from "moment";
import Link from "next/link.js";
import { useEffect, useState } from "react";
import { Tiptap } from "../Editor/Editor.js";
import styles from "./Creator.module.scss";

export const Articles = () => {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [logo, setLogo] = useState(null);
  const [title, setTitle] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [allNews, setAllNews] = useState([]);

  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options;

    setLogo(file);
    onSuccess("Ok");
  };
  useEffect(() => {
    fetch(`https://u1978287.isp.regruhosting.ru/kryzhok/articles/getAll.php`)
      .then((res) => res.json())
      .then((res) => setAllNews(res));
  }, []);

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <div className={styles.editor}>
        <h2>Текущие мероприятия</h2>
        {allNews.length ? (
          <ul className={styles.list}>
            {allNews.map((el) => {
              return (
                <li key={el[0]}>
                  <p>
                    {el[1]} - {moment(el[4]).format("DD.MM.YYYY HH:mm")}
                  </p>
                  <div>
                    <Link
                      href={`/articles/${el[0]}?name=${el[1]}`}
                      legacyBehavior
                    >
                      <a
                        target="_blank"
                        rel="noreferrer"
                        style={{ marginRight: "20px" }}
                      >
                        <Button type="primary">Просмотр мероприятия</Button>
                      </a>
                    </Link>
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        fetch(
                          `https://u1978287.isp.regruhosting.ru/kryzhok/articles/delete.php?id=${el[0]}`
                        )
                          .then((res) => res.json())
                          .then((res) => {
                            if (res === "true") {
                              const ftlr = allNews.filter(
                                (el2) => el[0] !== el2[0]
                              );
                              setAllNews(ftlr);
                              messageApi.success("Мероприятие успешно удалена");
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
        <h2>Добавить новое мероприятие</h2>
        <div className={styles.flex}>
          <div className={styles.editorInput}>
            <p>Заголовок:</p>
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
              name="file"
              onRemove={() => setLogo(null)}
            >
              {logo ? null : <Button>Нажмите для загрузки</Button>}
            </Upload>
          </div>
          <div className={styles.editorInput}>
            <p>Текст для превью:</p>
            <Input
              placeholder="Превью"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
            />
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
                          src={`https://u1978287.isp.regruhosting.ru/kryzhok/articles/photos/${id
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
                formData.append("previewText", previewText);
                formData.append("author", "Texnika Room");
                fetch(
                  "https://u1978287.isp.regruhosting.ru/kryzhok/articles/push.php",
                  {
                    method: "POST",
                    body: formData,
                  }
                )
                  .then((res) => res.json())
                  .then((res) => {
                    if (res === "true") {
                      const newNews = [
                        id.toString().substring(5),
                        title,
                        "",
                        "",
                        moment().toDate(),
                      ];
                      setAllNews([newNews, ...allNews]);
                      messageApi.success("Мероприятие успешно загружено");

                      setTitle("");
                      setPreviewText("");
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
