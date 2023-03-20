import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import styles from "@/styles/Catalog.module.scss";

import { Carousel } from "@/components/Carousel/Carousel.jsx";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { ProductCardHeadMobile } from "@/components/Product/ProductCardHead/ProductCardHeadMobile.jsx";
import { ProductCategories } from "@/components/Product/productImages/ProductCategories.jsx";
import { ProductImages } from "@/components/Product/productImages/ProductImages.jsx";
import { num_word } from "@/hooks/num_words.js";
import Star from "@/img/star.png";
import Head from "next/head";
import Image from "next/image.js";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { useState } from "react";

export default function ProductCard({ item, hits }) {
  const [selected, setSelected] = useState("desc");
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>
          {item.Name} {item.Model}
        </title>
        <meta name="description" content={`${item.Name} ${item.Model}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <div className={styles.breadCrumb}>
            <BreadcrumbDinamic />
          </div>

          <div className={styles.productCardWrapper}>
            <ProductImages
              images={item.images ? item.images.split(";") : null}
              id={item.id}
            />
            <div className={styles.mainText}>
              <p className={styles.titleName}>{item.Name}</p>
              <p className={styles.titleType}>{item.Model}</p>
              <div className={styles.flex}>
                <div className={styles.raiting}>
                  <Image src={Star} alt={"stars"} width="22" height="20" />
                  <Image src={Star} alt={"stars"} width="22" height="20" />
                  <Image src={Star} alt={"stars"} width="22" height="20" />
                  <Image src={Star} alt={"stars"} width="22" height="20" />
                  <Image src={Star} alt={"stars"} width="22" height="20" />
                </div>

                <Link
                  href={`${router.asPath}#recenz`}
                  onClick={() => setSelected("recenz")}
                >
                  <div className={styles.recenz}>
                    {item.recenz}{" "}
                    {num_word(+item.recenz, ["Отзыв", "Отзыва", "Отзывов"])}
                  </div>
                </Link>
              </div>
              <p className={styles.cost}>
                {item.Cost}
                <span className={styles.rub}></span>
              </p>
              <p style={{ fontSize: 14, fontWeight: 400 }}>
                Купите в любимом интернет - магазине:
              </p>
              <div className={styles.magazines}>
                {item.ozon === "Y" ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
                  >
                    OZON
                  </a>
                ) : (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
                  >
                    OZON
                  </a>
                )}
                {item.wb === "Y" ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
                  >
                    Wildberries
                  </a>
                ) : (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
                  >
                    Wildberries
                  </a>
                )}
                {item.ym === "Y" ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
                  >
                    Яндекс Маркет
                  </a>
                ) : (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
                  >
                    Яндекс Маркет
                  </a>
                )}
                {item.ali === "Y" ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
                  >
                    Aliexpress
                  </a>
                ) : (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
                  >
                    Aliexpress
                  </a>
                )}
                {item.am === "Y" ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
                  >
                    Астмаркет
                  </a>
                ) : (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.ozon.ru/product/blender-pogruzhnoy-astix-abl-2800-3-v-1-izmelchitel-blender-mikser-208738488/?asb=r3CVRlQkq69prm7HmRXd5wCJ2GnNrWzIBplIJ0YT9aA%253D&asb2=QdM9O94TpWjEhA7sKh80nCKtmWTa9LXOCiPT1tqHMVw_4ZvAT5XEZ4AW9Sh8Re42&avtc=1&avte=2&avts=1674758032&keywords=%D0%B1%D0%BB%D0%B5%D0%BD%D0%B4%D0%B5%D1%80+astix&sh=tFIEfL0iNQ"
                  >
                    Астмаркет
                  </a>
                )}
              </div>
            </div>
          </div>
          <ProductCardHeadMobile
            item={item}
            anchor={() => setSelected("recenz")}
          />
          <ProductCategories
            item={item}
            selected={selected}
            setSelected={setSelected}
          />
          <div className={styles.recomended}>
            <p className={styles.titleRecomended}>Так же рекомендуем</p>
            <Carousel items={hits ? hits : []} />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { productCard } = context.params;
  const { chapter } = context.query;
  // Fetch data from external API
  const res = await fetch(
    `http://u1978287.isp.regruhosting.ru/product/getById.php?id=${productCard}`
  );

  const item = await res.json();
  const hitsReq = await fetch(
    `http://u1978287.isp.regruhosting.ru/product/getByChaperForCarousel.php?chapter=${chapter}`
  );

  const hits = await hitsReq.json();
  // Pass data to the page via props
  return { props: { item, hits } };
}
