import { useEffect } from "react";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

export default function Cart({ cart, toggleCart, isCartOpen, isMounted }) {
  useEffect(() => {
    // Disable scrolling when the cart is open
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling when cart is closed
    }

    // Cleanup: Ensure scrolling is enabled when component unmounts or cart closes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  const { changeQuantity, removeFromCart } = useCart();

  const customizeInfo = (customizations, instructions) => {
    let customizeText = customizations.join(", ");
    if (instructions !== "") {
      return customizeText + ", " + instructions;
    }
    return customizeText;
  };

  return (
    <>
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
          } z-50 sm:w-[320px]`} // Full-screen on mobile, fixed width on larger screens
        >
          <div className="flex flex-col h-full">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={toggleCart}
                className="text-gray-600 text-2xl"
                aria-label="Close Cart"
              >
                &times; {/* Close Icon */}
              </button>
            </div>

            <h2 className="font-bold text-2xl text-center py-4">Your Cart</h2>

            {/* Empty Cart State */}
            {cart.items.length === 0 ? (
              <p className="text-center text-lg text-gray-500">
                Your cart is empty
              </p>
            ) : (
              <div className="flex-1 overflow-y-auto px-4 custom-scroll">
                <ul>
                  {cart.items.map((item) => (
                    <li
                      key={item.food.id}
                      className="flex justify-between items-center mb-4 border-b pb-2"
                    >
                      <div className="flex flex-col w-3/4">
                        <span className="text-sm font-semibold">
                          {item.food.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          ${item.price.toFixed(2)}
                        </span>
                        {(item.food.instructions ||
                          item.food.selectedCustomizations.length !== 0) && (
                          <span className="text-xs text-gray-400 mt-1 italic">
                            {customizeInfo(
                              item.food.selectedCustomizations,
                              item.food.instructions
                            )}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        {/* Quantity Dropdown */}
                        <div className="mt-2 flex items-center">
                          {/* Quantity Select as a Circle */}
                          <select
                            id={`quantity-${item.food.id}`}
                            value={item.quantity}
                            onChange={(e) => {
                              changeQuantity(item, e.target.value);
                            }}
                            className="w-15 bg-gray-100 border border-gray-300 text-center rounded-full text-xs px-2 py-0.5"
                          >
                            {/* Options for quantities 1 through 10 */}
                            {[...Array(10).keys()].map((index) => (
                              <option key={index} value={index + 1}>
                                {index + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* Remove Item */}
                      <button
                        onClick={() => {
                          removeFromCart(item);
                        }}
                        className="ml-4 text-red-500 hover:text-red-700"
                        aria-label="Remove Item"
                      >
                        &times; {/* Remove icon */}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cart Total */}
            <div className="flex justify-between items-center mt-6 px-4 py-2 border-t">
              <span className="font-semibold text-xl">Total:</span>
              <span className="font-bold text-xl text-red-600">
                ${cart.totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Close Button */}
            <div className="flex justify-center mt-4 px-4">
              <Link
                to="/checkout"
                onClick={toggleCart}
                className="px-6 py-3 bg-red-600 text-white rounded-full w-full sm:w-auto"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
