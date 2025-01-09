import MenuType from "./ui/menutype.jsx";
import Tags from "./ui/tags.jsx";
import Input from "./ui/Input.jsx";
import { Search } from "lucide-react";
import { useState } from "react";

export default function RestaurantHeader({category, menuTypes, defaultMenu, defaultTime, onTagClick, handleSearch}) {
      const [selectedMenu, setSelectedMenu] = useState(defaultMenu);
      const [getAvailableTime, setAvailableTime] = useState(defaultTime);
      const handleMenuSelect = (menuType, time) => {
        setSelectedMenu(menuType);
        setAvailableTime(time);
      };
  return (
    <div className="sticky top-[64px] z-20 bg-white border-b max-w-7xl mx-auto px-10">
      <div className="px-4 py-1.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            {/* Menu Details*/}
            <div className="flex flex-col gap-2">
              {/* Menu title and available time */}
              <div>
                <h1 className="text-base font-semibold whitespace-nowrap">
                  {selectedMenu} Menu
                </h1>
                <h3 className="text-sm text-gray-500">{getAvailableTime}</h3>
              </div>
            </div>
          </div>
          {/* Add additional elements like cart or menu toggles here */}
          {/* Menu selection buttons */}
          <div className="flex gap-4">
            <MenuType
              menutypes={menuTypes}
              onMenuSelect={handleMenuSelect}
            />
          </div>
          <div className="max-h-[32px] relative flex-1 max-w-lg">
            <Input
              placeholder="Search Menu..."
              type="text"
              className="pl-10 w-full mb-12"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-6 text-gray-400" />
          </div>
        </div>
      </div>
      <Tags
        tags={category}
        onTagClick={onTagClick}
      />
    </div>
  );
}
