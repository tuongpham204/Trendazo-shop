<<<<<<< HEAD
=======
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
>>>>>>> 7d547c3fb925bf43a14909c4a62d0a20a8bec4d9
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { timehelper } from "../../helpers/timehelper";
import { goldhelper } from "../../helpers/goldhelper";
import { loadStripe } from "@stripe/stripe-js";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Payment({ status, paymentData }) {
  const [productsData, setProductsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { dark } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`);

  const getDataOrderID = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/payment/${id}`
      );
      setProductsData(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch order details.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      navigate("/cart");
    } finally {
      setIsLoading(false);
    }
  };

  const removeOrder = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: dark ? "#1f2937" : "#fff",
      customClass: {
        title: dark ? "text-gray-100" : "text-gray-800",
        content: dark ? "text-gray-300" : "text-gray-600",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${import.meta.env.VITE_APP_API}/api/payment/${id}`
          );
          Swal.fire({
            title: "Deleted!",
            text: "Your order has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            background: dark ? "#1f2937" : "#fff",
            customClass: {
              title: dark ? "text-gray-100" : "text-gray-800",
              content: dark ? "text-gray-300" : "text-gray-600",
            },
          });
          navigate("/cart");
        } catch (err) {
          console.error(err);
          Swal.fire({
            title: "Delete Failed!",
            text: "Please try again later!",
            icon: "error",
            confirmButtonColor: "#3085d6",
            background: dark ? "#1f2937" : "#fff",
            customClass: {
              title: dark ? "text-gray-100" : "text-gray-800",
              content: dark ? "text-gray-300" : "text-gray-600",
            },
          });
          navigate("/cart");
        }
      }
    });
  };
  const createSession = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/payment`,
        {
          address: productsData.address,
          cart: paymentData.products,
          quantity: paymentData.quantity,
          pricetotal: paymentData.amount_total,
        }
      );
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: res.data.id });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to initiate payment. Please try again.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        background: dark ? "#1f2937" : "#fff",
        customClass: {
          title: dark ? "text-gray-100" : "text-gray-800",
          content: dark ? "text-gray-300" : "text-gray-600",
        },
      });
    }
  };
  useEffect(() => {
    if (id) getDataOrderID();
    else navigate("/cart");
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center p-4">
        <p className="text-gray-800 dark:text-gray-100">Loading...</p>
      </div>
    );
  }

  if (
    !paymentData ||
    !paymentData.amount_total ||
    !paymentData.date ||
    !paymentData.order_id
  ) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center p-4">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Invalid Order
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          No payment data available.
        </p>
        <Link
          to="/cart"
          className="mt-6 inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Back to Cart
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <a href="#">
          <MountainIcon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
          <span className="sr-only">Acme Inc</span>
        </a>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow text-center p-4 md:p-6">
        {status ? (
          <CircleCheckIcon className="h-16 w-16 text-green-500 dark:text-green-400" />
        ) : (
          <CircleFailedIcon className="h-16 w-16 text-red-500 dark:text-red-400" />
        )}
        <h1 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {status ? "Payment Successful" : "Payment Failed"}
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {status ? "Thank you for your purchase!" : "Please try again later!"}
        </p>
        <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded-lg p-4 w-full max-w-md bg-white dark:bg-gray-900">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Amount Paid:</span>
            <span className="font-medium text-gray-800 dark:text-gray-100">
              ฿ {goldhelper(paymentData.amount_total)}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-2 text-gray-600 dark:text-gray-400">
            <span>Date & Time:</span>
            <span className="font-medium text-gray-800 dark:text-gray-100">
              {timehelper(paymentData.date)}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-2 text-gray-600 dark:text-gray-400">
            <span>Reference Number:</span>
            <span className="font-medium text-gray-800 dark:text-gray-100">
              {paymentData.order_id}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-6">
          <button
            onClick={() => (status ? navigate("/cart") : createSession())}
            className={`inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 transition-colors ${
              status
                ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                : "bg-red-500 hover:bg-red-600 focus:ring-red-400 dark:focus:ring-red-300"
            }`}
          >
            {status ? "Return to Homepage" : "Try Again"}
          </button>
          {status ? null : (
            <button
              onClick={removeOrder}
              className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-400 dark:focus:ring-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </main>
      <footer className="flex items-center justify-center h-14 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; 2024. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CircleFailedIcon(props) {
  return (
    <svg {...props} width={70} height={70} xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="35"
        cy="35"
        r="27"
        stroke="currentColor"
        strokeWidth="6"
        fill="none"
      />
      <line
        x1="28"
        y1="28"
        x2="42"
        y2="42"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="42"
        y1="28"
        x2="28"
        y2="42"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
