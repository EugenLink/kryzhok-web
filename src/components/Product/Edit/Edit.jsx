import Recenz from "@/components/Recenz/Recenz.js";
import getLink from "@/hooks/getLinkFromBase.js";
import { Checkbox, Select } from "antd";
import Link from "next/link.js";
import { useEffect, useState } from "react";
import styles from "./Edit.module.scss";
import { Images } from "./Images.js";

export const Edit = ({ products }) => {
  const [selected, setSelected] = useState([]);
  const [ftrProducts, setProducts] = useState(products);
  const [noPhoto, setNoPhoto] = useState(false);
  const [noRecenz, setNoRecenz] = useState(false);
  const [recenzArr, setRecenzArr] = useState([]);

  useEffect(() => {
    let productsItems = products;

    if (noPhoto && noRecenz) {
      console.log(noRecenz, noPhoto);
      productsItems = productsItems.filter(
        (el) =>
          el.images.length === 0 ||
          el.previewImg.length === 0 ||
          el.descImg.length === 0 ||
          el.recenz == 0
      );
    } else if (noPhoto) {
      productsItems = productsItems.filter(
        (el) =>
          el.images.length === 0 ||
          el.previewImg.length === 0 ||
          el.descImg.length === 0
      );
    } else if (noRecenz) {
      productsItems = productsItems.filter((el) => el.recenz == 0);
    }

    setProducts(productsItems);
  }, [products, noPhoto, noRecenz, selected]);

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

  return (
    <div className={styles.wrapper}>
      <div style={{ width: "60%" }}>
        <p style={{ textAlign: "left", paddingBottom: 10, fontWeight: 600 }}>
          Редактирование товара
        </p>
        <div className={styles.filtres}>
          <Checkbox onChange={(e) => setNoPhoto(e.target.checked)}>
            Нет фото
          </Checkbox>
          <Checkbox onChange={(e) => setNoRecenz(e.target.checked)}>
            Нет отзывов
          </Checkbox>
          <p className={styles.counter}>Кол-во: {ftrProducts.length}</p>
        </div>
        <div className={styles.flex}>
          <Select
            className={styles.select}
            showSearch
            placeholder="Выберите товар"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={ftrProducts.map((el) => {
              return { value: el.id, label: `${el.Name} ${el.Model}` };
            })}
          />
          {selected.id ? (
            <Link
              href={getLink(selected.Chapter, selected.PreChapter, selected.id)}
              legacyBehavior
            >
              <a target="_blank" rel="noreferrer" className={styles.buttonLink}>
                Страница товара
              </a>
            </Link>
          ) : null}
        </div>
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
            func={(id, value) => {
              setSelected({ ...selected, images: value });
              products.map((el) => (el.id === id ? (el.images = value) : null));
            }}
          />
          <Images
            images={selected?.previewImg}
            id={selected?.id}
            title={"Фото превью"}
            type={"previewImg"}
            count={1}
            func={(id, value) => {
              setSelected({ ...selected, previewImg: value });
              products.map((el) =>
                el.id === id ? (el.previewImg = value) : null
              );
            }}
          />
          <Images
            images={selected?.descImg}
            id={selected?.id}
            title={"Фото для описания"}
            type={"descImg"}
            count={1}
            func={(id, value) => {
              setSelected({ ...selected, descImg: value });
              products.map((el) =>
                el.id === id ? (el.descImg = value) : null
              );
            }}
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
                      funcRefresh={(id, value) => {
                        setSelected({ ...selected, recenz: value });
                        products.map((el) =>
                          el.id === id ? (el.recenz = value) : null
                        );
                      }}
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
            Добавить отзыв
          </p>
          <Recenz
            edit={true}
            id={selected?.id}
            count={recenzArr.length}
            funcAdd={(arr) => setRecenzArr([...recenzArr, arr])}
            funcRefresh={(id, value) => {
              setSelected({ ...selected, recenz: value });
              products.map((el) => (el.id === id ? (el.recenz = value) : null));
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
