import Stars from "@/img/stars.png";
import Image from "next/image.js";
import { useState } from "react";
import styles from "./ProductCategories.module.scss";

export const ProductCategories = ({ item }) => {
  const [selected, setSelected] = useState("desc");
  return (
    <div className={styles.categories}>
      <ul className={styles.categoriesNav}>
        <li
          className={selected === "desc" ? styles.active : null}
          onClick={() => setSelected("desc")}
        >
          Описание
        </li>
        <li
          className={selected === "char" ? styles.active : null}
          onClick={() => setSelected("char")}
        >
          Характеристики
        </li>
        <li
          className={selected === "recenz" ? styles.active : null}
          onClick={() => setSelected("recenz")}
        >
          Отзывы
        </li>
      </ul>
      {selected === "desc" ? (
        <div className={`${styles.wrapper} ${styles.descWrapper}`}>
          <div className={styles.descText}>
            <p className={styles.title}>Описание товара</p>
            <p className={styles.name}>
              {item.Name} {item.Model}
            </p>
            {item.Desc.split('"/"').map((el, i) => (
              <p className={styles.text} key={i}>
                {el.replace(/["']/g, "")}
              </p>
            ))}

            <p className={styles.title}>Комплектация</p>
            <p className={styles.name}>Данная модель включает</p>
            <ul className={`${styles.text} ${styles.list}`}>
              {item.Comple?.split('"/"').map((el) =>
                el.length > 3 ? (
                  <li key={el}>{el.replace(/["']/g, "")}</li>
                ) : null
              )}
            </ul>
          </div>
          <div className={styles.ImageFullScreenWrapper}>
            <Image
              src={item.descPhoto}
              alt={"img"}
              className={styles.Image}
              fill
            />
          </div>
        </div>
      ) : null}
      {selected === "char" ? (
        <div className={`${styles.wrapper} ${styles.charWrapper}`}>
          <p className={styles.title}>Технические характеристики</p>
          {item.charst
            ? item.charst.split('"/"').map((el) => {
                const title = el.split(" - ")[0];
                const value = el.split(" - ")[1];
                return (
                  <div key={el.title}>
                    <div className={styles.charItem}>
                      <p>{title}</p>
                      <p>{value}</p>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      ) : null}
      {selected === "recenz" ? (
        <div className={`${styles.wrapper} ${styles.recenzWrapper}`}>
          <p className={styles.title}>Отзывы</p>

          <div className={styles.recenzItems}>
            {item.reviews ? (
              item.reviews.map((el) => {
                return (
                  <div className={styles.recenzItem} key={el.name}>
                    <div className={styles.headRecenz}>
                      <div className={styles.flex}>
                        <div className={styles.avatar}></div>
                        <div className={styles.titles}>
                          <div className={styles.flex}>
                            <p className={styles.recenzName}>{el.name}</p>
                            <Image
                              src={Stars}
                              alt={"stars"}
                              className={styles.stars}
                            />
                          </div>
                          <p className={styles.recenzOut}>
                            Отзыв оставлен на {el.place}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className={styles.date}>{el.date}</p>
                      </div>
                    </div>
                    <div className={styles.bodyRecenz}>
                      <p className={styles.recenzTitle}>Достоинства</p>
                      <p className={styles.recenzText}>{el.advantages}</p>
                      <p className={styles.recenzTitle}>Недостатки</p>
                      <p className={styles.recenzText}>{el.flaws}</p>
                      <p className={styles.recenzTitle}>Комментарий</p>
                      <p className={styles.recenzText}>{el.comment}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className={styles.recenzOut}>Отзывы отсутствуют</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
