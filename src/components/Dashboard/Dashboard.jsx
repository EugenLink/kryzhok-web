import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import styles from "./Dashboard.module.scss";
import { AccountCircle } from "@mui/icons-material";
import VipBanner from "./VipBanner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { $user, setUser } from "@/state/products";
import { useStore } from "effector-react";
import axios from "axios";
import { Button, message } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import ObjectEdit from "./ObjectEdit";
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export default function DashboardWrapper() {
  const [data, setData] = useState([]);
  const user = useStore($user);
  const [selected, setSelected] = useState({});
  const [userData, setUserData] = useState({
    username: "",
    confidant: "",
    email: "",
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    confidant: false,
  });
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
  const deleteItem = async (id) => {
    const confirmRes = confirm("Вы действительно хотите удалить объект?");
    if (confirmRes) {
      try {
        const response = await axios.get(
          `https://u1978287.isp.regruhosting.ru/kryzhok/products/deleteProduct.php?id=${id}`
        );
        if (response.data.status === "success") {
          success("Объект успешно удален!");
          if (user) {
            const fetchData = async () => {
              try {
                const response = await axios.get(
                  `https://u1978287.isp.regruhosting.ru/kryzhok/products/getByUser.php?id=${user.id}`
                );

                if (response.data.status === "success") {
                  setData(response.data.data);
                } else {
                }
              } catch (e) {}
            };
            fetchData();
          }
        } else {
          error("Произошла ошибка, попробуйте позже");
        }
      } catch (e) {
        error("Произошла ошибка внутри сайта, пожалуйста попробуйте позже");
      }
    }
  };
  useEffect(() => {
    if (user) {
      setUserData(user);

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://u1978287.isp.regruhosting.ru/kryzhok/products/getByUser.php?id=${user.id}`
          );

          if (response.data.status === "success") {
            setData(response.data.data);
          } else {
          }
        } catch (e) {}
      };
      fetchData();
    }
  }, [user, selected]);
  const save = async () => {
    let newErr = errors;
    if (!isValidEmail(userData.email)) {
      newErr.email = true;
    }
    if (userData.username.length < 3) {
      newErr.username = true;
    }
    if (userData.confidant.length < 3) {
      newErr.confidant = true;
    }
    const hasError = Object.values(newErr).some((value) => value === true);
    if (hasError) {
      error("Вы не заполнили какое-то поле, пожалуйста проверьте!");
    } else {
      let formData = new FormData();

      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      try {
        const response = await axios.post(
          "https://u1978287.isp.regruhosting.ru/kryzhok/users/updateUser.php",
          formData
        );
        if (response.data.status === "success") {
          success("Вы успешно изменили данные!");
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          error("Поля не должны быть пустые");
        }
      } catch (e) {
        error("Произошла ошибка внутри сайта, пожалуйста попробуйте позже");
      }
    }
  };
  return (
    <>
      {!selected.id ? (
        <div className={styles.dashWrapper}>
          {contextHolder}

          <h1 className={styles.title}>Личный кабинет</h1>
          <div className={styles.centerFlex}>
            <div className={styles.left}>
              <p className={styles.label}>Основная информация:</p>
              <div className={styles.inputGroup}>
                <div className={styles.input}>
                  <FormControl variant="standard">
                    <InputLabel
                      htmlFor="input-with-icon-adornment"
                      sx={{ color: errors.email ? "red" : null }}
                    >
                      E-mail
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      error={errors.email}
                      value={userData?.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div className={styles.input}>
                  <FormControl variant="standard">
                    <InputLabel
                      htmlFor="input-with-icon-adornment"
                      sx={{ color: errors.username ? "red" : null }}
                    >
                      Название компании
                    </InputLabel>
                    <Input
                      error={errors.username}
                      id="input-with-icon-adornment"
                      value={userData?.username}
                      onChange={(e) =>
                        setUserData({ ...userData, username: e.target.value })
                      }
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div className={styles.input}>
                  <FormControl variant="standard">
                    <InputLabel
                      htmlFor="input-with-icon-adornment"
                      sx={{ color: errors.confidant ? "red" : null }}
                    >
                      Доверенное лицо
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      error={errors.confidant}
                      value={userData?.confidant}
                      onChange={(e) =>
                        setUserData({ ...userData, confidant: e.target.value })
                      }
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <Button
                  block
                  type="primary"
                  className={styles.button}
                  style={{ marginTop: 40 }}
                  size="large"
                  onClick={() => save()}
                >
                  Сохранить
                </Button>
                {/* <VipBanner image='URL("premium.png")' text="Premium" /> */}
              </div>
            </div>
            <VipBanner text="Баннер premium" mobile />
            <div className={styles.right}>
              <p className={styles.label}>Ваши объекты: {data.length}/1</p>
              <div className={styles.rightItems}>
                {data.map((el, i) => (
                  <div key={i} className={styles.object}>
                    <p>{el.name}</p>
                    <div className={styles.icon}>
                      <EditIcon
                        sx={{ color: "green" }}
                        onClick={() => setSelected(el)}
                      />
                      <CloseIcon
                        sx={{ color: "red" }}
                        onClick={() => deleteItem(el.id)}
                      />
                    </div>
                  </div>
                ))}

                <Link
                  href="/dashboard/new"
                  style={{ width: "100%", marginTop: 20 }}
                  className={styles.linkAdd}
                >
                  <div className={styles.addObject}>
                    <p>+ Добавить объект</p>
                  </div>
                </Link>
              </div>
              <VipBanner text="Баннер premium" />
            </div>
          </div>
        </div>
      ) : (
        <ObjectEdit item={selected} back={() => setSelected({})} />
      )}
    </>
  );
}
