<<<<<<< HEAD
=======
/* eslint-disable no-unused-vars */
>>>>>>> 7d547c3fb925bf43a14909c4a62d0a20a8bec4d9
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const checkoutSchema = z.object({
  firstname: z.string().min(1, "First Name is required"),
  lastname: z.string().min(1, "Last Name is required"),
  address: z.string().min(1, "Address is required"),
  region: z.string().min(1, "Region is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().regex(/^\d{5}$/, "Zip Code must be 5 digits"),
  phone: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number"),
});

export default function Checkout() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });
  const { cartTotal, cartItems, combinedData } = useContext(ShopContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const URL = import.meta.env.VITE_APP_API;
  const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = {
      address: [data],
      cart: [...combinedData],
      quantity: totalAmount,
      pricetotal: totalTax,
    };
    try {
      const res = await axios.post(`${URL}/api/payment`, formData);
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: res.data.id });
    } catch (err) {
      console.error(err);
      toast.error("Payment initiation failed. Please try again.", {
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
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
    setTotalAmount(data);
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
                  className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
                    errors.firstname ? "border-red-500 dark:border-red-400" : ""
                  }`}
                />
                {errors.firstname && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("lastname")}
                  className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
                    errors.lastname ? "border-red-500 dark:border-red-400" : ""
                  }`}
                />
                {errors.lastname && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <input
                type="text"
                {...register("address")}
                className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
                  errors.address ? "border-red-500 dark:border-red-400" : ""
                }`}
              />
              {errors.address && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Region
                </label>
                <select
                  {...register("region")}
                  className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
                    errors.region ? "border-red-500 dark:border-red-400" : ""
                  }`}
                >
                  <option value="">Select Region</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="NorthAmerica">North America</option>
                  <option value="SouthAmerica">South America</option>
                  <option value="Africa">Africa</option>
                  <option value="Oceania">Oceania</option>
                </select>
                {errors.region && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.region.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Country
                </label>
                <select
                  {...register("country")}
                  className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
                    errors.country ? "border-red-500 dark:border-red-400" : ""
                  }`}
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
                {errors.country && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  City
                </label>
                <select
                  {...register("city")}
                  className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
                    errors.city ? "border-red-500 dark:border-red-400" : ""
                  }`}
                >
                  <option value="">Select City</option>
                  <option value="Hanoi">Hà Nội</option>
                  <option value="HoChiMinh">TP. Hồ Chí Minh</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Tokyo">Tokyo</option>
                  <option value="Paris">Paris</option>
                  <option value="NewYork">New York</option>
                </select>
                {errors.city && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  {...register("zip")}
                  className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
                    errors.zip ? "border-red-500 dark:border-red-400" : ""
                  }`}
                />
                {errors.zip && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.zip.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                {...register("phone")}
                className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
                  errors.phone ? "border-red-500 dark:border-red-400" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 bg-indigo-600 dark:bg-indigo-700 text-white dark:text-gray-100 rounded-lg font-semibold text-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition duration-200 shadow-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Processing..." : "Proceed to Payment"}
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
