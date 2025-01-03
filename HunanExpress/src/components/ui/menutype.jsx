import { useState } from "react";
export default function MenuType({ menutypes, onMenuSelect }) {
  const [selectedMenu, setSelectedMenu] = useState(""); // Default menu selection
  const [getTime, setGetTime] = useState("");

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu.type);
    setGetTime(menu.time);
    onMenuSelect(menu.type, menu.time); // Pass values back to the parent
  };
  return (
    <>
      {menutypes.map((menu) => (
        <button
          key={menu.type}
          onClick={() => handleMenuSelect(menu)}
          className={`${
            selectedMenu === menu.type
              ? "font-semibold text-sm"
              : "font-normal text-sm"
          }`}
        >
          {menu.type}
        </button>
      ))}
    </>
  );
}
