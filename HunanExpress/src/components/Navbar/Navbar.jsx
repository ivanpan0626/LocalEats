import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";

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
      {/* Black Background Overlay */}
      {isCartOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 z-40"
          onClick={toggleCart} // Close on clicking the overlay
        />
      )}

      {/* Cart Popup */}
      {isMounted && (
        <div
          className={`fixed top-0 right-0 w-full h-full bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
            isCartOpen ? "animate-slide-in" : "animate-slide-out right-[-100%]"
          } z-50 sm:w-[300px]`} // Full-screen on mobile, fixed width on larger screens
        >
          <div className="p-4 overflow-y-auto h-full">
            <h2 className="font-bold text-lg mb-4">Your Cart</h2>
            <ul>
              {cart.items.map((item) => (
                <li key={item.food.id} className="mb-2">
                  <div className="flex justify-between">
                    <span>{item.food.name}</span>
                    <span>
                      {item.quantity} x ${item.price.toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              <span>Total:</span>
              <span>${cart.totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={toggleCart}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
