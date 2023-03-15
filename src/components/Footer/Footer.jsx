import Image from "next/image.js";
import Link from "next/link.js";
import Ali from "../../img/ali.png";
import Inst from "../../img/inst.png";
import Ozon from "../../img/ozon.png";
import Tg from "../../img/tg.png";
import Vk from "../../img/vk.png";
import Wa from "../../img/wa.png";
import Wb from "../../img/wb.png";
import Ym from "../../img/ym.png";

import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.contacts}>
          <p style={{ fontWeight: 700 }}>Контакты</p>
          <p>Телефон горячей линии 8 967 822-13-30</p>
          <div className={styles.footerImages}>
            <Link href="https://vk.com/texnika_room">
              <Image src={Vk} alt="vk" />
            </Link>
            <Link href="https://wa.me/89678221330">
              <Image src={Wa} alt="wa" />
            </Link>
            <Link href="https://t.me/texnika_room">
              <Image src={Tg} alt="tg" />
            </Link>
            <Link href="https://www.instagram.com/texnika_room/">
              <Image src={Inst} alt="inst" />
            </Link>
          </div>
          <div className={styles.footerImages}>
            <Link href="https://www.ozon.ru/seller/texnika-room-88203/?miniapp=seller_88203&sprt=1">
              <Image src={Ozon} alt="Ozon" />
            </Link>
            <Link href="https://www.wildberries.ru/seller/54951">
              <Image src={Wb} alt="Wb" />
            </Link>
            <Link href="https://aliexpress.ru/store/5779747?spm=a2g2w.productlist.search_results.0.610c4aa6nckyuE&_ga=2.220125020.475076430.1674767664-1155849552.1667662721">
              <Image src={Ali} alt="Ali" />
            </Link>
            <Link href="https://market.yandex.ru/search?businessId=862729&allowCollapsing=1&local-offers-first=0">
              <Image src={Ym} alt="Ym" />
            </Link>
          </div>
        </div>
        <ul className={styles.list}>
          <li className={styles.link}>
            <Link href="/catalog/home?name=Дом">Дом</Link>
          </li>
          <li>
            <Link href="/catalog/kitchen?name=Кухня">Кухня</Link>
          </li>
          <li>
            <Link href="/catalog/dishes?name=Посуда">Посуда</Link>
          </li>
          <li>
            <Link href="/catalog/climate?name=Климат">Климат</Link>
          </li>
          <li>
            <Link href="/catalog/sport?name=Спорт">Спорт</Link>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <Link href="/news">Новости</Link>
          </li>
          <li>
            <Link href="/recipes">Рецепты</Link>
          </li>
          <li>
            <Link href="/articles">Статьи</Link>
          </li>
          <li>
            <Link href="/brends">Бренды</Link>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <Link href="/about">О нас</Link>
          </li>
          <li>
            <Link href="/feedback">Обратная связь</Link>
          </li>
          <li>
            <Link href="/where-buy">Где купить</Link>
          </li>
        </ul>
      </div>
      <div className={styles.notesWrapper}>
        <div className={styles.notes}>
          <p>
            *Цены на сайте не являются публичной офертой. Цена на сайте может
            отличаться как в большую, так и в меньшую сторону. Актуальные цены
            смотрите на маркетплейсах по ссылкам, указанным в описании товара.
            Цены на разных площадках могут различаться в зависимости от ценовой
            политики конкретного ресурса.
          </p>
          <p>
            *компания Meta Platforms считается экстремистской организацией, и ее
            деятельность запрещена в России.
          </p>
        </div>
      </div>
    </div>
  );
}
