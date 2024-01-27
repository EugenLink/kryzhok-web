import { Input } from "antd";
import { useEffect, useState } from "react";
import styles from "./ProductInput.module.scss";
const { TextArea } = Input;
export const ProductInput = ({ initState, change, type = "input" }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(initState);
  }, [initState]);

  return (
    <div className={styles.inputWrapper}>
      {type === "input" ? (
        <Input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            change(e.target.value);
          }}
        />
      ) : (
        <TextArea
          rows={4}
          placeholder=""
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            change(e.target.value);
          }}
        />
      )}
    </div>
  );
};
