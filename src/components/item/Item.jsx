/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Item = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="block group p-2 rounded-lg hover:shadow-md transition"
    >
      <div className="relative overflow-hidden rounded-md mb-3 bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[220px] md:h-[250px] object-cover object-top transform group-hover:scale-105 transition duration-500"
        />
      </div>

      <h3 className="text-gray-800 font-medium text-sm md:text-base mb-1 line-clamp-1">
        {product.name}
      </h3>

      <div className="text-yellow-400 text-xs md:text-sm mb-1">
        {product.rating
          ? "★".repeat(product.rating) + "☆".repeat(5 - product.rating)
          : "☆☆☆☆☆"}
      </div>

      <div className="flex items-center gap-2">
        <p className="text-base md:text-lg font-semibold text-gray-900">
          ${Number(product.new_price).toFixed(2)}
        </p>
        {product.old_price && (
          <p className="text-xs md:text-sm line-through text-gray-400">
            ${Number(product.old_price).toFixed(2)}
          </p>
        )}
      </div>
    </Link>
  );
};

export default Item;
