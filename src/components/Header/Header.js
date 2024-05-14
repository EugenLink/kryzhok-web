import Image from "next/image.js";
import Link from "next/link.js";
import { useState } from "react";
import Logo from "../../img/logo.png";
import { Burger } from "./Burger/Burger.js";
import styles from "./Header.module.scss";
import { SearchDesctop } from "./Search/SearchDesctop";
import { SearchMobile } from "./Search/SearchMobile.jsx";
export default function Header() {
  const [isShown, setIsShown] = useState(false);
  const [funcName, setFuncName] = useState(null);

  return (
    <div className="container">
      <div className={styles.header}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Burger />
          <Link href="/">
            <Image src={Logo} alt={"logo"} className={styles.logo} />
          </Link>
          <nav className={styles.headerNav}>
            <p
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => {
                const timer = setTimeout(() => {
                  setIsShown(false);
                }, 200);
                setFuncName(timer);
              }}
            >
              Каталог
            </p>

            <p>
              <Link href="/brends">Бренды</Link>
            </p>
            <p>
              <Link href="/feedback">Обратная связь</Link>
            </p>
          </nav>
        </div>
        <SearchDesctop />
        <SearchMobile />
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
            <div className={styles.flexRow}>
              <div>
                <p className={styles.title}>ДОМ</p>
                <Link href="/catalog/home/utug?name=Утюги и отпариватели">
                  <p>Утюги и отпариватели</p>
                </Link>
                <Link href="/catalog/home/vcleaner?name=Пылесосы и фильтры">
                  <p>Пылесосы и фильтры</p>
                </Link>
                <Link href="/catalog/home/tv?name=Телевизоры и кронштейны">
                  <p>Телевизоры и кронштейны</p>
                </Link>
                <Link href="/catalog/home/acustic?name=Акустика">
                  <p>Акустика</p>
                </Link>
                <Link href="/catalog/home/washing?name=Стиральные машины">
                  <p>Стиральные машины</p>
                </Link>
              </div>

              <p className={styles.title}>
                <Link href="/catalog/home?name=Дом">ОТКРЫТЬ ВСЕ</Link>
              </p>
            </div>
            <div className={styles.flexRow}>
              <div>
                <p className={styles.title}>КУХНЯ</p>
                <Link href="/catalog/kitchen/chains?name=Чайники">
                  <p>Чайники</p>
                </Link>
                <Link href="/catalog/kitchen/chainsTea?name=Чайники заварочные">
                  <p>Чайники заварочные</p>
                </Link>
                <Link href="/catalog/kitchen/termos?name=Термопоты">
                  <p>Термопоты</p>
                </Link>

                <Link href="/catalog/kitchen/fridge?name=Холодильники">
                  <p>Холодильники</p>
                </Link>
                <Link href="/catalog/kitchen/lars?name=Лари">
                  <p>Лари</p>
                </Link>
                <Link href="/catalog/kitchen/grils?name=Грили">
                  <p>Грили</p>
                </Link>
              </div>

              <p className={styles.title}>
                <Link href="/catalog/kitchen?name=Кухня">ОТКРЫТЬ ВСЕ</Link>
              </p>
            </div>
            <div className={styles.flexRow}>
              <div>
                <p className={styles.title}>ПОСУДА</p>
                <Link href="/catalog/dishes/dishes?name=Посуда">
                  <p>Посуда</p>
                </Link>
                <Link href="/catalog/dishes/pans?name=Кастрюли">
                  <p>Кастрюли</p>
                </Link>

                <Link href="/catalog/dishes/knifes?name=Ножи">
                  <p>Ножи</p>
                </Link>
              </div>

              <p className={styles.title}>
                <Link href="/catalog/dishes?name=Посуда">ОТКРЫТЬ ВСЕ</Link>
              </p>
            </div>
            <div className={styles.flexRow}>
              <div>
                <p className={styles.title}>КЛИМАТ</p>
                <Link href="/catalog/climate/convectors?name=Конвекторы">
                  <p>Конвекторы</p>
                </Link>
                <Link href="/catalog/climate/fans?name=Вентиляторы">
                  <p>Вентиляторы</p>
                </Link>
                <Link href="/catalog/climate/split?name=Кондиционеры и сплит-системы">
                  <p>Кондиционеры и сплит-системы</p>
                </Link>
              </div>
              <p className={styles.title}>
                <Link href="/catalog/climate?name=Климат">ОТКРЫТЬ ВСЕ</Link>
              </p>
            </div>
            <div className={styles.flexRow}>
              <div>
                <p className={styles.title}>СПОРТ</p>

                <Link href="/catalog/sport/pools?name=Бассейны">
                  <p>Бассейны</p>
                </Link>
                <Link href="/catalog/sport/trimers?name=Тримеры">
                  <p>Тримеры</p>
                </Link>
              </div>
              <p className={styles.title}>
                <Link href="/catalog/sport?name=Спорт">ОТКРЫТЬ ВСЕ</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
