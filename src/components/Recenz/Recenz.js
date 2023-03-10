import Star from "@/img/star.png";
import StarOutline from "@/img/StarOutline.png";
import { Button, message, Rate } from "antd";

import Image from "next/image.js";
import { useState } from "react";
import styles from "./Recenz.module.scss";

const Recenz = ({
  name = "Ольга К   ",
  stars = 0,
  place = "",
  date = "23.10.00",
  advantages = "",
  flaws = "",
  comment = "32131",
  edit = false,
  id = 0,
  deleteItem = false,
  count = 0,
  itemId = 0,
  funcDelete,
  funcAdd,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [recenzForm, setRecenzForm] = useState({
    name: "",
    stars: 0,
    place: "",
    date: "",
    advantages: "",
    flaws: "",
    comment: "",
  });

  const sendForm = () => {
    const fmData = new FormData();

    fmData.append("name", recenzForm.name);
    fmData.append("stars", recenzForm.stars);
    fmData.append("place", recenzForm.place);
    fmData.append("date", recenzForm.date);
    fmData.append("advantages", recenzForm.advantages);
    fmData.append("flaws", recenzForm.flaws);
    fmData.append("comment", recenzForm.comment);
    fmData.append("id", id);
    fmData.append("count", count + 1);

    fetch(`https://volga24bot.com/cgi-bin/recenz/addRecenz.php`, {
      method: "POST",
      body: fmData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res !== "false") {
          funcAdd({
            name: recenzForm.name,
            flaws: recenzForm.flaws,
            date: recenzForm.date,
            comment: recenzForm.comment,
            advantages: recenzForm.advantages,
            place: recenzForm.place,
            stars: recenzForm.stars,
            id: id,
            itemId: +res,
          });
          messageApi.success("Отзыв оставлен успешно");
          setRecenzForm({
            name: "",
            stars: 0,
            place: "",
            date: "",
            advantages: "",
            flaws: "",
            comment: "",
          });
        } else {
          messageApi.error("Произошла ошибка, отзыв не оставлен");
        }
      });
  };

  const deleteRecenz = () => {
    if (confirm("Вы уверены что хотите удалить отзыв?")) {
      fetch(
        `https://volga24bot.com/cgi-bin/recenz/deleteRecenz.php?id=${id}&idR=${itemId}&count=${
          count - 1
        }`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res === "true") {
            funcDelete();
            messageApi.success("Отзыв удален успешно");
          } else {
            messageApi.error("Произошла ошибка, отзыв не удален");
          }
        });
    }
  };
  return edit ? (
    <div className={styles.recenzItem}>
      {contextHolder}
      <div className={styles.headRecenz}>
        <div className={styles.flex}>
          <div className={styles.avatar}>
            <Image src="/user.png" alt="avatar" width={"45"} height={"45"} />
          </div>

          <div className={styles.titles}>
            <div className={styles.flex}>
              <input
                type="text"
                className={`${styles.recenzName} ${styles.input}`}
                placeholder={"Имя"}
                value={recenzForm.name}
                onChange={(e) =>
                  setRecenzForm({ ...recenzForm, name: e.target.value })
                }
              />

              <Rate
                value={recenzForm.stars}
                onChange={(e) => setRecenzForm({ ...recenzForm, stars: e })}
              />
            </div>
            <p className={styles.recenzOut}>
              Отзыв оставлен на
              <input
                type="text"
                className={`${styles.recenzName} ${styles.input}`}
                placeholder={"Откуда отзыв"}
                value={recenzForm.place}
                onChange={(e) =>
                  setRecenzForm({ ...recenzForm, place: e.target.value })
                }
              />
            </p>
          </div>
        </div>
        <div>
          <p className={styles.date}>
            <input
              type="text"
              className={`${styles.recenzName} ${styles.input}`}
              placeholder={"Дата"}
              value={recenzForm.date}
              onChange={(e) =>
                setRecenzForm({ ...recenzForm, date: e.target.value })
              }
            />
          </p>
        </div>
      </div>
      <div className={styles.bodyRecenz}>
        <p className={styles.recenzTitle}>Достоинства</p>
        <p className={styles.recenzText}>
          <input
            type="text"
            className={`${styles.recenzName} ${styles.input}`}
            placeholder={"Достоинства"}
            style={{ width: "100%" }}
            value={recenzForm.advantages}
            onChange={(e) =>
              setRecenzForm({ ...recenzForm, advantages: e.target.value })
            }
          />
        </p>
        <p className={styles.recenzTitle}>Недостатки</p>
        <p className={styles.recenzText}>
          <input
            type="text"
            className={`${styles.recenzName} ${styles.input}`}
            placeholder={"Недостатки"}
            style={{ width: "100%" }}
            value={recenzForm.flaws}
            onChange={(e) =>
              setRecenzForm({ ...recenzForm, flaws: e.target.value })
            }
          />
        </p>
        <p className={styles.recenzTitle}>Комментарий</p>
        <p className={styles.recenzText}>
          <input
            type="text"
            className={`${styles.recenzName} ${styles.input}`}
            placeholder={"Комментарий"}
            style={{ width: "100%" }}
            value={recenzForm.comment}
            onChange={(e) =>
              setRecenzForm({ ...recenzForm, comment: e.target.value })
            }
          />
        </p>
      </div>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Button type="primary" style={{ marginTop: "15px" }} onClick={sendForm}>
          Сохранить
        </Button>
      </div>
    </div>
  ) : (
    <div className={styles.recenzItem}>
      {contextHolder}
      <div className={styles.headRecenz}>
        <div className={styles.flex}>
          <div className={styles.avatar}>
            <Image src="/user.png" alt="avatar" width={"45"} height={"45"} />
          </div>
          <div className={styles.titles}>
            <div className={styles.flex}>
              <p className={styles.recenzName}>{name}</p>
              <div className={styles.stars}>
                {[...Array(+stars)].map((el, i) => {
                  return (
                    <Image
                      src={Star}
                      alt={"stars"}
                      key={i}
                      className={styles.star}
                    />
                  );
                })}
                {[...Array(5 - stars)].map((el, i) => {
                  return (
                    <Image
                      src={StarOutline}
                      alt={"stars"}
                      key={i}
                      className={styles.star}
                    />
                  );
                })}
              </div>
            </div>
            <p className={styles.recenzOut}>Отзыв оставлен на {place}</p>
          </div>
        </div>
        <div>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
      <div className={styles.bodyRecenz}>
        <p className={styles.recenzTitle}>Достоинства</p>
        <p className={styles.recenzText}>{advantages}</p>
        <p className={styles.recenzTitle}>Недостатки</p>
        <p className={styles.recenzText}>{flaws}</p>
        <p className={styles.recenzTitle}>Комментарий</p>
        <p className={styles.recenzText}>{comment}</p>
        {deleteItem ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              type="primary"
              style={{ marginTop: "15px", marginRight: 20 }}
              onClick={deleteRecenz}
              danger
            >
              Удалить
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Recenz;
