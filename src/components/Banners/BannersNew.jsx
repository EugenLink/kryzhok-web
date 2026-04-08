"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BannerNew() {
  const banners = [
    { src: "/banners/banner1.mp4", type: "video" },
    { src: "/banners/banner2.png", type: "photo" },
    { src: "/banners/banner3.png", type: "photo" },
  ];
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      loop
      navigation
      pagination={{ clickable: true }}
      autoplay={false}
      className="w-full h-[95vh] pt-[95px]"
    >
      {banners.map((e, i) => {
        if (e.type === "video") {
          return (
            <SwiperSlide key={i} className="h-full">
              <video
                src={e.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          );
        } else if (e.type === "photo") {
          return (
            <SwiperSlide key={i} className="h-full">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${e.src})` }}
              />
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );
}
