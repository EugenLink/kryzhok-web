import {
  HomeIcon,
  Squares2X2Icon,
  ShoppingBagIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { label: "Главная", icon: HomeIcon },
  { label: "Каталог", icon: Squares2X2Icon },
  { label: "Что-то?", icon: ShoppingBagIcon },
  { label: "Избранное", icon: HeartIcon },
  { label: "Кабинет", icon: UserIcon },
];

export default function FooterNew() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="flex flex-col items-center justify-center text-gray-500 hover:text-black transition"
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </footer>
  );
}
