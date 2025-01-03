import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../../hooks/useCart.jsx";
import axios from "axios";
import styles from "./checkoutSuccess.module.css";
import { useLoading } from "../../hooks/useLoading.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutSuccess = () => {
  const { showLoading, hideLoading } = useLoading();
  const { clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [data, setData] = useState();
  const [errorTitle, setErrorTitle] = useState("Fetching details from Stripe");
  const [errorMsg, setErrorMsg] = useState("Loading... Please Wait.");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessionDetails = async () => {
      showLoading();
      if (!sessionId) return;

      let isSuccess = false; // Local variable to track success

      try {
        const response = await axios.get(
          `/api/stripe/checkout-session/${sessionId}`
        );

        if (response.status === 200) {
          clearCart();
          setData(response.data);
          isSuccess = true; // If data fetch is successful
        }
      } catch {
        setErrorTitle("Error Fetching Details");
        setErrorMsg("Invalid Session");
      } finally {
        hideLoading(); // Hide loading spinner

        // Use setTimeout for delayed navigation
        setTimeout(() => {
          navigate("/");
          if (isSuccess) {
            toast.success(
              "Order success! Receipt has been sent to your email!"
            );
          } else {
            toast.error("Please Try Again! Order failed.");
          }
        }, 3000);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  return (
    <div className={styles.container}>
      {data ? (
        <div className={styles.success}>
          <h1 className={styles.title}>{data.title}</h1>
          <h2 className={styles.body}>{data.body}</h2>
          <h3 className={styles.footer}>{data.footer}</h3>
        </div>
      ) : (
        <div className={styles.error}>
          <h1>{errorMsg}</h1>
          <h2>{errorTitle}</h2>
          <h3>You have not been charged.</h3>
        </div>
      )}
    </div>
  );
};

export default CheckoutSuccess;
