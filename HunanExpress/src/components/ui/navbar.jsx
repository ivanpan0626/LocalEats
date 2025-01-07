import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useState, useEffect } from "react";
import Cart from "../Cart.jsx";

export default function Navbar({ cart }) {
  const { user, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // Set mounted to true once the component has been mounted
    setIsMounted(true);
  }, []);
  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav>
        <ul className="flex justify-end gap-4 items-center">
          {user ? (
            <li className="relative">
              <Link
                to="/profile"
                className="text-[#af1313] hover:bg-[#e72929] hover:text-white px-4 py-2 rounded"
              >
                {user.name}
              </Link>
              <div className="absolute z-10 bg-whitesmoke hidden menu">
                <Link
                  to="/profile"
                  className="block w-full min-w-[8rem] px-4 py-2 hover:bg-[#e72929] hover:text-white"
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block w-full min-w-[8rem] px-4 py-2 hover:bg-[#e72929] hover:text-white"
                >
                  Orders
                </Link>
                <a
                  onClick={handleLogout}
                  className="block w-full min-w-[8rem] px-4 py-2 hover:bg-[#e72929] hover:text-white cursor-pointer"
                >
                  Logout
                </a>
              </div>
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
      <Cart
        cart={cart}
        toggleCart={toggleCart}
        isCartOpen={isCartOpen}
        isMounted={isMounted}
      />
    </>
  );
}
