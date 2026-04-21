import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { Info } from "lucide-react";

import Title from "../components/ui/title.jsx";
import Input from "../components/ui/input.jsx";
import {Button} from "../components/ui/button.jsx";
import { useCart } from "../hooks/useCart";
import Price from "../components/Price/Price";
import NotFound from "../components/NotFound/NotFound";

const stripePromise = loadStripe(
  "pk_test_51QOU6CGMMMgbOUn4SuChOCJL0QjrikLwUBN7nZJxtOEMLdYFIFSNUt1Q6kjM9Tg1I9CsegyRWKJRJtmk5bWsGN1100XZ3NOi6D"
);

export default function CheckoutPage() {
  const { cart } = useCart();
  const [orderType, setOrderType] = useState("pickup");
  const [pickupTime, setPickupTime] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Helper functions
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  const getTimeOptions = () => {
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 30); // Start 30 minutes from now
    const timeOptions = ["ASAP"];

    // Generate time options for the next 2 hours (15-minute increments)
    for (let i = 0; i < 8; i++) {
      timeOptions.push(formatTime(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + 15);
    }

    return timeOptions;
  };

  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
  };

  const checkIfPast9PMEST = () => {
    const now = new Date();
    const estOffset = now.getTimezoneOffset() + 420; // 5 hours
    const estTime = new Date(now.getTime() - estOffset * 60000);

    const nineThirtyPMEST = new Date(estTime);
    nineThirtyPMEST.setHours(9, 0, 0, 0); // 9:30 PM EST

    return estTime > nineThirtyPMEST;
  };

  const onSubmit = async (data) => {
    if (checkIfPast9PMEST()) {
      alert("Online orders stop at 9:00 PM");
      return;
    } else if (cart.totalPrice < 10 && orderType === "delivery") {
      alert("Delivery orders must exceed subtotal $10");
      return;
    }

    const items = cart.items.map((item) => ({
      name: item.food.name,
      description: item.food.instructions || "empty",
      price: item.food.price,
      quantity: item.quantity,
    }));

    const orderData = {
      ...data,
      orderType,
      pickupTime: orderType === "pickup" ? pickupTime : null,
      deliveryTime: orderType === "delivery" ? deliveryTime : null,
    };

    try {
      const response = await axios.post("/api/stripe/create-checkout-session", {
        items,
        customData: orderData,
      });

      if (response.data?.sessionId) {
        const { sessionId } = response.data;
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          console.error(error);
          alert("An error occurred during payment!");
        }
      } else {
        alert("Unable to process payment session");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to get response from server");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex justify-center max-w-7xl mx-auto flex-wrap mb-24"
    >
      {/* Cart Section */}
      <div className="w-full sm:w-96 mr-8">
        <Title title="Cart" fontSize="1.6rem" />
        {cart.items.length === 0 ? (
          <NotFound
            message="Your cart is empty"
            linkedText="Add items to cart!"
          />
        ) : (
          <div className="flex flex-col border border-red-300 rounded-lg p-4 h-96 custom-scroll overflow-y-auto flex-grow">
            <ul className="space-y-4">
              {cart.items.map((item) => (
                <li
                  key={item.food.id}
                  className="flex justify-between items-center py-4 border-b border-gray-200"
                >
                  <img
                    src={item.food.imageUrl}
                    alt={item.food.name}
                    className="w-20 h-20 rounded-full object-contain"
                  />
                  <div className="flex flex-col w-full">
                    <div className="text-left px-2 text-ellipsis overflow-hidden">
                      {item.food.name}
                    </div>
                    <div className="px-2">Quantity: {item.quantity}</div>
                    <Price price={item.price} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-4 flex justify-between font-bold text-lg">
          <div>Total Items: {cart.totalCount}</div>
          <div>
            Subtotal: <Price price={cart.totalPrice} />
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full sm:w-96">
        <Title title="Order Details" fontSize="1.6rem" />
        <div className="space-y-4">
          {/* Order Type Selection */}
          <div>
            <label className="block font-semibold">Select Order Type</label>
            <select
              onChange={handleOrderTypeChange}
              value={orderType}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="pickup">Pickup</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>

          {/* Conditionally Render Inputs Based on Order Type */}
          {orderType === "pickup" ? (
            <>
              <Input
                label="Name"
                {...register("name", { required: "Name is required" })}
                error={errors.name}
              />
              <Input
                label="Phone Number"
                {...register("phone", { required: "Phone number is required" })}
                error={errors.phone}
              />
            </>
          ) : (
<>
  <div className="flex flex-wrap">
    {/* Name and Phone Number */}
    <div className="flex flex-col w-full w-1/2">
      <Input
        label="Name"
        {...register("name", { required: "Name is required" })}
        error={errors.name}
      />
    </div>
    <div className="flex flex-col w-full w-1/2">
      <Input
        label="Phone Number"
        {...register("phone", { required: "Phone number is required" })}
        error={errors.phone}
      />
    </div>
  </div>

  <div className="flex flex-wrap">
    {/* Address and APT# */}
    <div className="flex flex-col w-full w-4/5">
      <Input
        label="Address"
        {...register("address", { required: "Address is required" })}
        error={errors.address}
      />
    </div>
    <div className="flex flex-col w-full w-1/5">
      <Input label="APT#" {...register("apt")} error={errors.apt} />
    </div>
  </div>

  <div className="flex flex-wrap">
    {/* City and Zip Code */}
    <div className="flex flex-col w-full w-3/5">
      <Input
        label="City"
        {...register("city", { required: "City is required" })}
        error={errors.city}
      />
    </div>
    <div className="flex flex-col w-full w-2/5">
      <Input
        label="Zip Code"
        {...register("zipcode", { required: "Zip Code is required" })}
        error={errors.zipcode}
      />
    </div>
  </div>
</>

          )}
          <div>
            <label className="block font-semibold">{orderType=="pickup"? `Pickup Time` : `Delivery Time`}</label>
            <select
              {...register("Time", {
                required: "Time is required",
              })}
              onChange={(e) => setPickupTime(e.target.value)}
              value={pickupTime}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {getTimeOptions().map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Fees and Taxes */}
          <div className="flex justify-between items-center my-4">
            <div className="flex items-center">
              Fees & Taxes:
              <div className="relative group">
                <Info
                  size={18}
                  className="inline-block ml-2 cursor-pointer text-gray-500"
                />
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p>
                    Tax: <Price price={cart.totalPrice * 0.06625} />
                  </p>
                  <p>Fees: $0.99</p>
                </div>
              </div>
            </div>
            <Price price={cart.totalPrice * 0.06625 + 0.99} />
          </div>

          {/* Total Price */}
          <div className="flex justify-between items-center my-4">
            Total:{" "}
            <Price price={cart.totalPrice + cart.totalPrice * 0.06625 + 0.99} />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-8 py-3 rounded-md bg-red-600 text-white"
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </form>
  );
}
