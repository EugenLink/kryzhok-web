import Recenz from "@/components/Recenz/Recenz.js";
import getLink from "@/hooks/getLinkFromBase.js";
import { Button, message, Select } from "antd";
import Link from "next/link.js";
import { useEffect, useState } from "react";
import styles from "./Edit.module.scss";
import { Images } from "./Images.js";
import { ProductInput } from "./ProductInput.jsx";

export const Edit = ({ products }) => {
  const [selected, setSelected] = useState([]);
  const [ftrProducts, setProducts] = useState([]);
  const [noPhoto, setNoPhoto] = useState(false);
  const [noRecenz, setNoRecenz] = useState(false);
  const [recenzArr, setRecenzArr] = useState([]);
  const [mainState, setMainState] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [text, setText] = useState("Редактирование");
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Товар успешно обновлен",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Произошла ошибка, попробуйте позже.",
    });
  };

  useEffect(() => {
    setProducts(products);
  }, [products]);
  const changeMainState = (name, value) => {
    setMainState({ ...mainState, [name]: value });
  };
  const onChange = (value) => {
    const item = ftrProducts.find((el) => el.id === value);
    setText("Редактирование");
    setSelected(item);
    setMainState(item);
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
  const deleteProduct = () => {
    const answer = window.confirm("Вы уверены что хотите удалить товар?");
    if (answer) {
      fetch(
        `https://u1978287.isp.regruhosting.ru/product/deleteProduct.php?id=${selected.id}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            let editedProducts = ftrProducts.filter(
              (el) => el.id !== selected.id
            );
            setSelected([]);
            setMainState([]);
            setProducts(editedProducts);
            success();
          } else {
            error();
          }
        });
    }
  };

  const createProduct = () => {
    setText("Создание");
    setSelected({
      id: +ftrProducts[ftrProducts.length - 1].id + 1,
      ALI: "",
      AM: "",
      Brend: "",
      Chapter: "",
      Comple: "",
      Cost: "",
      Desc: "",
      Model: "",
      Name: "",
      OZON: "",
      PreChapter: "",
      Raiting: 5,
      WB: "",
      YM: "",
      charst: "",
      descImg: "",
      hit: "",
      images: "",
      new: "",
      previewImg: "",
      recenz: 0,
      recenzItems: [],
    });
    setMainState({
      id: +ftrProducts[ftrProducts.length - 1].id + 1,
      ALI: "",
      AM: "",
      Brend: "",
      Chapter: "",
      Comple: "",
      Cost: "",
      Desc: "",
      Model: "",
      Name: "",
      OZON: "",
      PreChapter: "",
      Raiting: 5,
      WB: "",
      YM: "",
      charst: "",
      descImg: "",
      hit: "",
      images: "",
      new: "",
      previewImg: "",
      recenz: 0,
      recenzItems: [],
    });
  };

  const saveData = () => {
    const fmData = new FormData();

    for (let key in mainState) {
      if (key === "Comple" || key === "Desc" || key === "charst") {
        fmData.append(key, mainState[key].split("\n").join("/"));
      } else if (key != "recenzItems") {
        fmData.append(key, mainState[key]);
      }
    }

    if (ftrProducts.filter((el) => el.id === selected.id).length) {
      fetch(`https://u1978287.isp.regruhosting.ru/product/editProduct.php`, {
        method: "POST",
        body: fmData,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            let editedProducts = products;
            let indexEdit = editedProducts.findIndex(
              (el) => el.id === mainState.id
            );
            editedProducts[indexEdit] = mainState;

            setProducts(editedProducts);
            success();
          } else {
            error();
          }
        });
    } else {
      fetch(`https://u1978287.isp.regruhosting.ru/product/addProduct.php`, {
        method: "POST",
        body: fmData,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            setSelected(mainState);
            setProducts([...ftrProducts, mainState]);
            success();
            setText("Редактирование");
          } else {
            error();
          }
        });
    }
  };
  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <div style={{ width: "60%" }}>
        <p style={{ textAlign: "left", paddingBottom: 10, fontWeight: 600 }}>
          {text} товара
        </p>
        <div className={styles.filtres}>
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

          {selected.id ? (
            <Button
              type="primary"
              style={{ background: "red" }}
              className={styles.buttonSave}
              onClick={() => deleteProduct()}
            >
              Удалить товар
            </Button>
          ) : null}
          <Button
            type="primary"
            className={styles.buttonSave}
            onClick={() => createProduct()}
          >
            Новый товар
          </Button>
          {mainState.id ? (
            <Button
              type="primary"
              style={{ background: "green" }}
              className={styles.buttonSave}
              onClick={() => saveData()}
            >
              Сохранить
            </Button>
          ) : null}
        </div>
      </div>
      {selected.id ? (
        <div className={styles.bodyWrapper}>
          <h2>Основная информация</h2>

          <label>
            <p>Название:</p>
            <ProductInput
              initState={mainState ? mainState.Name : null}
              change={(init) => changeMainState("Name", init)}
            />
          </label>

          <label>
            <p>Модель:</p>
            <ProductInput
              initState={mainState ? mainState.Model : null}
              change={(init) => changeMainState("Model", init)}
            />
          </label>

          <label>
            <p>Раздел:</p>
            <ProductInput
              initState={mainState ? mainState.PreChapter : null}
              change={(init) => changeMainState("PreChapter", init)}
            />
          </label>

          <label>
            <p>Категория:</p>
            <ProductInput
              initState={mainState ? mainState.Chapter : null}
              change={(init) => changeMainState("Chapter", init)}
            />
          </label>

          <label>
            <p>Бренд:</p>
            <ProductInput
              initState={mainState ? mainState.Brend : null}
              change={(init) => changeMainState("Brend", init)}
            />
          </label>

          <label>
            <p>Цена:</p>
            <ProductInput
              initState={mainState ? mainState.Cost : null}
              change={(init) => changeMainState("Cost", init)}
            />
          </label>

          <h2>Ссылки</h2>

          <label>
            <p>ВБ:</p>
            <ProductInput
              initState={mainState ? mainState.WB : null}
              change={(init) => changeMainState("WB", init)}
            />
          </label>

          <label>
            <p>ЯМ:</p>
            <ProductInput
              initState={mainState ? mainState.YM : null}
              change={(init) => changeMainState("YM", init)}
            />
          </label>

          <label>
            <p>OZON:</p>
            <ProductInput
              initState={mainState ? mainState.OZON : null}
              change={(init) => changeMainState("OZON", init)}
            />
          </label>

          <label>
            <p>АМ:</p>
            <ProductInput
              initState={mainState ? mainState.AM : null}
              change={(init) => changeMainState("AM", init)}
            />
          </label>

          <h2>Описание и комплектация</h2>

          <label>
            <p>Описание:</p>
            <ProductInput
              initState={
                mainState ? mainState.Desc.split("/").join("\r\n") : null
              }
              change={(init) => changeMainState("Desc", init)}
              type="textarea"
            />
          </label>

          <label>
            <p>Комплектация:</p>
            <ProductInput
              initState={
                mainState ? mainState.Comple.split("/").join("\r\n") : null
              }
              change={(init) => changeMainState("Comple", init)}
              type="textarea"
            />
          </label>
          <label>
            <p>Xарактеристики</p>
            <ProductInput
              initState={
                mainState ? mainState.charst.split("/").join("\r\n") : null
              }
              change={(init) => changeMainState("charst", init)}
              type="textarea"
            />
          </label>
        </div>
      ) : null}
      {selected.id &&
      ftrProducts.filter((el) => el.id === selected.id).length ? (
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
              ftrProducts.map((el) =>
                el.id === id ? (el.images = value) : null
              );
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
              ftrProducts.map((el) =>
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

          <h2>Отзывы</h2>
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
                        ftrProducts.map((el) =>
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
              ftrProducts.map((el) =>
                el.id === id ? (el.recenz = value) : null
              );
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
