import LikeIn from "@/img/heartFull.png";
import LikeOut from "@/img/heartOutline.png";
import Image from "next/image.js";
import { useEffect, useState } from "react";
import styles from "./Like.module.scss";
const Like = ({ likes, id }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`like:${id}`);

      setLiked(saved);
    }
  }, []);

  return (
    <div className={styles.like}>
      {liked ? (
        <Image
          src={LikeIn}
          alt={"like"}
          onClick={() => {
            setLiked(false);
            fetch(
              `https://volga24bot.com/cgi-bin/recipes/setLike.php?id=${id}&likes=${
                +likes - 1
              }`
            );
            localStorage.removeItem(`like:${id}`);
          }}
        />
      ) : (
        <Image
          src={LikeOut}
          alt={"like"}
          onClick={() => {
            setLiked(true);
            fetch(
              `https://volga24bot.com/cgi-bin/recipes/setLike.php?id=${id}&likes=${
                +likes + 1
              }`
            );
            localStorage.setItem(`like:${id}`, true);
          }}
        />
      )}
    </div>
  );
};

export default Like;
