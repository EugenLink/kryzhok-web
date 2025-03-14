import { useEffect, useState } from "react";
import styles from "./Loader.module.scss";
import { ColorRing } from "react-loader-spinner";
export const Loader = () => {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoad(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.loader}>
      <ColorRing
        visible={true}
        height="180"
        width="180"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};
