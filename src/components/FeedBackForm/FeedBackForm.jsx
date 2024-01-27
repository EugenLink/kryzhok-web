import { message } from "antd";
import { useState } from "react";
import styles from "./FeedBackForm.module.scss";

export default function FeedBackForm() {
  const [form, setForm] = useState({
    fio: "",
    email: "",
    phone: "",
    city: "",
    question: "",
  });
  const [formValid, setFormValid] = useState({
    fio: undefined,
    email: undefined,
    phone: undefined,
    city: undefined,
    question: undefined,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const sendForm = () => {
    //Regex
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const valid = {
      fio: undefined,
      email: undefined,
      phone: undefined,
      city: undefined,
      question: undefined,
    };
    if (form.fio.length > 3) {
      valid.fio = true;
    } else {
      valid.fio = false;
    }

    if (form.email.match(emailRegex)) {
      valid.email = true;
    } else {
      valid.email = false;
    }

    if (form.phone.match(phoneRegex)) {
      valid.phone = true;
    } else {
      valid.phone = false;
    }

    if (form.city.length >= 3) {
      valid.city = true;
    } else {
      valid.city = false;
    }
    if (form.question.length > 3) {
      valid.question = true;
    } else {
      valid.question = false;
    }
    if (
      valid.fio &&
      valid.email &&
      valid.phone &&
      valid.question &&
      valid.city
    ) {
      const fmData = new FormData();
      fmData.append("initials", form.fio);
      fmData.append("email", form.email);
      fmData.append("phone", form.phone);
      fmData.append("city", form.city);
      fmData.append("text", form.question);

      fetch(`https://u1978287.isp.regruhosting.ru/addToFeedBack.php`, {
        method: "POST",
        body: fmData,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            messageApi.success(
              "Ваш вопрос отправлен, вскоре мы с вами свяжемся."
            );
            setForm({
              fio: "",
              email: "",
              phone: "",
              city: "",
              question: "",
            });
          } else {
            messageApi.error("Произошла ошибка, попробуйте позже.");
          }
        });
    } else {
      setFormValid(valid);
    }
  };

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <div className={styles.flex}>
        <input
          type="text"
          className={`${styles.textInput} ${
            formValid.fio === false ? styles.validError : null
          }`}
          placeholder={"Ф.И.О"}
          style={{ marginRight: 10 }}
          value={form.fio}
          onChange={(e) => {
            setFormValid({ ...formValid, fio: true });
            setForm({ ...form, fio: e.target.value });
          }}
        />
        <input
          type="text"
          className={`${styles.textInput} ${
            formValid.email === false ? styles.validError : null
          }`}
          placeholder={"E-mail"}
          value={form.email}
          onChange={(e) => {
            const value = e.target.value;
            setFormValid({ ...formValid, email: true });
            setForm({ ...form, email: value });
          }}
        />
      </div>
      <div className={styles.flex}>
        <input
          type="text"
          className={`${styles.textInput} ${
            formValid.phone === false ? styles.validError : null
          }`}
          placeholder={"Телефон"}
          style={{ marginRight: 10 }}
          value={form.phone}
          onChange={(e) => {
            setFormValid({ ...formValid, phone: true });
            const value = e.target.value;
            setForm({ ...form, phone: value });
          }}
        />
        <input
          type="text"
          className={`${styles.textInput} ${
            formValid.city === false ? styles.validError : null
          }`}
          placeholder={"Ваш город"}
          value={form.city}
          onChange={(e) => {
            setFormValid({ ...formValid, city: true });
            const value = e.target.value;
            setForm({ ...form, city: value });
          }}
        />
      </div>
      <textarea
        name="comment"
        className={`${styles.textArea} ${
          formValid.question === false ? styles.validError : null
        }`}
        placeholder={"Ваш вопрос"}
        value={form.question}
        onChange={(e) => {
          setFormValid({ ...formValid, question: true });
          const value = e.target.value;
          setForm({ ...form, question: value });
        }}
      ></textarea>
      <div className={styles.buttomWrapper}>
        <button className={styles.sendForm} onClick={() => sendForm()}>
          Отправить
        </button>
        <p>
          * Нажимая на кнопку, вы даёте согласие на обработку персональных
          данных.
        </p>
      </div>
    </div>
  );
}
