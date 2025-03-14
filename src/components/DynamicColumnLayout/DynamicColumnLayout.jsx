import React, { useRef, useState, useEffect } from "react";

const DynamicColumnLayout = ({ children }) => {
  const containerRef = useRef(null);
  const [columnCount, setColumnCount] = useState(1);
  useEffect(() => {
    const checkColumns = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const contentHeight = containerRef.current.scrollHeight;
        // Если высота контента больше высоты контейнера, используем 2 столбца
        if (contentHeight > containerHeight) {
          setColumnCount(2);
        } else {
          setColumnCount(1);
        }
      }
    };

    // Проверяем при монтировании и при изменении размера окна
    checkColumns();
    window.addEventListener("resize", checkColumns);

    // Очистка
    return () => window.removeEventListener("resize", checkColumns);
  }, [children]); // Зависимость от children, чтобы проверять при изменении контента

  return (
    <div
      ref={containerRef}
      style={{
        columnCount: columnCount,
        columnGap: "20px", // Расстояние между столбцами
        width: '60%',
        height: '100% ',
        display: 'inline-block'
      }}
    >
      {children}
    </div>
  );
};

export default DynamicColumnLayout;