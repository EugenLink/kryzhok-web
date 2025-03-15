import * as React from "react";
import styles from "./ModalRegister.module.scss";
import { DatePicker, Input, message } from "antd";
import { Modal } from "antd";
import { Button } from "antd";
import axios from "axios";

import { useState } from "react";
import { setUser } from "@/state/products";

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export default function ModalRegister({ handleOk, isOpen, cancel }) {
  const [type, setType] = useState("login");
  const [select, setSelect] = useState("user");
  const [forgot, setForgot] = useState(false);
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
  const [form, setForm] = useState({
    email: "",
    pass: "",
    confPass: "",
    bdate: "",
    phone: "",
    name: "",
    nameComp: "",
  });
  const [errors, setErrors] = React.useState({
    email: null,
    confPass: null,
    pass: null,
    bdate: null,
    phone: null,
    name: null,
    nameComp: null,
  });

  const register = async (data) => {
    let formData = new FormData();
    if (select === "user") {
      formData.append("username", data.name);
      formData.append("confidant", data.name);
    } else {
      formData.append("username", data.nameComp);
      formData.append("confidant", data.name);
    }
    formData.append("password", data.pass);
    formData.append("bdate", data.bdate);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("type", select);
    try {
      const response = await axios.post(
        "https://u1978287.isp.regruhosting.ru/kryzhok/users/register.php",
        formData
      );
      if (response.data.status === "success") {
        success("Вы успешно Зарегестрировались, теперь войдите!");
        setType("login");
      } else {
        error("Неверное имя пользователя или пароль");
      }
    } catch (e) {
      error("Произошла ошибка внутри сайта, пожалуйста попробуйте позже");
    }
  };

  const login = async (data) => {
    let formData = new FormData();

    formData.append("username", data.email);
    formData.append("password", data.pass);
    formData.append("type", select);

    try {
      const response = await axios.post(
        "https://u1978287.isp.regruhosting.ru/kryzhok/users/login.php",
        formData
      );
      if (response.data.status === "success") {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        success("Вы успешно вошли!");
        handleOk();
        setUser(response.data.user);
      } else {
        error("Неверное имя пользователя или пароль");
      }
    } catch (e) {
      error("Произошла ошибка внутри сайта, пожалуйста попробуйте позже");
    }
  };

  const submit = (data) => {
    const newErr = errors;
    // ЛОГИН ПОЛЬЗОВАТЕЛЬ
    if (type === "login") {
      if (!isValidEmail(data.email)) {
        newErr.email = "error";
      }
      if (data.pass.length < 4) {
        newErr.pass = "error";
      }
      if (newErr.email || newErr.pass) {
        setErrors({ ...newErr });
      } else {
        login(form);
      }
    } else {
      // РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЬ
      if (select === "user") {
        if (!isValidEmail(data.email)) {
          newErr.email = "error";
        }
        if (data.pass.length < 4) {
          newErr.pass = "error";
        }
        if (data.confPass !== data.pass) {
          newErr.confPass = "error";
        }
        if (data.bdate.length < 4) {
          newErr.bdate = "error";
        }
        if (data.name.length < 3) {
          newErr.name = "error";
        }

        if (
          newErr.name ||
          newErr.bdate ||
          newErr.confPass ||
          newErr.pass ||
          newErr.email
        ) {
          setErrors({ ...newErr });
        } else {
          register(form);
        }
      } else {
        // РЕГИСТРАЦИЯ КОМПАНИЯ
        if (!isValidEmail(data.email)) {
          newErr.email = "error";
        }
        if (data.pass.length < 4) {
          newErr.pass = "error";
        }

        if (data.confPass !== data.pass) {
          newErr.confPass = "error";
        }
        if (data.nameComp.length < 4) {
          newErr.nameComp = "error";
        }
        if (data.name.length < 3) {
          newErr.name = "error";
        }
        if (
          newErr.name ||
          newErr.nameComp ||
          newErr.confPass ||
          newErr.pass ||
          newErr.email
        ) {
          setErrors({ ...newErr });
        } else {
          register(form);
        }
      }
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      setForm({ ...form, bdate: date.format("DD.MM.YYYY") });
      setErrors({ ...errors, bdate: null });
    } else {
      console.log("Дата не выбрана");
    }
  };
  const changeInput = (type, value) => {
    setErrors({ ...errors, [type]: null });
    setForm({ ...form, [type]: value });
  };
  const forgotSumb = async (email) => {
    let newErr = {};
    if (!isValidEmail(email)) {
      newErr.email = "error";
    }

    if (newErr.email) {
      setErrors({ ...newErr });
    } else {
      let formData = new FormData();

      formData.append("email", email);

      try {
        const response = await axios.post(
          "https://u1978287.isp.regruhosting.ru/kryzhok/users/forgot_password.php",
          formData
        );
        if (response.data.status === "success") {
          setForgot(false);
          success("Проверьте вашу почту!");
        } else {
          error("Такого email не существует");
        }
      } catch (e) {
        error("Произошла ошибка внутри сайта, пожалуйста попробуйте позже");
      }
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
        closable={true}
      >
        <div className={styles.modalContent}>
          {forgot ? (
            <div>
              <div className={styles.selectType}></div>

              <div style={{ padding: "0 20px" }}>
                <h1>Забыл пароль?</h1>
                <div className={styles.formLogin}>
                  <p>
                    {errors.email ? (
                      <p className={styles.label}>Неверный E-mail</p>
                    ) : null}
                    <Input
                      size="large"
                      placeholder="Введите ваш E-mail"
                      status={errors.email}
                      value={form.email}
                      onChange={(e) => changeInput("email", e.target.value)}
                    />
                  </p>
                </div>
                <Button
                  block
                  type="primary"
                  className={styles.button}
                  size="large"
                  onClick={() => forgotSumb(form.email)}
                >
                  Сбросить пароль
                </Button>
                <p className={styles.underButton}>
                  <span onClick={() => setForgot(false)}>Вернуться</span>
                </p>
              </div>
            </div>
          ) : (
            <div>
              {type === "register" ? (
                <div className={styles.selectType}>
                  <p
                    className={select === "user" ? null : styles.activeSelect}
                    onClick={() => {
                      setSelect("user");
                      setErrors({
                        email: null,
                        confPass: null,
                        pass: null,
                        bdate: null,
                        phone: null,
                        name: null,
                        nameComp: null,
                      });
                    }}
                  >
                    Пользователь
                  </p>
                  <p
                    className={select === "comp" ? null : styles.activeSelect}
                    onClick={() => {
                      setErrors({
                        email: null,
                        confPass: null,
                        pass: null,
                        bdate: null,
                        phone: null,
                        name: null,
                        nameComp: null,
                      });
                      setSelect("comp");
                    }}
                  >
                    Компания
                  </p>
                </div>
              ) : null}

              {type === "login" ? (
                <div style={{ padding: "0 20px" }}>
                  <h1>Вход</h1>
                  <div className={styles.formLogin}>
                    <p>
                      {errors.email ? (
                        <p className={styles.label}>Неверный E-mail</p>
                      ) : null}
                      <Input
                        size="large"
                        placeholder="Введите ваш E-mail"
                        status={errors.email}
                        value={form.email}
                        onChange={(e) => changeInput("email", e.target.value)}
                      />
                    </p>
                    <p>
                      {errors.pass ? (
                        <p className={styles.label}>Неверный пароль</p>
                      ) : null}
                      <Input.Password
                        size="large"
                        placeholder="Введите пароль"
                        status={errors.pass}
                        value={form.pass}
                        onChange={(e) => changeInput("pass", e.target.value)}
                      />
                    </p>
                    <p
                      className={styles.forgotPass}
                      onClick={() => setForgot(true)}
                    >
                      Забыли пароль?
                    </p>
                  </div>
                  <Button
                    block
                    type="primary"
                    className={styles.button}
                    size="large"
                    onClick={() => submit(form)}
                  >
                    Войти
                  </Button>
                  <p className={styles.underButton}>
                    Еще нет аккаунта?{" "}
                    <span onClick={() => setType("register")}>
                      Зарегистрироваться
                    </span>
                  </p>
                </div>
              ) : (
                <div style={{ padding: "0 20px" }}>
                  <h1>Регистарция</h1>
                  <div className={styles.formLogin}>
                    <p>
                      {errors.email ? (
                        <p className={styles.label}>Неверный E-mail</p>
                      ) : null}
                      <Input
                        size="large"
                        placeholder="Введите ваш E-mail"
                        status={errors.email}
                        value={form.email}
                        onChange={(e) => changeInput("email", e.target.value)}
                      />
                    </p>
                    {select === "user" ? (
                      <p>
                        {errors.name ? (
                          <p className={styles.label}>
                            Поле не должно быть пустым
                          </p>
                        ) : null}
                        <Input
                          size="large"
                          placeholder="Имя"
                          status={errors.name}
                          value={form.name}
                          onChange={(e) => changeInput("name", e.target.value)}
                        />
                      </p>
                    ) : (
                      <p>
                        {errors.nameComp ? (
                          <p className={styles.label}>
                            Поле не должно быть пустым
                          </p>
                        ) : null}
                        <Input
                          size="large"
                          placeholder="Название компании"
                          status={errors.nameComp}
                          value={form.nameComp}
                          onChange={(e) =>
                            changeInput("nameComp", e.target.value)
                          }
                        />
                      </p>
                    )}
                    {select === "comp" ? (
                      <p>
                        {errors.name ? (
                          <p className={styles.label}>
                            Поле не должно быть пустым
                          </p>
                        ) : null}
                        <Input
                          size="large"
                          placeholder="Доверенное лицо"
                          status={errors.name}
                          value={form.name}
                          onChange={(e) => changeInput("name", e.target.value)}
                        />
                      </p>
                    ) : null}

                    {select === "user" ? (
                      <p>
                        {errors.bdate ? (
                          <p className={styles.label}>
                            Поле не должно быть пустым
                          </p>
                        ) : null}
                        <DatePicker
                          onChange={handleDateChange}
                          size="large"
                          status={errors.bdate}
                          placeholder="День рождения"
                          style={{ width: "100%" }}
                          format={"DD.MM.YYYY"}
                        />
                      </p>
                    ) : null}
                    <p>
                      {errors.pass ? (
                        <p className={styles.label}>Неверный пароль</p>
                      ) : null}
                      <Input.Password
                        size="large"
                        placeholder="Введите пароль"
                        status={errors.pass}
                        value={form.pass}
                        onChange={(e) => changeInput("pass", e.target.value)}
                      />
                    </p>
                    <p>
                      {errors.confPass ? (
                        <p className={styles.label}>Неверный пароль</p>
                      ) : null}
                      <Input.Password
                        size="large"
                        placeholder="Подтвердите пароль"
                        status={errors.confPass}
                        value={form.confPass}
                        onChange={(e) =>
                          changeInput("confPass", e.target.value)
                        }
                      />
                    </p>
                  </div>
                  <Button
                    block
                    type="primary"
                    className={styles.button}
                    onClick={() => submit(form)}
                    size="large"
                  >
                    Регистарция
                  </Button>
                  <p className={styles.underButton}>
                    Уже есть аккаунт?{" "}
                    <span onClick={() => setType("login")}>Войти</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
