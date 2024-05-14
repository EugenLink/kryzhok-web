import { Drawer } from "antd";
import Image from "next/image.js";
import Link from "next/link.js";
import { useState } from "react";
import Close from "../../../img/close.png";
import Menu from "../../../img/menu.png";
import styles from "./Burger.module.scss";

export const Burger = () => {
  const [open, setOpen] = useState(false);
  const [openCatalog, setOpenCatalog] = useState(true);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Image
        src={Menu}
        alt="321321"
        onClick={showDrawer}
        style={{ cursor: "pointer" }}
        className={styles.openMenu}
      />
      <Drawer
        className={styles.menu}
        placement="left"
        onClose={onClose}
        open={open}
        zIndex={1000002}
        closeIcon={
          <Image src={Close} alt="321321" className={styles.closeMenuButton} />
        }
        headerStyle={{ border: "none" }}
      >
        <div className={styles.catalogMobile}>
          <p
            className={styles.catalogList}
            onClick={() => setOpenCatalog(!openCatalog)}
          >
            <span>Каталог </span> <i className="arrow down"></i>
          </p>
          {openCatalog ? (
            <ul>
              <li onClick={() => setOpen(false)}>
                <Link href="/catalog/home?name=Дом">Дом</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link href="/catalog/kitchen?name=Кухня">Кухня</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link href="/catalog/dishes?name=Посуда">Посуда</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link href="/catalog/climate?name=Климат">Климат</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link href="/catalog/sport?name=Сад и спорт">Сад и спорт</Link>
              </li>
            </ul>
          ) : null}
        </div>
        <p>
          <Link href="/news">Новости</Link>
        </p>
        <p>
          <Link href="/recipes">Рецепты</Link>
        </p>
        <p>
          <Link href="/articles">Статьи</Link>
        </p>
        <p>
          <Link href="/where-buy">Где купить</Link>
        </p>
        <p className={styles.catalogMobile}>
          <Link href="/brends">Бренды</Link>
        </p>
        <p className={styles.catalogMobile}>
          <Link href="/feedback">Обратная связь</Link>
        </p>
        <p>
          <Link href="/about">О нас</Link>
        </p>
      </Drawer>
    </div>
  );
};
