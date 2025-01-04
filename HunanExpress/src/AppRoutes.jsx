import { Route, Routes } from "react-router-dom";
import FoodPage from "./pages/Food/FoodPage";
import CartPage from "./pages/Cart/CartPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import CheckoutSuccessPage from "./pages/Checkout/CheckoutSuccessPage";
import RestaurantPage from "./pages/RestaurantPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RestaurantPage></RestaurantPage>}></Route>
      <Route path="/food/:id" element={<FoodPage></FoodPage>}></Route>
      <Route path="/cart" element={<CartPage></CartPage>}></Route>

      <Route path="/checkout" element={<CheckoutPage></CheckoutPage>}></Route>
      <Route
        path="/checkout/success"
        element={<CheckoutSuccessPage></CheckoutSuccessPage>}
      ></Route>
    </Routes>
  );
}
//        <Route path='/register'
//element={<RegisterPage></RegisterPage>}>
//</Route>
//        <Route path='/login'
//element={<LoginPage></LoginPage>}>
//</Route>
