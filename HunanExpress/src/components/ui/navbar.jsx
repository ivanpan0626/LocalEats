import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useState, useEffect } from "react";
import Cart from "../Cart.jsx";

export default function Navbar({ cart }) {
  const { user, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  useEffect(() => {
    // Set mounted to true once the component has been mounted
    setIsMounted(true);
  }, []);

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState); // Toggle menu visibility
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="relative">
        {/* Hamburger Icon (visible on mobile) */}
        <button
          className="sm:hidden text-[#af1313] px-4 py-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu />
        </button>

        {/* Mobile Dropdown Menu (visible when toggled) */}
        <div
          className={`absolute top-full left-[-20px] w-50 bg-white shadow-lg rounded-md mt-2 ${
            isMenuOpen ? "block" : "hidden"
          } sm:hidden`}
        >
          {user ? (
            <div>
              <Link
                to="/profile"
                className="block px-4 py-2 text-[#af1313] hover:bg-[#e72929] hover:text-white"
              >
                Profile
              </Link>
              <Link
                to="/orders"
                className="block px-4 py-2 text-[#af1313] hover:bg-[#e72929] hover:text-white"
              >
                Orders
              </Link>
              <a
                onClick={handleLogout}
                className="block px-4 py-2 text-[#af1313] hover:bg-[#e72929] hover:text-white cursor-pointer"
              >
                Logout
              </a>
            </div>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 text-[#af1313] hover:bg-[#e72929] hover:text-white"
            >
              Login
            </Link>
          )}
          <Link
            to="/cart"
            className="block px-4 py-2 text-[#af1313] hover:bg-[#e72929] hover:text-white"
          >
            Cart
            {cart.totalCount > 0 && (
              <span className="bg-[#ff4040] text-white px-2 py-1 rounded-full text-xs ml-2">
                {cart.totalCount}
              </span>
            )}
          </Link>
        </div>

        {/* Menu (visible on larger screens or when toggled) */}
        <ul
          className={`flex justify-end gap-4 items-center sm:flex hidden sm:block`}
        >
          {user ? (
            <li className="relative">
              <Link
                to="/profile"
                className="text-[#af1313] hover:bg-[#e72929] hover:text-white px-4 py-2 rounded"
              >
                {user.name}
              </Link>
            </li>
          ) : (
            <Link
              to="/login"
              className="text-[#af1313] hover:bg-[#e72929] hover:text-white px-4 py-2 rounded"
            >
              Login
            </Link>
          )}
          <li>
            <button
              onClick={toggleCart}
              className="text-[#af1313] hover:bg-[#e72929] hover:text-white px-4 py-2 rounded"
            >
              Cart
              {cart.totalCount > 0 && (
                <span className="bg-[#ff4040] text-white px-2 py-1 rounded-full text-xs ml-2">
                  {cart.totalCount}
                </span>
              )}
            </button>
          </li>
        </ul>
      </nav>

      {/* Cart Modal */}
      <Cart
        cart={cart}
        toggleCart={toggleCart}
        isCartOpen={isCartOpen}
        isMounted={isMounted}
      />
    </>
  );
}
