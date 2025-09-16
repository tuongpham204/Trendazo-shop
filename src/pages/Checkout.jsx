/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export default function Checkout() {
  const { register, handleSubmit, reset } = useForm();
  const { cartTotal, cartItems, combinedData } = useContext(ShopContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const URL = import.meta.env.VITE_APP_API;
  const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`);

  const onSubmit = async (data) => {
    const formData = {
      address: [data],
      cart: [...combinedData],
      quantity: totalAmount,
      pricetotal: totalTax,
    };

    await axios
      .post(`${URL}/api/payment`, formData)
      .then(async (res) => {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({
          sessionId: res.data.id,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleCalculate = () => {
    const vatRate = 0.07;
    const totalPrice = (
      Number(cartTotal) +
      Number(cartTotal) * vatRate
    ).toFixed(2);
    setTotalTax(totalPrice);
  };

  const totalAmounts = () => {
    let data = 0;
    for (const key in cartItems) {
      if (cartItems[key].total > 0) {
        data += cartItems[key].total;
      }
    }
    return setTotalAmount(data);
  };

  useEffect(() => {
    totalAmounts();
    handleCalculate();
  }, [cartItems, cartTotal]);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen py-10 px-4 md:px-8 font-sans transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-wide">
              Checkout
            </h1>
            <Link
              to={"/cart"}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              ← Back to cart
            </Link>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  {...register("firstname")}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                             focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("lastname")}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                             focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <input
                type="text"
                {...register("address")}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                           focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Region
                </label>
                <select
                  {...register("region")}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                             focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                >
                  <option value="">Select Region</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="NorthAmerica">North America</option>
                  <option value="SouthAmerica">South America</option>
                  <option value="Africa">Africa</option>
                  <option value="Oceania">Oceania</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Country
                </label>
                <select
                  {...register("country")}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                             focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                >
                  <option value="">Select Country</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="USA">USA</option>
                  <option value="UK">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Thailand">Thailand</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  City
                </label>
                <select
                  {...register("city")}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                             focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                >
                  <option value="">Select City</option>
                  <option value="Hanoi">Hà Nội</option>
                  <option value="HoChiMinh">TP. Hồ Chí Minh</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Tokyo">Tokyo</option>
                  <option value="Paris">Paris</option>
                  <option value="NewYork">New York</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  {...register("zip")}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                             focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                {...register("phone")}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                           focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 dark:bg-indigo-700 text-white dark:text-gray-100 rounded-lg font-semibold text-lg 
                         hover:bg-indigo-700 dark:hover:bg-indigo-600 transition duration-200 shadow-md"
            >
              Proceed to Payment
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Order Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Total Items</span>
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                {totalAmount}
              </span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Total Charges</span>
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                ${cartTotal}
              </span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Tax (7%)</span>
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                ${(cartTotal * 0.07).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-gray-800 dark:text-gray-100 text-lg font-semibold border-t pt-4 border-gray-200 dark:border-gray-700">
              <span>Grand Total</span>
              <span className="text-gray-800 dark:text-gray-100">
                ${totalTax}
              </span>
            </div>
          </div>
          <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300 border border-indigo-200 dark:border-indigo-700">
            <p>
              ✅ Secure payment powered by{" "}
              <span className="font-semibold">Stripe</span>
            </p>
            <p className="mt-1">We don’t store your card details.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
