import { Drawer } from "antd";
import Image from "next/image.js";
import Link from "next/link.js";
import { useEffect, useState } from "react";
import Close from "../../../img/close.png";
import Menu from "../../../img/menu.png";
import styles from "./Burger.module.scss";
import { useStore } from "effector-react";
import { $liked, $user, setUser } from "@/state/products";
import { category } from "@/json/newCategotry";
import { BurgerItem } from "./BurgerItem";

export const Burger = ({ showModalSearch, showModalFav }) => {
  const [open, setOpen] = useState(false);
  const [openCatalog, setOpenCatalog] = useState(true);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const user = useStore($user); // Получаем данные пользователя из хранилища
  const liked = useStore($liked); // Получаем данные пользователя из хранилища
  const showModal = () => {
    setIsModalOpen(true);
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
          <p className={styles.catalogList}>
            <span>Каталог </span>
          </p>

          <ul>
            {category.map((el, i) => {
              return (
                <BurgerItem
                  key={i}
                  title={el.text}
                  subcat={el.subcat}
                  items={el.items}
                />
              );
            })}
          </ul>
        </div>
        <p style={{ padding: 5 }}>
          <Link
            className="text-[#0e141b] text-sm font-medium leading-normal"
            href="/news"
          >
            Новости
          </Link>
        </p>
        <p style={{ padding: 5 }}>
          {" "}
          <Link
            className="text-[#0e141b] text-sm font-medium leading-normal"
            href="/articles"
          >
            Меропириятия
          </Link>
        </p>
        <p style={{ padding: 5 }}>
          <Link
            className="text-[#0e141b] text-sm font-medium leading-normal"
            href="/about"
          >
            О нас
          </Link>
        </p>
        <p style={{ padding: 5 }}>
          <Link
            className="text-[#0e141b] text-sm font-medium leading-normal"
            href="/feedback"
          >
            Помощь
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setOpen(false);
              showModalSearch();
            }}
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7edf3] text-[#0e141b] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
          >
            <div
              className="text-[#0e141b]"
              data-icon="Bell"
              data-size="20px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
          </button>
          <button
            onClick={() => {
              setOpen(false);
              showModalFav();
            }}
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7edf3] text-[#0e141b] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
            style={{ position: "relative" }}
          >
            <p className={styles.likedItems}>
              {liked?.split(",").filter((el) => el.length).length}
            </p>
            <div
              className="text-[#0e141b]"
              data-icon="Globe"
              data-size="20px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"></path>
              </svg>
            </div>
          </button>
        </div>
      </Drawer>
    </div>
  );
};
