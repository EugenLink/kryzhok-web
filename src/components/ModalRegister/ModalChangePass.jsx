import * as React from "react";
import styles from "./ModalRegister.module.scss";

import { Button, Input, message, Modal } from "antd";
import axios from "axios";
import { $user } from "@/state/products";
import { useStore } from "effector-react";

export default function ModalChangePass({ handleOk, isOpen, cancel }) {
  // Пустой массив зависимостей означает, что запрос выполнится один раз при монтировании
  const user = useStore($user); // Получаем данные пользователя из хранилища

  const [data, setData] = React.useState({
    oldPass: "",
    newPass: "",
    secondNewPass: "",
  });
  const [errors, setErrors] = React.useState({
    oldPass: null,
    newPass: null,
    secondNewPass: null,
  });
  const [messageApi, contextHolder] = message.useMessage();
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
  const changeInput = (type, value) => {
    setErrors({ ...errors, [type]: null });

    setData({ ...data, [type]: value });
  };
  const changeSubm = async (data) => {
    const newErr = errors;

    if (data.newPass.length < 3) {
      newErr.newPass = "error";
    }
    if (data.newPass !== data.secondNewPass) {
      newErr.secondNewPass = "error";
    }
    if (data.oldPass.length < 3) {
      newErr.oldPass = "error";
    }

    if (!newErr.newPass && !newErr.oldPass && !newErr.secondNewPass) {
      let formData = new FormData();

      formData.append("id", user.id);
      formData.append("oldPassword", data.oldPass);
      formData.append("newPassword", data.newPass);

      try {
        const response = await axios.post(
          "https://u1978287.isp.regruhosting.ru/kryzhok/users/change-password.php",
          formData
        );
        if (response.data.status === "success") {
          success("Вы успешно сменили пароль");
          handleOk();
        } else {
          error("Неверный старый пароль");
        }
      } catch (e) {
        error("Произошла ошибка внутри сайта, пожалуйста попробуйте позже");
      }
    } else {
      setErrors({ ...newErr });
    }
  };

  return (
    <div className={styles.wrapper}>
      {contextHolder}

      <Modal
        open={isOpen}
        onOk={handleOk}
        onCancel={cancel}
        footer={null}
        width={450}
        closable={true}
      >
        <div className={styles.modalContent}>
          <h1>Сменить пароль</h1>
          <p className={styles.inputChange}>
            {errors.oldPass ? (
              <p className={styles.label}>Неверный старый пароль</p>
            ) : null}
            <Input.Password
              size="large"
              placeholder="Введите старый пароль"
              value={data.oldPass}
              onChange={(e) => changeInput("oldPass", e.target.value)}
            />
          </p>
          <p className={styles.inputChange}>
            {errors.newPass ? (
              <p className={styles.label}>Неверный старый пароль</p>
            ) : null}
            <Input.Password
              size="large"
              placeholder="Введите новый пароль"
              value={data.newPass}
              onChange={(e) => changeInput("newPass", e.target.value)}
            />
          </p>{" "}
          <p className={styles.inputChange}>
            {errors.secondNewPass ? (
              <p className={styles.label}>Неверный старый пароль</p>
            ) : null}
            <Input.Password
              size="large"
              placeholder="Введите новый пароль"
              value={data.secondNewPass}
              onChange={(e) => changeInput("secondNewPass", e.target.value)}
            />
          </p>
          <p className={styles.inputChange}>
            <Button
              block
              type="primary"
              className={styles.button}
              size="large"
              onClick={() => changeSubm(data)}
            >
              Сменить пароль
            </Button>
          </p>
        </div>
      </Modal>
    </div>
  );
}
