import { Breadcrumb } from "antd";
import Link from "next/link.js";
import { useRouter } from "next/router";

const getBreadCrumb = (enName, last, name) => {
  const names = [
    {
      name: "",
      link: "/",
      title: "Главная",
    },
    {
      name: "catalog",
      title: "Каталог",
      link: null,
    },
    {
      name: "kitchen",
      link: "/catalog/kitchen?name=Кухня",
      title: "Кухня",
    },
    {
      name: "dishes",
      link: "/catalog/dishes?name=Посуда",
      title: "Посуда",
    },
    {
      name: "climate",
      link: "/catalog/climate?name=Климат",
      title: "Климат",
    },
    {
      name: "sport",
      link: "/catalog/sport?name=Спорт",
      title: "Спорт",
    },
    {
      name: "home",
      link: "/catalog/home?name=Дом",
      title: "Дом",
    },

    {
      name: "utug",
      link: "/catalog/home/utug?name=Утюги и отпариватели",
      title: "Утюги и отпариватели",
    },
    {
      name: "vcleaner",
      link: "/catalog/home/vcleaner?name=Пылесосы и фильтры",
      title: "Пылесосы и фильтры",
    },
    {
      name: "tv",
      link: "/catalog/home/tv?name=Телевизоры и кронштейны",
      title: "Телевизоры и кронштейны",
    },
    {
      name: "acustic",
      link: "/catalog/home/acustic?name=Акустика",
      title: "Акустика",
    },
    {
      name: "washing",
      link: "/catalog/home/washing?name=Стиральные машины",
      title: "Стиральные машины",
    },
    {
      name: "chains",
      link: "/catalog/kitchen/chains?name=Чайники",
      title: "Чайники",
    },
    {
      name: "chainsTea",
      link: "/catalog/kitchen/chainsTea?name=Чайники заварочные",
      title: "Чайники заварочные",
    },
    {
      name: "termos",
      link: "/catalog/kitchen/termos?name=Термопоты",
      title: "Термопоты",
    },

    {
      name: "fridge",
      link: "/catalog/kitchen/fridge?name=Холодильники",
      title: "Холодильники",
    },
    {
      name: "grils",
      link: "/catalog/kitchen/grils?name=Грили",
      title: "Грили",
    },
    {
      name: "dishes",
      link: "/catalog/dishes/dishes?name=Посуда",
      title: "Посуда",
    },
    {
      name: "pans",
      link: "/catalog/dishes/pans?name=Кастрюли",
      title: "Кастрюли",
    },

    {
      name: "knifes",
      link: "/catalog/dishes/knifes?name=Ножи",
      title: "Ножи",
    },

    {
      name: "convectors",
      link: "/catalog/climate/convectors?name=Конвекторы",
      title: "Конвекторы",
    },
    {
      name: "fans",
      link: "/catalog/climate/fans?name=Вентиляторы",
      title: "Вентиляторы",
    },
    {
      name: "bicycles",
      link: "/catalog/sport/bicycles?name=Велосипеды",
      title: "Велосипеды",
    },
    {
      name: "pools",
      link: "/catalog/sport/pools?name=Бассейны",
      title: "Бассейны",
    },
    {
      name: "servizes",
      link: "/catalog/dishes/servizes?name=Сервизы столовые",
      title: "Сервизы столовые",
    },
    {
      name: "roasting",
      link: "/catalog/kitchen/roasting?name=Жарочные шкафы",
      title: "Жарочные шкафы",
    },
    {
      name: "gas",
      link: "/catalog/kitchen/gas?name=Газовые поверхности",
      title: "Газовые поверхности",
    },
    {
      name: "lars",
      link: "/catalog/kitchen/lars?name=Лари",
      title: "Лари",
    },
    {
      name: "breadsmaker",
      link: "/catalog/kitchen/breadsmaker?name=Хлебопечки",
      title: "Хлебопечки",
    },
    {
      name: "mantsmaker",
      link: "/catalog/kitchen/mantsmaker?name=Мантоварки",
      title: "Мантоварки",
    },
    {
      name: "mixers",
      link: "/catalog/kitchen/mixers?name=Миксеры планетарные",
      title: "Миксеры планетарные",
    },
    {
      name: "blenders",
      link: "/catalog/kitchen/blenders?name=Блендеры",
      title: "Блендеры",
    },
    {
      name: "meat",
      link: "/catalog/kitchen/meat?name=Мясорубки",
      title: "Мясорубки",
    },
    {
      name: "recipes",
      link: "/recipes",
      title: "Рецепты",
    },
    {
      name: "blender",
      link: "/recipes/blender?name=Рецепты для блендеров",
      title: "Рецепты для блендеров",
    },
    {
      name: "mixer",
      link: "/recipes/mixer?name=Рецепты для планетарного миксера",
      title: "Рецепты для планетарного миксера",
    },
    {
      name: "boiler",
      link: "/recipes/boiler?name=Рецепты для пароварки",
      title: "Рецепты для пароварки",
    },
    {
      name: "oven",
      link: "/recipes/oven?name=Рецепты для духовки",
      title: "Рецепты для духовки",
    },
    {
      name: "gril",
      link: "/recipes/gril?name=Рецепты для гриля",
      title: "Рецепты для гриля",
    },
    {
      name: "tea",
      link: "/recipes/grteail?name=Рецепты вкусного чая",
      title: "Рецепты вкусного чая",
    },
    {
      name: "news",
      link: "/news",
      title: "Новости",
    },
    {
      name: "articles",
      link: "/articles",
      title: "Статьи",
    },
    {
      name: "feedback",
      link: "/feedback",
      title: "Обратная связь",
    },
    {
      name: "brends",
      link: "/brends",
      title: "Бренды",
    },
    {
      name: "phoenix",
      link: "/phoenix",
      title: "PHOENIX",
    },
    {
      name: "mojo",
      link: "/mojo",
      title: "MOJO",
    },
    {
      name: "jacco",
      link: "/jacco",
      title: "JACCO",
    },
    {
      name: "gurman",
      link: "/gurman",
      title: "GURMAN",
    },
    {
      name: "astix",
      link: "/astix",
      title: "ASTIX",
    },
    {
      name: "holleberg",
      link: "/holleberg",
      title: "HOLLEBERG",
    },
  ];

  const objectName = names.find((el) => el.name === enName);

  return objectName ? (
    <Breadcrumb.Item key={enName}>
      {last ? (
        objectName.title
      ) : objectName.link ? (
        <Link href={objectName.link}>{objectName.title}</Link>
      ) : (
        objectName.title
      )}
    </Breadcrumb.Item>
  ) : (
    <Breadcrumb.Item key={enName}>{name}</Breadcrumb.Item>
  );
};

export default function BreadcrumbDinamic() {
  const router = useRouter();
  const path = router.asPath.split("?");
  const breads = path[0].split("/");

  return (
    <div style={{ marginTop: 10 }}>
      <Breadcrumb>
        {breads.map((el, i) => {
          return getBreadCrumb(el, i + 1 === breads.length, router.query.name);
        })}
      </Breadcrumb>
    </div>
  );
}
