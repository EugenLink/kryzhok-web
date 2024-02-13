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
import styles from "./SearchMobile.module.scss";

export const SearchMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className={styles.search}>
      <div className={`${styles.searchWrapper} `}>
        <Image
          src={"/icons/searchgray.png"}
          alt={"searchiocn"}
          width={16}
          height={16}
          onClick={() => setIsOpen(true)}
        />
      </div>

      <div
        className={`${styles.wrapper} ${isOpen ? styles.open : styles.close}`}
      >
        <div className={styles.flex}>
          <label className={`${styles.inputWrapper}`}>
            <input
              type="text"
              placeholder={"Поиск по товарам"}
              onFocus={() => setIsSearchFocus(true)}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onBlur={() => {
                const timer = setTimeout(() => setIsSearchFocus(false), 200);
              }}
              className={`${
                isSearchFocus && value.length > 3 ? styles.shadow : null
              } `}
            />
          </label>
          <Image
            src={"/icons/close.png"}
            alt={"searchIcon"}
            width={"20"}
            onClick={() => {
              setValue("");
              setIsOpen(false);
            }}
            height={"20"}
            className={styles.icon}
          />
        </div>

        {value.length > 3 ? (
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
        ) : null}
      </div>
    </div>
  );
};
