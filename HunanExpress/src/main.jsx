import React from "react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "./hooks/useCart";
import "./axiosConfig.jsx";
import { AuthProvider } from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingProvider } from "./hooks/useLoading";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <AuthProvider>
          <CartProvider>
            <App />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </CartProvider>
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
