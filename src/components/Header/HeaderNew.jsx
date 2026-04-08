"use client";

import { Search, User, Heart, ShoppingBag, Phone, MapPin } from "lucide-react";

export default function HeaderNew() {
  return (
    <header className="fixed top-0 left-0 w-full border-b text-sm text-gray-700 bg-white z-50">
      <div className="px-6 h-[35px] py-2 bg-gray-100 text-gray-500 overflow-hidden relative ">
        <p className="absolute whitespace-nowrap animate-marquee text-[10px] flex items-center ">
          <picture className="topInfo__decor px-3">
            <img
              src="https://motherbear.ru/static/images/required/decor/star-octa-24.svg"
              alt="star"
              className="w-6 h-6"
            />
          </picture>
          Какой-то текст с акциями и т.д
          <picture className="topInfo__decor px-3">
            <img
              src="https://motherbear.ru/static/images/required/decor/star-octa-24.svg"
              alt="star"
              className="w-6 h-6"
            />
          </picture>
        </p>
      </div>
      {/* TOP BAR */}
      <div className="hidden md:flex justify-between px-6 py-2 text-[14px]">
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>Астрахань</span>
        </div>

        <div className="hidden md:flex gap-6">
          <span>О нас</span>
          <span>Помощь</span>
          <span>Текст 4</span>
          <span>Текст 5</span>
          <span>Текст 6 </span>
          <span>Текст 7</span>
        </div>

        <div className="flex items-center gap-2">
          <Phone size={16} />
          <span>+7 (499) 999-99-99</span>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="flex items-center justify-between px-6 py-2 text-[14px] ">
        {/* LEFT */}
        <div className="flex items-center gap-6 font400 ">
          <button className="hidden md:flex items-center gap-2 bg-beige-200 px-4 py-2  rounded-md  bg-orange-200 ">
            <span className="text-lg ">☰</span>
            КАТАЛОГ
          </button>
          <button className=" md:hidden  py-2 rounded-md ">
            <span className="text-lg ">☰</span>
          </button>
          <nav className="hidden md:flex gap-4">
            <span>НОВОСТИ</span>
            <span>МЕРОПРИЯТИЯ</span>
            <span className="text-orange-500"> ЧТО-ТО ЕЩЕ</span>
          </nav>
        </div>

        {/* LOGO */}
        <div className="text-3xl font-bold text-orange-500 tracking-wide">
          kryzhok
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center border-b border-gray-300 pb-1">
            <input
              placeholder="Поиск"
              className="outline-none bg-transparent placeholder-gray-400 border-none"
            />
            <Search size={18} className="ml-2" />
          </div>
          <Search size={20} className="ml-2" />
          <User size={20} className="cursor-pointer hidden md:flex" />
          <Heart size={20} className="cursor-pointer hidden md:flex" />
          <ShoppingBag size={20} className="cursor-pointer hidden md:flex" />
        </div>
      </div>
    </header>
  );
}
