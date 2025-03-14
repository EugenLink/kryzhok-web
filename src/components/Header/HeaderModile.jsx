import Image from "next/image.js";
import Link from "next/link.js";
import { useEffect, useState } from "react";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import Logo from "../../img/logo.png";
import styles from "./Header.module.scss";
import { SearchDesctop } from "./Search/SearchDesctop.js";
import { category } from "../../json/newCategotry";
import ModalRegister from "../ModalRegister/ModalRegister";
import DynamicColumnLayout from "../DynamicColumnLayout/DynamicColumnLayout";
import ModalSearch from "../ModalRegister/ModalSearch";
import { Popover } from "antd";
import ModalChangePass from "../ModalRegister/ModalChangePass";
import { $liked, $user, setLiked, setUser } from "@/state/products";
import { useStore } from "effector-react";
import ModalFavorites from "../ModalRegister/ModalFavorites";
import { Burger } from "./Burger/Burger";

export default function HeaderMobile() {
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
      setLiked(localStorage.getItem("likes"));
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
        <Link href={"/dashboard"}>
          <p>Личный кабинет</p>
        </Link>
      ) : null}

      <p
        onClick={() => {
          setVisible(false);
          showModalChange(true);
        }}
      >
        Сменить пароль
      </p>
      <p
        onClick={() => {
          localStorage.removeItem("user");
          setUser(null);
          setLiked(localStorage.getItem("likes"));
        }}
      >
        Выйти
      </p>
    </div>
  );

  return (
    <>
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
      <header className="mobile whitespace-nowrap border-b border-solid border-b-[#e7edf3] px-10 py-3">
        <Burger
          showModalSearch={() => showModalSearch()}
          showModalFav={() => showModalFav()}
        />
        <Link href="/">
          <div className="flex items-center gap-4 text-[#0e141b]">
            <div className="size-8">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="svgIcon"
              >
                <g clip-path="url(#clip0_6_319)">
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
          </div>
        </Link>
        {user ? (
          <Popover
            content={content}
            trigger="click"
            open={visible}
            title={user.type === "user" ? "Пользователь" : "Компания"}
            overlayStyle={{ width: 200 }}
          >
            <div className={styles.underLogin} onClick={() => setVisible(true)}>
              <p>{user.username[0]}</p>
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
      </header>
    </>
  );
}
