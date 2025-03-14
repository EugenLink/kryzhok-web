import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import styles from "./Dashboard.module.scss";

import { AccountCircle, PersonOutlineSharp } from "@mui/icons-material";
import VipBanner from "./VipBanner";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import UploadImage from "./UploadImage";
import { useState } from "react";
import { userAgent } from "next/server";
import { useStore } from "effector-react";
import { $user } from "@/state/products";
import { Button, message } from "antd";
import { useRouter } from "next/router";
import { category } from "@/json/newCategotry";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}
const names = [
  { link: "/kindergartens", text: "Детские сады", pid: "home" },
  {
    link: "/privatekindergartens",
    text: "Частные детские сады и присмотр",
    pid: "home",
  },
  { link: "/forschool", text: "Подготовка к школе", pid: "home" },
  { link: "/development", text: "Развивающие занятия", pid: "home" },
  {
    link: "/speechtherapist",
    text: "Логопеды и дефектологи",
    pid: "home",
  },
  { link: "/language", text: "Иностранные языки", pid: "home" },
  {
    link: "/tutor",
    text: "Репетиторы и курсы подготовки к ЕГЭ и ОГЭ",
    pid: "home",
  },
  { link: "/schools", text: "Школы и гимназии", pid: "home" },
  { link: "/private-schools", text: "Частные школы", pid: "home" },
  { link: "/internats", text: "Школы-интернаты", pid: "home" },
  {
    link: "/sunday-schools",
    text: "Воскресные школы, духовные учебные заведения для детей",
    pid: "home",
  },
  {
    link: "/secondary-specialized-education",
    text: "Среднее специальное образование (Лицеи, колледжи и техникумы, ПТУ, училища)",
    pid: "home",
  },
  {
    link: "/higher-education",
    text: "Высшее образование (Институты, вузы, университеты)",
    pid: "home",
  },
  {
    link: "/military-academies-and-schools",
    text: "Военные академии и училища",
    pid: "home",
  },
  {
    link: "/conservatories-and-music-universities",
    text: "Консерватории и музыкальные вузы",
    pid: "home",
  },
  {
    link: "/choreographic-schools",
    text: "Хореографические училища",
    pid: "home",
  },
  {
    link: "/dopobr",
    text: "Учебные центры доп. образования",
    pid: "home",
  },
  {
    link: "/language-school",
    text: "Языковые школы и курсы иностранных языков",
    pid: "home",
  },
  {
    link: "/it",
    text: "IT - школы и курсы информатики и программирования",
    pid: "home",
  },
  {
    link: "/upquals",
    text: "Профессиональная подготовка и повышение квалификации",
    pid: "home",
  },
  {
    link: "/busines-drive",
    text: "Школы управления бизнесом и автошколы",
    pid: "home",
  },
  { text: "Детские супермаркеты", pid: "home" },
  { text: "Детские интернет-магазины", pid: "home" },
  { text: "Детские магазины одежды (головные уборы)", pid: "home" },
  { text: "Магазины детской обуви", pid: "home" },
  { text: "Ортопедические магазины", pid: "home" },
  { text: "Игрушки и игры", pid: "home" },
  { text: "Канцелярские и книжные магазины (учебники)", pid: "home" },
  { text: "Магазины творчества и рукоделия", pid: "home" },
  {
    text: "Спортивные, музыкальные и узкопрофильные магазины",
    pid: "home",
  },
  { text: "Магазины детской мебели", pid: "home" },
  {
    text: "Ювелирные магазины и магазины бижутерии для детей",
    pid: "home",
  },
  { text: "Дома культуры и детского творчества", pid: "home" },
  { text: "Спорткомплексы и тренировочные базы (стадионы)", pid: "home" },
  { text: "Пение и Музыкальные школы (вокал)", pid: "home" },
  { text: "Танцы и хореография", pid: "home" },
  { text: "Рисование и Художественные школы", pid: "home" },
  { text: "Аэробика и фитнес для детей (йога)", pid: "home" },
  { text: "Бассейны и Дайвинг-клубы", pid: "home" },
  { text: "Борьба и боевые искусства", pid: "home" },
  { text: "Театральные кружки", pid: "home" },
  { text: "Шахматы", pid: "home" },
  { text: "Клубы робототехники и конструирования", pid: "home" },
  {
    text: "Другие кружки (Фотошколы, картинг, модельные школы)",
    pid: "home",
  },
  { text: "Секции бесплатные и по сертификату", pid: "home" },
  { text: "Молодежные и общественные организации", pid: "home" },
  { text: "Рецепты", pid: "home" },
  { text: "Магазины безглютеновых и безлактозных продуктов", pid: "home" },
  { text: "Фермерские и эко-продукты", pid: "home" },
  { text: "Магазины детского питания", pid: "home" },
  { text: "Доставка еды (для мам, детей и пр.)", pid: "home" },
  { text: "Кафе с детской комнатой", pid: "home" },
  {
    text: "Магазины товаров для детского праздника (украшения)",
    pid: "home",
  },
  { text: "Пакетные предложения", pid: "home" },
  { text: "Аниматоры", pid: "home" },
  { text: "Игровые центры", pid: "home" },
  { text: "Детские кафе", pid: "home" },
  { text: "Торты и десерты", pid: "home" },
  { text: "Воздушные шары", pid: "home" },
  {
    text: "Детские карнавальные, танцевальные и театральные костюмы",
    pid: "home",
  },
  { text: "Фотографы и видеографы", pid: "home" },
  { text: "Кейтеринг (доставка еды)", pid: "home" },
  { text: "Мастер-классы и квесты", pid: "home" },
  { text: "Аренда помещений", pid: "home" },
  {
    text: "Аренда товаров для праздника (батуты, шоколадные фонтаны)",
    pid: "home",
  },
  { text: "Загсы", pid: "home" },
  { text: "Детские дома и приюты", pid: "home" },
  { text: "Центры соцподдержки и соцзащиты", pid: "home" },
  { text: "Службы ПДН", pid: "home" },
  { text: "Центры психологической помощи и ПМПК", pid: "home" },
  { text: "Детские лагеря, санатории (дома отдыха, турбазы)", pid: "home" },
  { text: "Детские фотостудии", pid: "home" },
  { text: "Парикмахерские и салоны красоты для детей", pid: "home" },
  { text: "Оптика", pid: "home" },
  { text: "Парки аттракционов и отдыха", pid: "home" },
  { text: "Зоопарки, фермы и заповедники", pid: "home" },
  { text: "Кинотеатры и театры", pid: "home" },
  { text: "Детские выставки и музеи", pid: "home" },
  { text: "Цирк и концерты", pid: "home" },
  { text: "Детские экскурсии", pid: "home" },
  { text: "Игровые и батутные центры", pid: "home" },
  { text: "Мастер-классы, квесты и шоу", pid: "home" },
  { text: "Аквапарки", pid: "home" },
  { text: "Каток", pid: "home" },
  { text: "Бильярдные и боулинг-клубы", pid: "home" },
  { text: "Картинг и конные клубы", pid: "home" },
  { text: "Лазертаг и пейнтбольные клубы", pid: "home" },
  { text: "Теннисные клубы", pid: "home" },
  { text: "Скалодромы и веревочные парки", pid: "home" },
  { text: "Пункты проката (лодки, велосипеды и пр.)", pid: "home" },
  { text: "Кафе", pid: "home" },
  { text: "Врач на дом", pid: "home" },
  { text: "Детская скорая помощь", pid: "home" },
  { text: "Детские травмпункты", pid: "home" },
  { text: "Детские больницы", pid: "home" },
  { text: "Детские поликлиники", pid: "home" },
  { text: "Медицинские центры", pid: "home" },
  { text: "Детские диагностические центры", pid: "home" },
  { text: "Диспансеры и лаборатории", pid: "home" },
  {
    text: "Реабилитационные центры и санатории (оздоровительные центры)",
    pid: "home",
  },
  { text: "Логопеды и коррекция речи", pid: "home" },
  { text: "Массаж для детей", pid: "home" },
  { text: "Стоматология", pid: "home" },
  { text: "Ортопедия", pid: "home" },
  { text: "Офтальмология", pid: "home" },
  { text: "Неврологи", pid: "home" },
  { text: "Процедурный кабинет или медсестра на дом", pid: "home" },
  { text: "Аптеки и аптеки онлайн", pid: "home" },
  { text: "Центры планирования беременности", pid: "home" },
  { text: "Ведение беременности и родов", pid: "home" },
  { text: "Перинатальные центры и Роддома", pid: "home" },
  { text: "Курсы для беременных", pid: "home" },
  { text: "Магазины для беременных", pid: "home" },
  { text: "Няни и центры присмотра", pid: "home" },
  { text: "Грудничковое плавание и фитнес", pid: "home" },
  { text: "Специалисты по кормлению и здоровью (массаж)", pid: "home" },
  { text: "Аренда игрушек и детских товаров", pid: "home" },
];

export default function ObjectCreate() {
  const [fileList, setFileList] = useState([]);

  const [fileListPreview, setFileListPreview] = useState([]);
  const user = useStore($user);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setErrors({ ...errors, category: false });
  };
  const success = (text) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };

  const error = (text) => {
    messageApi.open({
      type: "error",
      content: text,
    });
  };
  const [data, setData] = useState({
    name: "",
    services: "",
    address: "",
    phone: "",
    timeJob: "",
    description: "",
    heading: "",
    peculiarity: "",
    links: "",
  });
  const [errors, setErrors] = useState({
    name: null,
    category: null,
    services: null,
    address: null,
    phone: null,
    timeJob: null,
    description: null,
    heading: null,
    peculiarity: null,
    links: null,
    file: null,
  });
  const changeInput = (type, value) => {
    setErrors({ ...errors, [type]: null });
    setData({ ...data, [type]: value });
  };

  const submit = () => {
    let newErr = errors;

    if (data.name.length < 3) {
      newErr = { ...newErr, name: true };
    }
    if (!personName.length) {
      newErr = { ...newErr, category: true };
    }
    if (data.description.length < 3) {
      newErr = { ...newErr, description: true };
    }
    if (data.services.length < 3) {
      newErr = { ...newErr, services: true };
    }
    if (data.address.length < 3) {
      newErr = { ...newErr, address: true };
    }
    if (data.phone.length < 3) {
      newErr = { ...newErr, phone: true };
    }
    if (!fileListPreview.length) {
      newErr = { ...newErr, file: true };
    }
    setErrors(newErr);
    const hasError = Object.values(newErr).some((value) => value === true);
    if (hasError) {
      error("Вы не заполнили какое-то поле, пожалуйста проверьте!");
    } else {
      const formData = new FormData();
      for (const item of fileList) {
        formData.append("images[]", item.originFileObj); // 'files[]' — имя поля для файлов
      }

      formData.append("image_preview", fileListPreview[0].originFileObj);
      formData.append("userID", user ? user.id : null);
      formData.append("category", personName.join(","));
      formData.append("name", data.name);
      formData.append("services", data.services);
      formData.append("address", data.address);
      formData.append("phone", data.phone);
      formData.append("timeJob", data.timeJob);
      formData.append("description", data.description);
      formData.append("heading", data.heading);
      formData.append("peculiarity", data.peculiarity);
      formData.append("links", data.links);

      fetch(
        "https://u1978287.isp.regruhosting.ru/kryzhok/products/add_product.php",
        {
          method: "POST",

          body: formData,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "success") {
            success("Объект успешно добавлен!");
            router.push("/dashboard");
          } else {
            console.log(result);
            error("Произошла ошибка, попробуйте позже!");
          }
        })
        .catch((err) => {
          console.log(err);
          error("Произошла ошибка, попробуйте позже!");
        });
    }
  };
  return (
    <div className={styles.dashWrapper}>
      {contextHolder}

      <div className={styles.header}>
        <div className={styles.hRight}>
          <h1 className={styles.title}>Добавление объекта</h1>
        </div>
      </div>
      <div className={styles.hLeft}>
        <Link href="/dashboard">
          <p>{"<"} Назад</p>
        </Link>
      </div>
      <div className={`${styles.inputGroup} ${styles.createInputs}`}>
        <Box
          component="form"
          className={styles.column}
          sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
          noValidate
        >
          <TextField
            id="outlined-basic"
            label="Название*"
            variant="outlined"
            error={errors.name}
            value={data.name}
            onChange={(e) => changeInput("name", e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Описание*"
            variant="outlined"
            multiline
            maxRows={4}
            error={errors.description}
            value={data.description}
            onChange={(e) => changeInput("description", e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Направление*"
            variant="outlined"
            multiline
            maxRows={4}
            error={errors.services}
            value={data.services}
            onChange={(e) => changeInput("services", e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="Услуги"
            variant="outlined"
            multiline
            maxRows={4}
            value={data.heading}
            onChange={(e) => changeInput("heading", e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Доп. Услуги"
            variant="outlined"
            multiline
            maxRows={4}
            value={data.peculiarity}
            onChange={(e) => changeInput("peculiarity", e.target.value)}
          />
        </Box>
        <Box
          component="form"
          className={styles.column}
          sx={{ "& > :not(style)": { m: 1, width: "35ch" } }}
          noValidate
        >
          <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
            <Select
              multiple
              displayEmpty
              error={errors.category}
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <p>Категории*</p>;
                }

                return selected.join(", ");
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <p>Категории*</p>
              </MenuItem>
              {names.map((name) => (
                <MenuItem
                  key={name.text}
                  value={name.text}
                  style={getStyles(name.text, personName, theme)}
                >
                  {name.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="outlined-basic"
            label="Адрес*"
            error={errors.address}
            variant="outlined"
            value={data.address}
            onChange={(e) => changeInput("address", e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="Телефон*"
            variant="outlined"
            error={errors.phone}
            value={data.phone}
            onChange={(e) => changeInput("phone", e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Время работы"
            variant="outlined"
            value={data.timeJob}
            onChange={(e) => changeInput("timeJob", e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Ссылки"
            variant="outlined"
            value={data.links}
            onChange={(e) => changeInput("links", e.target.value)}
          />
        </Box>
        <Box>
          <p style={{ color: errors.file ? "red" : null }}>
            Превью - изображение*
          </p>
          <UploadImage
            count={"1"}
            fileList={fileListPreview}
            setFileList={(data) => {
              setErrors({ ...errors, file: false });
              setFileListPreview(data);
            }}
          />
          <p>Изображения для галереии</p>
          <UploadImage
            count={"5"}
            fileList={fileList}
            setFileList={(data) => setFileList(data)}
          />
          <Button
            block
            type="primary"
            className={styles.button}
            size="large"
            onClick={() => submit()}
          >
            Добавить
          </Button>
        </Box>
      </div>
    </div>
  );
}
