import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import styles from "./ProductPreview.module.scss";
import Link from "next/link";
import { message } from "antd";
import { useEffect, useState } from "react";
import { $liked, $user, setLiked, setUser } from "@/state/products";
import { useStore } from "effector-react";
import axios from "axios";
export default function ProductPreviewMini({
  id,
  title = "Футбольная академия",
  chapter,
  date = "26 Ноября, 2024",
  photo = "noPhoto.jpg",
  width = 360,
  likedPop = false,
  text = "Откройте мир футбола вместе с нами! В нашей Детской Академии Футбола ваш ребенок научится не только мастерству игры, но и командной работе, дисциплине и уверенности в себе. Присоединяйтесь к нам и дайте вашему ребенку шанс стать настоящим чемпионом!",
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const user = useStore($user); // Получаем данные пользователя из хранилища
  const [isLiked, setIsLiked] = useState("");
  const liked = useStore($liked); // Получаем данные пользователя из хранилища

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
  useEffect(() => {
    if (user) {
      let value = user.likes?.split(",").findIndex((e) => e == id);
      setIsLiked(value);
    } else {
      let items = localStorage.getItem("likes");
      items = items ? items : "";
      const value = items.split(",").findIndex((e) => e == id);

      setIsLiked(value);
    }
  }, [user, isLiked, liked]);
  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://kryzhok.ru/catalog/${id}?chapter=${chapter}`
      );
      success("Ссылка успешно скопирована");
    } catch (err) {
      console.error("Ошибка при копировании текста: ", err);
    }
  };
  const addToFavorites = async () => {
    if (user) {
      let formData = new FormData();

      let items = user.likes.length ? `${user.likes}` : "";
      const dislike = items.split(",").findIndex((e) => e == id);
      const itemsArr = items.length ? items.split(",") : [];

      if (dislike !== -1) {
        itemsArr.splice(dislike, 1);
      } else {
        itemsArr.push(id);
      }
      setUser({ ...user, likes: itemsArr.join(",") });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, likes: itemsArr.join(",") })
      );
      formData.append("userID", user.id);
      formData.append("items", itemsArr.join(","));
      try {
        const response = await axios.post(
          "https://u1978287.isp.regruhosting.ru/kryzhok/users/add_to_fawor.php",
          formData
        );
        if (response.data.status === "success") {
          if (dislike !== -1) {
            success("Успешно удалили из избранного!");
          } else {
            success("Успешно добавили в избранное!");
          }
        } else {
          error("Произошла ошибка");
        }
      } catch (e) {
        error("Произошла ошибка внутри сайта, пожалуйста попробуйте позже");
      }
    } else {
      let items = localStorage.getItem("likes");
      items = items ? items : "";
      const dislike = items.split(",").findIndex((e) => e == id);
      const itemsArr = items.length ? items.split(",") : [];

      if (dislike !== -1) {
        itemsArr.splice(dislike, 1);
        success("Успешно удалили из избранного!");

        setIsLiked(-1);
      } else {
        itemsArr.push(id);
        setIsLiked(1);
        success("Успешно добавили в избранное!");
      }
      setLiked(itemsArr.join(","));
      localStorage.setItem("likes", itemsArr.join(","));
    }
  };
  return (
    <Card sx={{ maxWidth: width }} className={styles.cardWrapper}>
      {contextHolder}
      <CardMedia
        component="img"
        sx={{
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: 320,
        }}
        image={`https://u1978287.isp.regruhosting.ru/kryzhok/products/images/${id}/${photo}`}
        alt="photo"
        className={styles.mobile}
      />

      <CardContent>
        <p style={{ fontSize: 20, paddingBottom: 15, fontWeight: 500 }}>
          {title}
        </p>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", height: 120, overflow: "hidden" }}
        >
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={styles.actions}>
        <IconButton
          aria-label="add to favorites"
          onClick={() => addToFavorites()}
        >
          {likedPop ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteIcon sx={{ color: isLiked === -1 ? null : "red" }} />
          )}
        </IconButton>
        <IconButton aria-label="share" onClick={() => handleCopyText()}>
          <ShareIcon />
        </IconButton>
        <Link
          href={`/catalog/${id}?chapter=${chapter}`}
          className={styles.readLink}
        >
          <IconButton
            aria-label="add to favorites"
            className={styles.lastChildActions}
          >
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Просмотр
            </Typography>
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}
