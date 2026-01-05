/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Link } from "react-router-dom";

const CartItem = () => {
  const {
    all_product,
    cartTotal,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    addToCart,
    changSize,
  } = useContext(ShopContext);

  useEffect(() => {
    getTotalCartAmount();
  }, [removeFromCart]);

  return (
    <div className="container mx-auto my-8 px-4 sm:px-6 font-sans bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
<<<<<<< HEAD
        <div className="flex-1 overflow-x-auto">
=======
        {/* Bảng sản phẩm */}
        <div className="flex-1 overflow-x-auto">
          {/* Header chỉ hiển thị trên tablet trở lên */}
>>>>>>> 7d547c3fb925bf43a14909c4a62d0a20a8bec4d9
          <div className="hidden sm:grid sm:grid-cols-7 gap-4 py-4 text-gray-800 dark:text-gray-100 text-sm font-semibold border-b border-gray-200 dark:border-gray-700 text-center">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Size</p>
            <p>Total</p>
            <p>Action</p>
          </div>
<<<<<<< HEAD
=======

          {/* Danh sách sản phẩm */}
>>>>>>> 7d547c3fb925bf43a14909c4a62d0a20a8bec4d9
          {all_product.map((e) => {
            if (cartItems[e.id].total > 0) {
              return (
                <div key={e.id}>
                  <div className="flex flex-col sm:grid sm:grid-cols-7 gap-4 items-center py-4 text-gray-700 dark:text-gray-300 text-sm border-b border-gray-200 dark:border-gray-700">
<<<<<<< HEAD
=======
                    {/* Hình ảnh */}
>>>>>>> 7d547c3fb925bf43a14909c4a62d0a20a8bec4d9
                    <div className="flex items-center justify-center sm:justify-center w-full sm:w-auto">
                      <img
                        className="rounded object-cover object-top w-20 h-20 sm:w-16 sm:h-16 shadow-sm"
                        src={e.image}
                        alt={e.name}
                      />
                    </div>
<<<<<<< HEAD
                    <p className="font-medium truncate text-center sm:text-center mt-2 sm:mt-0">
                      {e.name}
                    </p>
                    <p className="text-green-600 dark:text-green-400 font-semibold text-center sm:text-center">
                      ${e.new_price.toFixed(2)}
                    </p>
=======

                    {/* Tên sản phẩm */}
                    <p className="font-medium truncate text-center sm:text-center mt-2 sm:mt-0">
                      {e.name}
                    </p>

                    {/* Giá */}
                    <p className="text-green-600 dark:text-green-400 font-semibold text-center sm:text-center">
                      ${e.new_price.toFixed(2)}
                    </p>

                    {/* Số lượng */}
>>>>>>> 7d547c3fb925bf43a14909c4a62d0a20a8bec4d9
                    <div className="flex items-center gap-2 justify-center mt-2 sm:mt-0">
                      <button
                        className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-md text-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => addToCart(e.id, cartItems[e.id].size)}
                      >
                        +
                      </button>
                      <div className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 font-medium">
                        {cartItems[e.id].total}
                      </div>
                      <button
                        className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-md text-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => removeFromCart(e.id)}
                      >
                        -
                      </button>
                    </div>
<<<<<<< HEAD
=======

                    {/* Kích thước */}
>>>>>>> 7d547c3fb925bf43a14909c4a62d0a20a8bec4d9
                    <select
                      className={`rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 w-20 sm:w-auto mx-auto sm:mx-0 mt-2 sm:mt-0 ${
                        cartItems[e.id].size === "none"
                          ? "pointer-events-none opacity-50"
                          : ""
                      }`}
                      value={cartItems[e.id].size}
                      onChange={(event) => changSize(e.id, event.target.value)}
                    >
                      {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                      {cartItems[e.id].size === "none" && (
                        <option value="none">-</option>
                      )}
                    </select>
<<<<<<< HEAD
                    <p className="font-semibold text-green-600 dark:text-green-400 text-center sm:text-center mt-2 sm:mt-0">
                      ${(e.new_price * cartItems[e.id].total).toFixed(2)}
                    </p>
=======

                    {/* Tổng giá */}
                    <p className="font-semibold text-green-600 dark:text-green-400 text-center sm:text-center mt-2 sm:mt-0">
                      ${(e.new_price * cartItems[e.id].total).toFixed(2)}
                    </p>

                    {/* Xóa */}
>>>>>>> 7d547c3fb925bf43a14909c4a62d0a20a8bec4d9
                    <button
                      onClick={() => removeFromCart(e.id, true)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-sm mt-2 sm:mt-0 mx-auto sm:mx-0"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
<<<<<<< HEAD
=======

        {/* Order Summary */}
>>>>>>> 7d547c3fb925bf43a14909c4a62d0a20a8bec4d9
        <div className="w-full lg:w-1/3 h-fit p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-900">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">
            Order Summary
          </h1>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="font-medium">${cartTotal}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                Free
              </p>
            </div>
            <hr className="bg-gray-200 dark:bg-gray-700" />
            <div className="flex justify-between text-base sm:text-lg font-semibold">
              <h3>Total</h3>
              <h3 className="text-green-700 dark:text-green-400">
                ${cartTotal}
              </h3>
            </div>
          </div>
          <div className="mt-4 sm:mt-6">
            <p className="text-gray-500 dark:text-gray-300 text-sm mb-2">
              Have a promo code? Enter it here:
            </p>
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <input
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100"
                type="text"
                placeholder="Promo code"
              />
              <button className="px-4 sm:px-6 h-10 sm:h-12 bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-100 text-sm hover:bg-gray-900 dark:hover:bg-gray-600 transition-all">
                Apply
              </button>
            </div>
          </div>
          <Link to="/checkout">
            <button
              onClick={() => window.scrollTo(0, 0)}
              className="w-full h-12 rounded-lg bg-emerald-600 dark:bg-emerald-700 text-white dark:text-gray-100 text-sm sm:text-base font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all mt-4 sm:mt-6 shadow"
            >
              PROCEED TO CHECKOUT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
