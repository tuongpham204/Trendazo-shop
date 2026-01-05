import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faTruck,
  faBox,
  faTags,
  faInfoCircle,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const ProductDisplay = ({ product }) => {
  const [sizeProduct, setSizeProduct] = useState("S");
  const { addToCart } = useContext(ShopContext);

  const size_toggle = (e) => setSizeProduct(e.target.value);

  useEffect(() => {
    if (product.category === "other") {
      setSizeProduct("none");
    }
  }, [product]);

  return (
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 font-sans my-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md object-cover rounded-xl shadow"
          />
        </div>

        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <img
              key={i}
              src={product.image}
              alt="thumbnail"
              className="w-24 h-24 object-cover rounded-md border border-gray-200 dark:border-gray-700 cursor-pointer hover:ring-2 hover:ring-emerald-500 transition"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">
          Men Fashion
        </p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {product.name}
        </h1>
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-emerald-600 dark:text-emerald-400 text-2xl font-semibold">
            ${product.new_price.toFixed(2)}
          </span>
          <span className="text-gray-400 dark:text-gray-500 line-through text-lg">
            ${product.old_price.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center mb-6 text-sm text-gray-600 dark:text-gray-300">
          {[...Array(4)].map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={solidStar}
              className="text-yellow-400 dark:text-yellow-300"
            />
          ))}
          <FontAwesomeIcon
            icon={regularStar}
            className="text-yellow-400 dark:text-yellow-300"
          />
        </div>

        {product.category !== "other" && (
          <div className="mb-6">
            <h2 className="text-gray-800 dark:text-gray-100 text-base font-medium mb-3">
              Select Size
            </h2>
            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <label
                  key={size}
                  htmlFor={`${size}-radio`}
                  className={`cursor-pointer px-5 py-2 rounded-lg border text-sm font-medium transition 
                  ${
                    sizeProduct === size
                      ? "bg-black dark:bg-gray-700 text-white dark:text-gray-100 border-black dark:border-gray-600"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="size-radio"
                    id={`${size}-radio`}
                    value={size}
                    checked={size === sizeProduct}
                    onChange={size_toggle}
                    className="hidden"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => addToCart(product.id, sizeProduct)}
          className="w-full sm:w-80 py-3 rounded-lg bg-black dark:bg-gray-700 text-white dark:text-gray-100 font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-600 transition mb-6"
        >
          Add to Cart
        </button>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
          <h3 className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100 mb-2">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="text-emerald-600 dark:text-emerald-400"
            />
            Description & Fit
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            A premium {product.name} made from high-quality cotton blend.
            Designed for comfort and modern fashion. Ideal for both casual and
            daily wear, easy to pair with any style.
          </p>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 grid grid-cols-2 gap-6 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <FontAwesomeIcon
                icon={faTruck}
                className="text-emerald-600 dark:text-emerald-400"
              />
              Delivery
            </p>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              10–12 October 2024
            </p>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <FontAwesomeIcon
                icon={faBox}
                className="text-emerald-600 dark:text-emerald-400"
              />
              Shipping
            </p>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              3–6 Working Days
            </p>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <FontAwesomeIcon
                icon={faFolderOpen}
                className="text-emerald-600 dark:text-emerald-400"
              />
              Category
            </p>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <FontAwesomeIcon
                icon={faTags}
                className="text-emerald-600 dark:text-emerald-400"
              />
              Tags
            </p>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Modern, Casual, Trending
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
