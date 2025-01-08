import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Input from "./ui/Input.jsx";
import { Search } from "lucide-react";
import Navbar from "./ui/navbar.jsx";
import { useCart } from "../hooks/useCart";

Header.propTypes = {
  onSearch: PropTypes.func,
  onTagClick: PropTypes.func,
  isMenu: PropTypes.bool,
};

const tags = [
  { name: "All", count: 25 },
  { name: "Soup", count: 9 },
  { name: "Appetizer", count: 15 },
  { name: "Chicken", count: 0 },
  { name: "Beef", count: 0 },
  { name: "Lo mein", count: 0 },
];

export default function Header({ onSearch, onTagClick }) {
  const { cart } = useCart();
  return (
    <div className="sticky top-0 z-50 bg-white border-b">
      <div className="w-full mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Product Name and Search Bar */}
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-2xl font-bold whitespace-nowrap text-red-700">
              <Link to="/">Local Eats</Link>
            </h1>
            <div className="max-h-[32px] relative flex-1 max-w-md">
              <Input
                placeholder="Search Restaurants..."
                type="text"
                className="pl-10 w-full mb-12"
                onChange={(e) => onSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-6 text-gray-400" />
            </div>
          </div>
          {/* Add additional elements like cart or menu toggles here */}
          <div className="flex items-center gap-4 max-h-[32px]">
            <Navbar cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}
