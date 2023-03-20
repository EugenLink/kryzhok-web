import { Button, Input, message, Select, Upload } from "antd";
import parse from "html-react-parser";
import ReactDOMServer from "react-dom/server";

import moment from "moment";
import Link from "next/link.js";
import { useEffect, useState } from "react";
import { Tiptap } from "../Editor/Editor.js";
import styles from "./Creator.module.scss";

export const Recipes = () => {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [logo, setLogo] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [time, setTime] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [allNews, setAllNews] = useState([]);

  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options;

    setLogo(file);
    onSuccess("Ok");
  };
  useEffect(() => {
    fetch(`http://u1978287.isp.regruhosting.ru/recipes/getRecipes.php`)
      .then((res) => res.json())
      .then((res) => setAllNews(res));
  }, []);

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <div className={styles.editor}>
        <h2>Текущие рецепты</h2>
        {allNews.length ? (
          <ul className={styles.list}>
            {allNews.map((el) => {
              return (
                <li key={el[0]}>
                  <p>{el[1]}</p>
                  <div>
                    <Link
                      href={`/recipes/${el[3]}/${el[0]}?name=${el[1]}`}
                      legacyBehavior
                    >
                      <a
                        target="_blank"
                        rel="noreferrer"
                        style={{ marginRight: "20px" }}
                      >
                        <Button type="primary">Просмотр рецепта</Button>
                      </a>
                    </Link>
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        fetch(
                          `http://u1978287.isp.regruhosting.ru/recipes/delete.php?id=${el[0]}`
                        )
                          .then((res) => res.json())
                          .then((res) => {
                            if (res === "true") {
                              const ftlr = allNews.filter(
                                (el2) => el[0] !== el2[0]
                              );
                              setAllNews(ftlr);
                              messageApi.success("Рецепт успешно удалена");
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
        <h2>Добавить новый рецепт</h2>
        <div className={styles.flex}>
          <div className={styles.editorInput}>
            <p>Раздел рецепта:</p>
            <Select
              className={styles.select}
              showSearch
              placeholder="Выберите раздел"
              optionFilterProp="children"
              onChange={(e) => setType(e)}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "blender",
                  label: "Рецепты для блендеров",
                },
                {
                  value: "mixer",
                  label: "Рецепты для планетарного миксера",
                },
                {
                  value: "boiler",
                  label: "Рецепты для пароварки",
                },
                {
                  value: "oven",
                  label: "Рецепты для духовки",
                },
                {
                  value: "gril",
                  label: "Рецепты для гриля",
                },

                {
                  value: "tea",
                  label: "Рецепты вкусного чая",
                },
              ]}
            />
          </div>
          <div className={styles.editorInput}>
            <p>Название рецепта:</p>
            <Input
              placeholder="Название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.editorInput}>
            <p>Время приготовления:</p>
            <Input
              placeholder="40 минут"
              value={time}
              onChange={(e) => setTime(e.target.value)}
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
        </div>

        <Tiptap setDescription={setDescription} images={setImages} />
        <div className={styles.buttonSave}>
          <button
            onClick={() => {
              const id = `1` + Date.now().toString().substring(5);
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
                          src={`http://u1978287.isp.regruhosting.ru/recipes/photos/${id}/${alt}`}
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
                formData.append("type", type);
                formData.append("time", time);
                formData.append("id", id);
                formData.append("text", htmlString);
                formData.append("images", filtredImages);
                fetch(
                  "http://u1978287.isp.regruhosting.ru/recipes/pushToRecipes.php",
                  {
                    method: "POST",
                    body: formData,
                  }
                )
                  .then((res) => res.json())
                  .then((res) => {
                    if (res === "true") {
                      const newNews = [id, title, "", type, moment().toDate()];
                      setAllNews([newNews, ...allNews]);
                      messageApi.success("Рецепт успешно загружена");

                      setTitle("");
                      setTime("");
                      setType("");
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
