import Recenz from "@/components/Recenz/Recenz.js";
import { Select } from "antd";
import { useState } from "react";
import styles from "./Edit.module.scss";
import { Images } from "./Images.js";

export const Edit = ({ products }) => {
  const [selected, setSelected] = useState([]);
  const onChange = (value) => {
    const item = products.find((el) => el.id === value);
    setSelected(item);
    setRecenzArr(
      item.recenzItems?.map((el) => {
        return {
          name: el.name,
          flaws: el.flaws,
          date: el.date,
          comment: el.comment,
          advantages: el.advantages,
          place: el.place,
          stars: el.stars,
          id: el.product_id,
          itemId: el.id,
        };
      })
    );
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  console.log(selected);
  const [recenzArr, setRecenzArr] = useState([]);

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

      {selected.id ? (
        <div className={styles.bodyWrapper}>
          <h2>Фото</h2>
          <Images
            images={selected?.images}
            id={selected?.id}
            title={"Фото в карточке товара"}
            type={"images"}
            count={6}
          />
          <Images
            images={selected?.previewImg}
            id={selected?.id}
            title={"Фото превью"}
            type={"previewImg"}
            count={1}
          />
          <Images
            images={selected?.descImg}
            id={selected?.id}
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
              Текущие отзывы - {recenzArr.length}
            </p>
            {recenzArr ? (
              recenzArr.map((el) => {
                return (
                  <div key={el.itemId}>
                    <Recenz
                      name={el.name}
                      flaws={el.flaws}
                      date={el.date}
                      comment={el.comment}
                      advantages={el.advantages}
                      place={el.place}
                      stars={el.stars}
                      deleteItem={true}
                      count={recenzArr.length}
                      id={el.id}
                      itemId={el.itemId}
                      funcDelete={() =>
                        setRecenzArr(
                          recenzArr.filter((el2) => el2.itemId !== el.itemId)
                        )
                      }
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
          <Recenz
            edit={true}
            id={selected?.id}
            count={recenzArr.length}
            funcAdd={(arr) => setRecenzArr([...recenzArr, arr])}
          />
        </div>
      ) : null}
    </div>
  );
};
