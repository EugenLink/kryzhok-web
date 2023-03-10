import { Button, Input, message, Space } from "antd";
import { useState } from "react";
const Login = ({ func }) => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Space direction="vertical">
      {contextHolder}
      <Input
        placeholder="Логин"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <Input.Password
        placeholder="Пароль"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <Button
        type="primary"
        style={{ float: "right", marginTop: "15px" }}
        onClick={() => {
          if (login === "admin" && pass === "qJzdk+=?-a{=#F7D") {
            func();
          } else {
            messageApi.error("Неверный логин или пароль");
          }
        }}
      >
        Войти
      </Button>
    </Space>
  );
};
export default Login;
