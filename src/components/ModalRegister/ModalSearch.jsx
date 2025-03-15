import * as React from "react";
import styles from "./ModalRegister.module.scss";

import { Modal } from "antd";

import { useState, useEffect } from "react";
import ProductPreviewMini from "../Product/ProductPreviewMini";

export default function ModalSearch({ handleOk, isOpen, cancel }) {
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  useEffect(() => {
    // URL вашего PHP-файла
    const url = `https://u1978287.isp.regruhosting.ru/kryzhok/products/getForSearch.php?search=${value}`;
    // Выполняем запрос
    setPage(1);
    if (value.length >= 3) {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((error) => {});
    } else {
      setData([]);
    }
  }, [value]);
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
          <input
            type="text"
            placeholder="Поиск по сайту..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            {!data.length ? (
              <div className={styles.nothing}>Ничего не найдено</div>
            ) : (
              <div className={styles.searchItems}>
                {data.map((el, i) => (
                  <ProductPreviewMini
                    key={i}
                    width={300}
                    image={false}
                    title={el.name}
                    photo={el.image_preview}
                    text={el.description}
                    id={el.id}
                    chapter={el.category}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
