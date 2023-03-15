import FullScreen from "@/components/FullScreen/FullScreen.jsx";
import getLink from "@/hooks/getLinkFromBase.js";
import {
  $products,
  $searchItems,
  $value,
  getProducts,
  setValue,
} from "@/state/products.js";
import { useStore } from "effector-react";
import Image from "next/image.js";
import Link from "next/link.js";
import { useEffect, useState } from "react";
import styles from "./Search.module.scss";

export const SearchDesctop = () => {
  const value = useStore($value);
  const products = useStore($products);
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const searchItems = useStore($searchItems);
  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }
  }, [products.length]);

  return (
    <>
      {isSearchFocus && value.length > 3 ? <FullScreen /> : null}

      <div className={`${styles.searchWrapper} `}>
        <label className={styles.inputWrapper}>
          <input
            type="text"
            placeholder={"Поиск по товарам"}
            onFocus={() => setIsSearchFocus(true)}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              const timer = setTimeout(() => setIsSearchFocus(false), 200);
            }}
            className={`${
              isSearchFocus && value.length > 3 ? styles.shadow : null
            } ${isSearchFocus && value.length > 3 ? styles.searched : null}`}
          />
          {value.length > 3 ? (
            <Image
              src={"/icons/closeGray.png"}
              alt={"searchIcon"}
              width={"20"}
              onClick={() => {
                setValue("");
                setIsSearchFocus(false);
              }}
              height={"20"}
              className={styles.icon}
            />
          ) : (
            <Image
              src={"/icons/searchgray.png"}
              alt={"searchIcon"}
              width={"20"}
              height={"20"}
              className={styles.icon}
            />
          )}
        </label>
        {isSearchFocus && value.length > 3 ? (
          <>
            <div
              className={`${
                isSearchFocus && value.length > 3 ? styles.shadow : null
              } ${styles.dropDown}`}
            >
              <ul className={styles.searchDrop}>
                <p className={styles.searchDropLabel}>Поиск: {value}</p>
                {searchItems?.length ? (
                  searchItems?.map((el) => {
                    return (
                      <Link
                        href={getLink(el.Chapter, el.PreChapter, el.id)}
                        key={el.id}
                      >
                        <li className={styles.searchItem}>
                          <p className={styles.searchItemName}>
                            {el.Name} {el.Model}
                          </p>
                          <p className={styles.searchItemCost}>
                            {el.Cost} <span className={styles.rub}></span>
                          </p>
                        </li>
                      </Link>
                    );
                  })
                ) : (
                  <p className={styles.empty}>Ничего не найдено</p>
                )}
              </ul>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
