import { Drawer } from "antd";
import Image from "next/image.js";
import Link from "next/link.js";
import { useEffect, useState } from "react";
import Close from "../../../img/close.png";
import Menu from "../../../img/menu.png";
import styles from "./Burger.module.scss";
import { useStore } from "effector-react";
import { $liked, $user, setUser } from "@/state/products";

export const BurgerItem = ({ title, items, subcat = null }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.burgeritem} onClick={() => setOpen(!isOpen)}>
        <p>{title}</p>
        <i className="arrow down "></i>
      </div>
      {isOpen ? (
        <div>
          {subcat
            ? subcat.map((el, i) => (
                <div key={i} className="pl-2 pb-2">
                  <BurgerItem title={el.text} items={el.items} />
                </div>
              ))
            : null}
        </div>
      ) : null}
      {isOpen && !subcat && items.length ? (
        <div className="pl-4">
          {items.map((el, i) => (
            <p className="pb-2" style={{ color: "#009578" }} key={i}>
              <Link href={`/catalog?name=${el.text}`} key={i}>
                {el.text}
              </Link>
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};
