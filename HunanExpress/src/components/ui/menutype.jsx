import { useState } from "react";
export default function MenuType({ menutypes, onMenuSelect }) {
  const [selectedMenu, setSelectedMenu] = useState("All Day"); // Default menu selection

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu.type);
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
              ? "font-semibold text-sm bg-gray-200 rounded"
              : "font-normal text-sm"
          }`}
        >
          {menu.type}
        </button>
      ))}
    </>
  );
}
