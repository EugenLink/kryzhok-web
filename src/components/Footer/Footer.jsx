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
          <p>Телефон горячей линии 8 888 888-88-88</p>
          <div className={styles.footerImages}>
            <Image src={Vk} alt="vk" />
            <Image src={Wa} alt="wa" />
            <Image src={Tg} alt="tg" />
            <Image src={Inst} alt="inst" />
          </div>
          <div className={styles.footerImages}>
            <Image src={Ozon} alt="Ozon" />
            <Image src={Wb} alt="Wb" />
            <Image src={Ym} alt="Ym" />
            <Image src={Ali} alt="Ali" />
          </div>
        </div>
        <ul className={styles.list}>
          <li>
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
