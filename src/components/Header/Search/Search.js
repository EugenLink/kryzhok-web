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
import Close from "../../../img/closeGray.png";
import SearchImg from "../../../img/searchgray.png";
import styles from "./Search.module.scss";

export const SearchWrapper = () => {
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchList, setSearchList] = useState(false);
  const value = useStore($value);
  const products = useStore($products);
  const [funcName, setFuncName] = useState(null);

  const searchItems = useStore($searchItems);
  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }
  }, [products.length]);

  return (
    <>
      <div className={styles.searchNewWrapper}>
        <div
          className={`${styles.searchWrapper} ${
            searchStatus ? styles.openWrapper : null
          }`}
        >
          <input
            type="text"
            placeholder="Поиск по товарам"
            className={`${styles.searchInput} ${
              searchList && value.length > 3 ? styles.searched : null
            }`}
            value={value}
            onChange={(e) => {
              if (e.target.value > 3) {
                setSearchList(true);
              }

              setValue(e.target.value);
            }}
            onFocus={() => setSearchList(true)}
            onBlur={() => {
              const timer = setTimeout(() => setSearchList(false), 100);
            }}
          />

          <div className={styles.dropDown}>
            {searchList && value.length > 3 ? (
              <ul className={styles.searchDrop}>
                <p className={styles.searchDropLabel}>Поиск: {value}</p>
                {searchItems.length ? (
                  searchItems.map((el) => {
                    return (
                      <Link
                        href={getLink(el.Chapter, el.PreChapter, el.id)}
                        key={el.id}
                      >
                        <li
                          className={styles.searchItem}
                          onClick={() => console.log(1111)}
                        >
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
            ) : null}
          </div>

          {searchStatus || value.length ? (
            <Image
              src={Close}
              alt="Close"
              className={styles.closeImgPhone}
              onClick={() => {
                setValue("");
                setSearchStatus(false);
              }}
            />
          ) : (
            <Image
              src={SearchImg}
              alt="Search"
              className={styles.searchInputImg}
            />
          )}
        </div>
        <div
          className={styles.searchWrapperPhone}
          onClick={() => setSearchStatus(true)}
          style={searchStatus ? { display: "none" } : null}
        >
          <Image
            src={SearchImg}
            alt="Search"
            className={styles.searchInputImgPhone}
          />
        </div>
      </div>
    </>
  );
};
