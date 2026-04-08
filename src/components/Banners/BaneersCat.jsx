"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
export default function BannerCat() {
  const banners = [
    { src: "/banners/banner11.jpg", type: "photo" },
    { src: "/banners/banner12.jpg", type: "photo" },
    { src: "/banners/banner13.jpg", type: "photo" },
    { src: "/banners/banner14.jpg", type: "photo" },
  ];
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      if (width >= 1200) setSlidesPerView(4);
      else if (width >= 768) setSlidesPerView(3);
      else if (width >= 480) setSlidesPerView(2);
      else setSlidesPerView(1);
    };

    // Устанавливаем начальное значение
    updateSlidesPerView();

    // Подписываемся на изменение размера окна
    window.addEventListener("resize", updateSlidesPerView);

    // Очистка при размонтировании
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={slidesPerView}
      loop
      navigation
      pagination={{ clickable: true }}
      autoplay={false}
      className="w-[95%] h-[430px] pt-5 pb-10"
    >
      {banners.map((e, i) => {
        return (
          <SwiperSlide key={i} className="h-full w-full">
            <div
              className="w-full h-full  bg-cover bg-center "
              style={{ backgroundImage: `url(${e.src})` }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
