import React from "react";

const Catalog = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg p-6 space-y-8 max-w-sm mx-auto transition-all duration-300">
      {/* Category Filter */}
      <div>
        <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-3 tracking-wide">
          Categories
        </h2>
        <ul className="space-y-3">
          {["Shirts", "Pants", "Shoes", "Accessories"].map((cat) => (
            <li key={cat}>
              <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-indigo-200 dark:hover:bg-indigo-600 hover:text-indigo-900 dark:hover:text-white transition-all duration-200 ease-in-out transform hover:scale-[1.02]">
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter */}
      <div>
        <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-3 tracking-wide">
          Price
        </h2>
        <ul className="space-y-3">
          {["Under $50", "$50 - $100", "$100 - $200", "Above $200"].map(
            (price) => (
              <li key={price}>
                <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-indigo-200 dark:hover:bg-indigo-600 hover:text-indigo-900 dark:hover:text-white transition-all duration-200 ease-in-out transform hover:scale-[1.02]">
                  {price}
                </button>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Color Filter */}
      <div>
        <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-3 tracking-wide">
          Color
        </h2>
        <div className="flex flex-wrap gap-3">
          {["#ef4444", "#3b82f6", "#10b981", "#1f2937", "#ffffff"].map(
            (color) => (
              <span
                key={color}
                className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-600 cursor-pointer transition-all duration-200 ease-in-out hover:scale-125 hover:shadow-md"
                style={{
                  backgroundColor: color,
                  borderColor: color === "#ffffff" ? "#d1d5db" : "transparent",
                }}
              ></span>
            )
          )}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-3 tracking-wide">
          Size
        </h2>
        <div className="flex flex-wrap gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-indigo-200 dark:hover:bg-indigo-600 hover:text-indigo-900 dark:hover:text-white transition-all duration-200 ease-in-out transform hover:scale-[1.05]"
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
