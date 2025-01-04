import { Card } from "../components/ui/card.jsx";
import { useState } from "react";
import {
  Plus,
  Clock,
  MapPin,
  Phone,
  Star,
  Utensils,
  DollarSign,
  Info,
} from "lucide-react";
import MenuType from "../components/ui/menutype.jsx";
import Tags from "../components/ui/tags.jsx";
import Input from "../components/ui/Input.jsx";
import { Search } from "lucide-react";
import MenuGrid from "./MenuGrid.jsx";

const tags = [
  { name: "All", count: 25 },
  { name: "Soup", count: 9 },
  { name: "Appetizer", count: 15 },
  { name: "Chicken", count: 0 },
  { name: "Beef", count: 0 },
  { name: "Lo mein", count: 0 },
];

const menuTypes = [
  { type: "All Day", time: "10:00 AM - 10:00 PM" },
  { type: "Lunch", time: "11:00 AM - 3:00 PM" },
  { type: "Catering", time: "Appointment Only" },
];

export default function DemoPage() {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [getAvailableTime, setAvailableTime] = useState("");
  const [tag, setTag] = useState("");
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
              <h3 className="font-semibold text-xl">Hunan Express</h3>
              {/* Restaurant Description */}
              <p className="text-sm text-gray-600 mt-2">
                This is a description of the store. We serve delicious food made
                with fresh ingredients and great care.
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
                      <p className="text-sm text-gray-600">201-384-1880</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 max-w-[400px] max-h-[80px]">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <h3 className="font-semibold">Hours</h3>
                      <p className="text-sm text-gray-600">
                        11:00 AM - 10:00 PM
                      </p>
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
      {/* Restaurant Header */}
      <div className="sticky top-[64px] z-50 bg-white border-b max-w-7xl mx-auto">
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
              <MenuType menutypes={menuTypes} onMenuSelect={handleMenuSelect} />
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
        <Tags tags={tags} onTagClick={onTagClick} />
      </div>
      {/* Menu Items */}
      <MenuGrid searchTerm={searchTerm} tag={tag} />
    </div>
  );
}
