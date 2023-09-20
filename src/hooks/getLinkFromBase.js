const names = [
  {
    name: "",
    title: "Главная",
  },
  {
    name: "catalog",
    title: "Каталог",
  },
  {
    name: "kitchen",
    title: "Кухня",
  },
  {
    name: "dishes",
    title: "Посуда",
  },
  {
    name: "climate",
    title: "Климат",
  },
  {
    name: "sport",
    title: "Спорт",
  },
  {
    name: "home",
    title: "Дом",
  },

  {
    name: "utug",
    title: "Утюги и отпариватели",
  },
  {
    name: "vcleaner",
    title: "Пылесосы и фильтры",
  },
  {
    name: "tv",
    title: "Телевизоры и кронштейны",
  },
  {
    name: "split",
    title: "Кондиционеры и сплит-системы",
  },
  {
    name: "acustic",
    title: "Акустика",
  },
  {
    name: "washing",
    title: "Стиральные машины",
  },
  {
    name: "chains",
    title: "Чайники",
  },
  {
    name: "chainsTea",
    title: "Чайники заварочные",
  },
  {
    name: "termos",
    title: "Термопоты",
  },
  {
    name: "oven",
    title: "Духовые шкафы",
  },
  {
    name: "fridge",
    title: "Холодильники",
  },
  {
    name: "grils",
    title: "Грили",
  },
  {
    name: "dishes",
    title: "Посуда",
  },
  {
    name: "pans",
    title: "Кастрюли",
  },
  {
    name: "buckets",
    title: "Ковши",
  },
  {
    name: "knifes",
    title: "Ножи",
  },
  {
    name: "bowls",
    title: "Миски и салатницы",
  },
  {
    name: "convectors",
    title: "Конвекторы",
  },
  {
    name: "fans",
    title: "Вентиляторы",
  },
  {
    name: "bicycles",
    title: "Велосипеды",
  },
  {
    name: "pools",
    title: "Бассейны",
  },
  {
    name: "servizes",
    title: "Сервизы столовые",
  },
  {
    name: "roasting",
    title: "Жарочные шкафы",
  },
  {
    name: "gas",
    title: "Газовые поверхности",
  },
  {
    name: "lars",
    title: "Лари",
  },
  {
    name: "breadsmaker",
    title: "Хлебопечки",
  },
  {
    name: "mantsmaker",
    title: "Мантоварки",
  },
  {
    name: "mixers",
    title: "Миксеры планетарные",
  },
  {
    name: "blenders",
    title: "Блендеры",
  },
  {
    name: "meat",
    title: "Мясорубки",
  },
];
function getLink(chapter, preChapter, id) {
  const first = names.find((el) => el.title === preChapter);
  const second = names.find((el) => el.title === chapter);

  if (first?.name && second?.name) {
    return `/catalog/${first.name}/${second.name}/${id}?chapter=${chapter}`;
  } else {
    return "/";
  }
}

export default getLink;
