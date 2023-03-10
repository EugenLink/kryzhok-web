import Recenz from "@/components/Recenz/Recenz.js";
import { Select } from "antd";
import { useEffect, useState } from "react";
import styles from "./Edit.module.scss";
import { Images } from "./Images.js";

export const Edit = ({ products }) => {
  const [selected, setSelected] = useState(0);
  const [item, setItem] = useState([]);
  const onChange = (value) => {
    setSelected(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  useEffect(() => {
    setItem(products.find((el) => el.id === selected));
  }, [selected, products]);
  return (
    <div className={styles.wrapper}>
      <div style={{ width: "60%" }}>
        <p style={{ textAlign: "left", paddingBottom: 10, fontWeight: 600 }}>
          Выберите товар
        </p>
        <Select
          className={styles.select}
          showSearch
          placeholder="Выберите товар"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={products?.map((el) => {
            return { value: el.id, label: `${el.Name} ${el.Model}` };
          })}
        />
      </div>

      {selected !== 0 ? (
        <div className={styles.bodyWrapper}>
          <h2>Фото</h2>
          <Images
            images={products.filter((el) => el.id === selected)[0]?.images}
            id={selected}
            title={"Фото в карточке товара"}
            type={"images"}
            count={6}
          />
          <Images
            images={products.find((el) => el.id === selected)?.previewImg}
            id={selected}
            title={"Фото превью"}
            type={"previewImg"}
            count={1}
          />
          <Images
            images={products.find((el) => el.id === selected)?.descImg}
            id={selected}
            title={"Фото для описания"}
            type={"descImg"}
            count={1}
          />
          <h2>Отзывы </h2>
          <div className={styles.recenzItems}>
            <p
              style={{
                fontWeight: 600,
                padding: "30px 10px",
                textAlign: "center",
              }}
            >
              Текущие отзывы - {item?.recenz}
            </p>
            {item ? (
              item.recenzItems.map((el) => {
                return (
                  <div key={el.id}>
                    <Recenz
                      name={el.name}
                      flaws={el.flaws}
                      date={el.date}
                      comment={el.comment}
                      advantages={el.advantages}
                      place={el.place}
                      stars={el.stars}
                      deleteItem={true}
                      count={item?.recenzItems.length}
                      id={el.product_id}
                      itemId={el.id}
                    />
                  </div>
                );
              })
            ) : (
              <p className={styles.recenzOut}>Отзывы отсутствуют</p>
            )}
          </div>
          <p
            style={{
              fontWeight: 600,
              padding: "30px 10px",
              textAlign: "center",
            }}
          >
            Добавить новый
          </p>
          <Recenz edit={true} id={item?.id} count={item?.recenzItems.length} />
        </div>
      ) : null}
    </div>
  );
};
