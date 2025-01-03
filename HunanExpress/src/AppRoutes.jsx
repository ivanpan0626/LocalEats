import { Route, Routes } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import FoodPage from "./pages/Food/FoodPage";
import CartPage from "./pages/Cart/CartPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import CheckoutSuccessPage from "./pages/Checkout/CheckoutSuccessPage";
import DemoPage from "./pages/DemoPage";

export default function AppRoutes({ searchTerm, tag }) {
  return (
    <Routes>
      <Route path="/demo" element={<DemoPage></DemoPage>}></Route>
      <Route
        path="/"
        element={<MenuPage searchTerm={searchTerm} tag={tag} />}
      ></Route>
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
