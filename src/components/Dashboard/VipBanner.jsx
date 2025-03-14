import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import styles from "./Dashboard.module.scss";
import { AccountCircle } from "@mui/icons-material";

export default function VipBanner({
  image,
  text,
  desc = false,
  mobile = false,
}) {
  return (
    <div
      className={`${styles.vipBanner} ${
        mobile ? styles.mobile : styles.desctop
      }`}
      style={{
        height: 200,
        backgroundImage: image,
        objectFit: "cover",
        marginTop: 20,
      }}
    >
      <p>{text}</p>
      {desc ? (
        <div className={styles.desc}>
          <ul>
            <li>1. Больше объектов</li>
            <li>2. Больше фотографий</li>
            <li>3. Еще что-то</li>
            <li>4. Еще что-то</li>
          </ul>
          <p>Всего за 499 р</p>
        </div>
      ) : null}
    </div>
  );
}
