import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccess/CheckoutSuccessPage";
import RestaurantPage from "./pages/RestaurantPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RestaurantPage></RestaurantPage>}></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/checkout" element={<CheckoutPage></CheckoutPage>}></Route>
      <Route
        path="/checkout/success"
        element={<CheckoutSuccessPage></CheckoutSuccessPage>}
      ></Route>
    </Routes>
  );
}
