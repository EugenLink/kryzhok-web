import Recenz from "@/components/Recenz/Recenz.js";
import Image from "next/image.js";
import styles from "./ProductCategories.module.scss";

export const ProductCategories = ({ item, selected, setSelected }) => {
  return (
    <div className={styles.categories} id={"recenz"}>
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
              src={`http://u1978287.isp.regruhosting.ru/product/photos/${item.id}/descImg/${item.descImg}`}
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
            ? item.charst.split('"/"').map((el, i) => {
                const title = el.split(" - ")[0];
                const value = el.split(" - ")[1];
                return (
                  <div key={i}>
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
            {item.recenzItems?.length ? (
              item.recenzItems.map((el) => {
                return (
                  <Recenz
                    key={el.id}
                    name={el.name}
                    flaws={el.flaws}
                    date={el.date}
                    comment={el.comment}
                    advantages={el.advantages}
                    place={el.place}
                    stars={el.stars}
                  />
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
