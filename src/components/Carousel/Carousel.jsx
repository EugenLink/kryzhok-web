import React from "react";
import styles from "./Carousel.module.scss";
const CustomArrow = ({ direction, onClick }) => {
  const arrowClass =
    direction === "prev" ? styles.custom_prev_arrow : styles.custom_next_arrow;
  return (
    <div className={`${styles.custom_arrow} ${arrowClass}`} onClick={onClick}>
      <div>{direction === "prev" ? "<" : ">"}</div>
    </div>
  );
};

export default CustomArrow;
