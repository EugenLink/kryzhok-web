import Image from "next/image.js";
import Link from "next/link.js";
import Ast from "../../img/ast.png";
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
          <p>Телефон горячей линии 999 999 09 99</p>
          <div className={styles.footerImages}>
            <Link href="/">
              <Image src={Vk} alt="vk" />
            </Link>
            <Link href="/">
              <Image src={Wa} alt="wa" />
            </Link>
            <Link href="/">
              <Image src={Tg} alt="tg" />
            </Link>
            <Link href="/">
              <Image src={Inst} alt="inst" />
            </Link>
          </div>
          {/* <div className={styles.footerImages}>
            <Link href="https://www.ozon.ru/seller/texnika-room-88203/?miniapp=seller_88203&sprt=1">
              <Image src={Ozon} alt="Ozon" />
            </Link>
            <Link href="https://www.wildberries.ru/seller/54951">
              <Image src={Wb} alt="Wb" />
            </Link>
            <Link href="https://astmarket.com/">
              <Image src={Ast} alt="Ali" />
            </Link>
            <Link href="https://market.yandex.ru/search?businessId=862729&allowCollapsing=1&local-offers-first=0">
              <Image src={Ym} alt="Ym" />
            </Link>
          </div> */}
        </div>

        <ul className={styles.list} style={{ textAlign: "left" }}>
          <p style={{ padding: 5, textAlign: "left" }}>
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
        </ul>
        <ul className={styles.list}>
          <li>
            <Link href="/about">Пункт</Link>
          </li>
          <li>
            <Link href="/feedback">Пункт</Link>
          </li>
          <li>
            <Link href="/where-buy">Пункт</Link>
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
