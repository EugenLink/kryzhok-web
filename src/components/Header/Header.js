import Image from "next/image.js";
import Link from "next/link.js";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { category } from "../../json/newCategotry";
import ModalRegister from "../ModalRegister/ModalRegister";
import DynamicColumnLayout from "../DynamicColumnLayout/DynamicColumnLayout";
import ModalSearch from "../ModalRegister/ModalSearch";
import { Popover } from "antd";
import ModalChangePass from "../ModalRegister/ModalChangePass";
import { $liked, $user, setLiked, setUser } from "@/state/products";
import { useStore } from "effector-react";
import ModalFavorites from "../ModalRegister/ModalFavorites";
import HeaderMobile from "./HeaderModile";

export default function Header() {
  const [isShown, setIsShown] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSearch, setIsModalOpenSearch] = useState(false);
  const [isModalOpenChange, setIsModalOpenChange] = useState(false);
  const [isModalOpenFav, setIsModalOpenFav] = useState(false);
  const [visible, setVisible] = useState(false);

  const [funcName, setFuncName] = useState(null);
  const [dropState, setDropState] = useState({ item: null, title: "" });
  const [dropStateSecond, setDropStateSecond] = useState({
    items: [],
    title: "",
  });
  const user = useStore($user); // Получаем данные пользователя из хранилища
  const liked = useStore($liked); // Получаем данные пользователя из хранилища

  useEffect(() => {
    const data = localStorage.getItem("user");

    setUser(data ? JSON.parse(localStorage.getItem("user")) : null);
    if (data) {
      setLiked(JSON.parse(data).likes);
    } else {
      setLiked(
        localStorage.getItem("likes") ? localStorage.getItem("likes") : ""
      );
    }
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModalSearch = () => {
    setIsModalOpenSearch(true);
  };
  const handleCancelSearch = () => {
    setIsModalOpenSearch(false);
  };
  const handleOkSearch = () => {
    setIsModalOpenSearch(false);
  };
  const showModalChange = () => {
    setIsModalOpenChange(true);
  };
  const handleCancelChange = () => {
    setIsModalOpenChange(false);
  };
  const handleOkChange = () => {
    setIsModalOpenChange(false);
  };
  const showModalFav = () => {
    setIsModalOpenFav(true);
  };
  const handleCancelFav = () => {
    setIsModalOpenFav(false);
  };
  const handleOkFav = () => {
    setIsModalOpenFav(false);
  };
  const content = (
    <div className={styles.popoverDrop}>
      {user?.type === "comp" ? (
        <Link href={"/dashboard"} onClick={() => setVisible(false)}>
          <p>Личный кабинет</p>
        </Link>
      ) : null}

      <p
        onClick={() => {
          showModalChange(true);
          setVisible(false);
        }}
      >
        Сменить пароль
      </p>
      <p
        onClick={() => {
          localStorage.removeItem("user");
          setUser(null);
          setVisible(false);
          setLiked(localStorage.getItem("likes"));
        }}
      >
        Выйти
      </p>
    </div>
  );

  return (
    <>
      <HeaderMobile />
      <header className="displayNone flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf3] px-10 py-3">
        <ModalRegister
          cancel={handleCancel}
          isOpen={isModalOpen}
          handleOk={handleOk}
        />
        <ModalSearch
          cancel={handleCancelSearch}
          isOpen={isModalOpenSearch}
          handleOk={handleOkSearch}
        />
        <ModalChangePass
          cancel={handleCancelChange}
          isOpen={isModalOpenChange}
          handleOk={handleOkChange}
        />
        <ModalFavorites
          cancel={handleCancelFav}
          isOpen={isModalOpenFav}
          handleOk={handleOkFav}
        />
        <Link href="/">
          <div className="flex items-center gap-4 text-[#0e141b]">
            <div className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_319">
                    <rect width="48" height="48" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em]">
              Кружок
            </h2>
          </div>
        </Link>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9 displayNone">
            <a
              className="text-[#0e141b] text-sm font-medium leading-normal"
              href="#"
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => {
                const timer = setTimeout(() => {
                  setIsShown(false);
                }, 200);
                setFuncName(timer);
              }}
            >
              Каталог
            </a>
            <Link
              className="text-[#0e141b] text-sm font-medium leading-normal"
              href="/news"
            >
              Новости
            </Link>
            <Link
              className="text-[#0e141b] text-sm font-medium leading-normal"
              href="/articles"
            >
              Меропириятия
            </Link>
            <Link
              className="text-[#0e141b] text-sm font-medium leading-normal"
              href="/about"
            >
              О нас
            </Link>
            <Link
              className="text-[#0e141b] text-sm font-medium leading-normal"
              href="/feedback"
            >
              Помощь
            </Link>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => showModalSearch()}
              className=" displayNone flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7edf3] text-[#0e141b] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
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
              onClick={() => showModalFav()}
              className="displayNone flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7edf3] text-[#0e141b] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
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
          {user ? (
            <Popover
              content={content}
              trigger="click"
              open={visible}
              title={user.type === "user" ? "Пользователь" : "Компания"}
              overlayStyle={{ width: 200 }}
            >
              <div
                className={styles.underLogin}
                onClick={() => setVisible(!visible)}
              >
                <p>{user.username}</p>
              </div>
            </Popover>
          ) : (
            <div
              onClick={() => showModal()}
              className=" bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 cursor-pointer"
              style={{
                backgroundImage:
                  'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTdmrjoiXGVFEcd1cX9Arb1itXTr2u8EKNpw&s")',
              }}
            ></div>
          )}
        </div>
        <div
          className={styles.catalogUnderWrapper}
          style={isShown ? { display: "flex" } : { display: "none" }}
          onMouseEnter={() => {
            clearTimeout(funcName);
            setIsShown(true);
          }}
        >
          <div
            className={styles.whiteWrapper}
            onMouseLeave={() => setIsShown(false)}
          >
            <div className={styles.catalogWrapper}>
              <div className={styles.selectCatalogMenu}>
                <ul className={styles.selectMenuList}>
                  {category.map((el, i) => {
                    return (
                      <li
                        className={
                          dropState.title === el.text
                            ? styles.selectedItem
                            : null
                        }
                        key={i}
                        onClick={() => {
                          if (el.subcat) {
                            setDropState({ item: el, title: el.text });
                            setDropStateSecond({ items: [], title: "" });
                          } else {
                            setDropState({ item: null, title: el.text });
                            setDropStateSecond({
                              items: el.items,
                              title: el.text,
                            });
                          }
                        }}
                      >
                        {el.text}
                      </li>
                    );
                  })}
                </ul>
              </div>
              {dropState.item && dropState.item.subcat ? (
                <div className={styles.selectCatalogMenu}>
                  {dropState.item && dropState.item.subcat ? (
                    <ul className={styles.selectMenuList}>
                      <DynamicColumnLayout>
                        {dropState.item.subcat.map((el, i) => {
                          return (
                            <li
                              className={
                                dropStateSecond.title === el.text
                                  ? styles.selectedItem
                                  : null
                              }
                              key={i}
                              onClick={() =>
                                setDropStateSecond({
                                  items: el.items,
                                  title: el.text,
                                })
                              }
                            >
                              {el.text}
                            </li>
                          );
                        })}
                      </DynamicColumnLayout>
                    </ul>
                  ) : null}
                </div>
              ) : null}
              <div
                className={
                  dropState.item && dropState.item.subcat
                    ? styles.thirdMenu
                    : `${styles.thirdMenu} ${styles.partMenu}`
                }
              >
                {dropStateSecond.items.length ? (
                  <ul className={styles.catalogItems}>
                    <DynamicColumnLayout>
                      {dropStateSecond.items.map((el, i) => {
                        return (
                          <Link href={`/catalog?name=${el.text}`} key={i}>
                            <li>{el.text}</li>
                          </Link>
                        );
                      })}
                    </DynamicColumnLayout>{" "}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
