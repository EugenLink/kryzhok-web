import * as React from "react";
import styles from "./ModalRegister.module.scss";

import { Modal } from "antd";
import { $liked, $user } from "@/state/products";
import { useStore } from "effector-react";
import ProductPreviewMini from "../Product/ProductPreviewMini";

export default function ModalFavorites({ handleOk, isOpen, cancel }) {
  // Пустой массив зависимостей означает, что запрос выполнится один раз при монтировании
  const user = useStore($user);
  const liked = useStore($liked); // Получаем данные пользователя из хранилища
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    // URL вашего PHP-файла
    // Выполняем запрос
    setPage(1);
    let ids = [];
    if (user) {
      ids = user.likes.length ? user.likes?.split(",") : [];
    } else {
      let items = localStorage.getItem("likes");
      items = items ? items : "";

      ids = items.length ? items.split(",") : [];
    }
    if (ids.length) {
      const url = `https://u1978287.isp.regruhosting.ru/kryzhok/products/get_favor.php?ids=[${ids}]`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setData(data.data);
          }
        })
        .catch((error) => console.log("Ошибка:", error));
    } else {
      setData([]);
    }
  }, [isOpen, user, liked]);
  return (
    <div className={styles.wrapper}>
      <Modal
        open={isOpen}
        onOk={handleOk}
        onCancel={cancel}
        footer={null}
        width={1050}
        closable={true}
      >
        <div className={styles.searchWrapper}>
          <h1 style={{ padding: 20, fontSize: 24, fontWeight: 500 }}>
            Вам понравилось:
          </h1>
          {!data.length ? (
            <div className={styles.nothing}>Ничего нет</div>
          ) : (
            <div className={styles.searchItems}>
              {data.map((el, i) => (
                <ProductPreviewMini
                  key={i}
                  width={260}
                  title={el.name}
                  photo={el.image_preview}
                  text={el.description}
                  id={el.id}
                  chapter={el.category}
                  likedPop={true}
                />
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
