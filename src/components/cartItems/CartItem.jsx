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
    <div className="container mx-auto my-24 px-4 font-sans">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 overflow-x-auto max-h-[33rem]">
          <div className="grid grid-cols-7 gap-4 py-5 text-gray-800 text-sm font-semibold border-b border-gray-200 text-center">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Size</p>
            <p>Total</p>
            <p>Action</p>
          </div>

          {all_product.map((e) => {
            if (cartItems[e.id].total > 0) {
              return (
                <div key={e.id}>
                  <div className="grid grid-cols-7 gap-4 items-center  py-5 text-gray-700 text-sm text-center">
                    <div className="flex items-center justify-center">
                      <img
                        className="rounded object-cover object-top w-16 h-16 shadow-sm "
                        src={e.image}
                        alt={e.name}
                      />
                    </div>

                    <p className="font-medium truncate">{e.name}</p>

                    <p className="text-green-600 font-semibold">
                      ${e.new_price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-1 justify-center">
                      <button
                        className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md text-lg font-bold hover:bg-gray-100"
                        onClick={() => addToCart(e.id, cartItems[e.id].size)}
                      >
                        +
                      </button>
                      <div className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md bg-gray-50 font-medium">
                        {cartItems[e.id].total}
                      </div>
                      <button
                        className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md text-lg font-bold hover:bg-gray-100"
                        onClick={() => removeFromCart(e.id)}
                      >
                        -
                      </button>
                    </div>

                    <select
                      className={`rounded border border-gray-300 bg-white py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
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

                    <p className="font-semibold text-green-600">
                      ${(e.new_price * cartItems[e.id].total).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeFromCart(e.id, true)}
                      className="text-red-500 hover:text-red-700 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <hr className="h-[1px] bg-gray-200 border-0" />
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="w-full lg:w-1/3 h-fit p-6 border border-gray-200 rounded-lg shadow-md bg-white">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">
            Order Summary
          </h1>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="font-medium">${cartTotal}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p className="text-emerald-600 font-medium">Free</p>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-semibold">
              <h3>Total</h3>
              <h3 className="text-green-700">${cartTotal}</h3>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-500 text-sm mb-2">
              Have a promo code? Enter it here:
            </p>
            <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
              <input
                className="flex-1 px-4 py-3 bg-transparent outline-none text-sm"
                type="text"
                placeholder="Promo code"
              />
              <button className="px-6 h-12 bg-gray-800 text-white text-sm hover:bg-gray-900 transition-all">
                Apply
              </button>
            </div>
          </div>
          <Link to="/checkout">
            <button
              onClick={() => window.scrollTo(0, 0)}
              className="w-full h-12 rounded-lg bg-emerald-600 text-white text-base font-semibold hover:bg-emerald-700 transition-all mt-6 shadow"
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
