import { Card } from "../components/ui/card.jsx";
import { useState } from "react";
import { Clock, Phone } from "lucide-react";
import MenuGrid from "../components/MenuGrid.jsx";
import MenuItem from "../components/MenuItem.jsx";
import RestaurantHeader from "../components/RestaurantHeader.jsx";
import { Separator } from "@radix-ui/react-separator";
import { restaurant } from "../services/restaurantService.jsx";

export default function RestaurantPage() {
  const [tag, setTag] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const onTagClick = (selectedTag) => {
    setTag(selectedTag);
  };
  const handleSearch = (query) => {
    setSearchTerm(query);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Image */}
      <div className="relative w-full h-[300px]">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
          alt="test"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Restaurant Information */}
      <div className="bg-gray border-b px-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-4 max-w-full">
              {/* Restaurant Name */}
              <h3 className="font-semibold text-xl">{restaurant.name}</h3>
              {/* Restaurant Description */}
              <p className="text-sm text-gray-600 mt-2">
                {restaurant.description}
              </p>
              <div className="flex items-center mt-4">
                {/* Review Section */}
                <span className="text-yellow-500">★★★★☆</span>
                <span className="ml-2 text-gray-600">
                  4.0 Stars (25 Reviews)
                </span>
              </div>
              <div className="border-b-2 border-gray-300 my-4"></div>
              {/* Restaurant Contacts & Hours */}
              <div className="flex flex-col gap-4">
                <Card className="p-4 max-w-[400px] max-h-[80px]">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <h3 className="font-semibold">Contact</h3>
                      <p className="text-sm text-gray-600">
                        {restaurant.info.contact}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 max-w-[400px]">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div className="w-full">
                      <h3 className="font-semibold">Hours</h3>
                      {restaurant.info.hours.map((hours, index) => (
                        <div
                          key={index}
                          className="flex justify-center items-center mr-[100px]"
                        >
                          <p className="text-sm text-gray-600">{hours.day}:</p>
                          <p className="inline text-sm text-gray-600 ml-auto">
                            {hours.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            {/* Restaurant Location */}
            <Card className="p-4 max-w-[400px] max-h-[373px]">
              <div className="flex items-start gap-3">
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <img
                    src="/staticMaps/hunanexpressStaticMap.png"
                    alt="staticMap"
                    className="w-full h-full object-cover"
                  />
                  <div className="border-b-2 border-gray-300 my-4"></div>
                  <p className="text-sm text-gray-600">
                    161 N Washington Ave, Bergenfield, NJ 07621
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Separator />
      {/* Featured Items */}
      <div className="max-w-7xl mx-auto flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-semibold px-10">Customer Favorites</h2>
      </div>
      <div className="max-w-7xl mx-auto px-10">
        <div className="w-full overflow-x-auto flex gap-4 custom-scroll mb-3">
          {restaurant.featuredMenu.map((item) => (
            <MenuItem key={item.id} item={item} featured={true} />
          ))}
        </div>
      </div>
      {/* Restaurant Header */}
      <RestaurantHeader
        category={restaurant.category}
        menuTypes={restaurant.menuTypes}
        defaultMenu={restaurant.menuTypes[0].type}
        defaultTime={restaurant.menuTypes[0].time}
        onTagClick={onTagClick}
        handleSearch={handleSearch}
      />
      {/* Regular Menu Items */}
      <MenuGrid searchTerm={searchTerm} tag={tag} />
    </div>
  );
}
