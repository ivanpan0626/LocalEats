import { Card } from "../components/ui/card.jsx";
import { useState } from "react";
import { Clock, Phone } from "lucide-react";
import MenuType from "../components/ui/menutype.jsx";
import Tags from "../components/ui/tags.jsx";
import Input from "../components/ui/Input.jsx";
import { Search } from "lucide-react";
import MenuGrid from "../components/MenuGrid.jsx";
import FeaturedItem from "../components/ui/featureditem.jsx";

const restaurant = {
  name: "Hunan Express",
  description:
    "This is a description of the store. We serve delicious food made with fresh ingredients and great care.",
  info: {
    hours: [
      { day: "Mon-Thurs", time: "10:30 AM - 10:00 PM" },
      { day: "Fri-Sun", time: "10:30 AM - 11:00 PM" },
    ],
    contact: "201-384-1880",
    address: "161 N Washington Ave, Bergenfield, NJ, 07621",
  },
  reviews: [],
  featuredMenu: [
    {
      id: "Eggroll",
      name: "Eggroll",
      description: "Crispy, deep-fried rolls with a vegetable filling.",
      price: 1.8,
      imageUrl: "/foods/eggroll.jpg",
      category: "Appetizer",
      isSpicy: false,
      required: [],
      customizations: [],
      priceOptions: [1.8],
      instructions: "",
    },
    {
      id: "Shrimp Roll",
      name: "Shrimp Roll",
      description: "Crispy rolls filled with seasoned shrimp.",
      price: 1.9,
      imageUrl: "/foods/shrimproll.jpg",
      category: "Appetizer",
      isSpicy: false,
      required: [],
      customizations: [],
      priceOptions: [1.9],
      instructions: "",
    },
    {
      id: "Shanghai Spring Roll(2)",
      name: "Shanghai Spring Roll(2)",
      description: "Crispy fried spring rolls with pork and vegetables.",
      price: 2.95,
      imageUrl: "/foods/springroll.jpg",
      category: "Appetizer",
      isSpicy: false,
      required: [],
      customizations: [],
      priceOptions: [2.95],
      instructions: "",
    },
    {
      id: "Steamed Dumplings",
      name: "Steamed Dumplings",
      description:
        "Dumplings filled with your choice of pork, chicken, or vegetables.",
      price: 8.45,
      imageUrl: "/foods/steam-dumpling.jpg",
      category: "Appetizer",
      isSpicy: false,
      required: [
        { id: "Pork", label: "Pork", price: 0 },
        { id: "Chicken", label: "Chicken", price: 0 },
        { id: "Vegetable", label: "Vegetable", price: 0 },
      ],
      customizations: [],
      priceOptions: [8.45, 8.45, 8.45],
      instructions: "",
    },
    {
      id: "Fried Dumplings",
      name: "Fried Dumplings",
      description:
        "Crispy fried dumplings with a choice of pork, chicken, or vegetable filling.",
      price: 8.45,
      imageUrl: "/foods/fried-dumpling.jpg",
      category: "Appetizer",
      isSpicy: true,
      required: [
        { id: "Pork", label: "Pork", price: 0 },
        { id: "Chicken", label: "Chicken", price: 0 },
        { id: "Vegetable", label: "Vegetable", price: 0 },
      ],
      customizations: [],
      priceOptions: [8.45, 8.45, 8.45],
      instructions: "",
    },
  ],
  menu: [],
  category: [
    { name: "All" },
    { name: "Soup" },
    { name: "Appetizer" },
    { name: "Chicken" },
    { name: "Beef" },
    { name: "Lo mein" },
  ],
  menuTypes: [
    { type: "All Day", time: "10:30 AM - 10:00 PM" },
    { type: "Lunch", time: "11:30 AM - 3:00 PM" },
    { type: "Catering", time: "Appointment Only" },
  ],
};

export default function RestaurantPage() {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [getAvailableTime, setAvailableTime] = useState("");
  const [tag, setTag] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const onTagClick = (selectedTag) => {
    setTag(selectedTag);
  };
  const handleSearch = (query) => {
    setSearchTerm(query);
  };
  const handleMenuSelect = (menuType, time) => {
    setSelectedMenu(menuType);
    setAvailableTime(time);
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
      <div className="bg-gray border-b">
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
      {/* Featured Items */}
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-semibold">Featured Items</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {restaurant.featuredMenu.map((item) => (
          <FeaturedItem key={item.id} item={item} />
        ))}
      </div>

      {/* Restaurant Header */}
      <div className="sticky top-[64px] z-20 bg-white border-b max-w-7xl mx-auto">
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
                menutypes={restaurant.menuTypes}
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
          tags={restaurant.category}
          selectedTag={tag}
          onTagClick={onTagClick}
        />
      </div>
      {/* Regular Menu Items */}
      <MenuGrid searchTerm={searchTerm} tag={tag} />
    </div>
  );
}
