import { Button, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import styles from "./Offer.module.scss";
export const Offer = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    // if (typeof window !== "undefined") {
    //   const saved = localStorage.getItem(`subscription`);
    //   if (!saved) {
    //     const timer = setTimeout(() => setOpen(true), 35000);
    //   }
    // }
  }, []);
  const handleCancel = () => {
    setOpen(false);
  };

  const [value, setValue] = useState("");
  const [valid, setValid] = useState(true);

  const sendForm = () => {
    //Regex
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (value.match(emailRegex)) {
      const res = fetch(
        `https://u1978287.isp.regruhosting.ru/addToOffer.php?value=${value}`
      );
      setOpen(false);
      messageApi.success({
        content: "Спасибо за вашу подписку",
        className: styles.messageWrapper,
      });
      localStorage.setItem(`subscription`, true);
      //  then((res) => {
      //     console.log(res);
      //     if (res.status === 200) {
      //       setOpen(false);
      //       messageApi.success({
      //         content: "Спасибо за вашу подписку",
      //         className: styles.messageWrapper,
      //       });
      //       localStorage.setItem(`subscription`, true);
      //     }
      //   });
    } else {
      setValid(false);
      messageApi.error({
        content: "Вы указали некорректный email адрес.",
        className: styles.messageWrapper,
      });
    }
  };
  return (
    <div className={styles.wrapper}>
      <Modal
        zIndex={1000002}
        open={open}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => sendForm()}
          >
            Подписаться!
          </Button>,
        ]}
      >
        {contextHolder}
        <div className={styles.present}>
          <img src={"/icons/present.jpg"} alt={"present"} />
        </div>
        <div className={styles.bodyWrapper}>
          <p className={styles.title}>Подпишитесь сейчас!</p>
          <p className={styles.text}>
            Подпишись на рассылку, чтобы быть в курсе наших секретных распродаж,
            акций и персональных скидок!
          </p>

          <Input
            placeholder="E-mail"
            className={styles.email}
            bordered={true}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </Modal>
      {children}
    </div>
  );
};
