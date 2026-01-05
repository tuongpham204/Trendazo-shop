import { Link } from "react-router-dom";

const Item = ({ product }) => {
  if (!product?.id) {
    console.error("Invalid product ID:", product);
    return (
      <div className="text-red-500 dark:text-red-400 p-2">Invalid product</div>
    );
  }
  return (
    <Link
      to={`/product/${product.id}`}
      className="block group p-2 rounded-lg hover:shadow-md transition bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
    >
      <div className="relative overflow-hidden rounded-md mb-3 bg-gray-50 dark:bg-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[220px] md:h-[250px] object-cover object-top transform group-hover:scale-105 transition duration-500"
        />
      </div>

      <h3 className="text-gray-500 dark:text-gray-300 font-medium text-lg md:text-base mb-1 line-clamp-1">
        {product.name}
      </h3>

      <div className="text-yellow-400 dark:text-yellow-300 text-xs md:text-sm mb-1">
        {product.rating
          ? "★".repeat(product.rating) + "☆".repeat(5 - product.rating)
          : "☆☆☆☆☆"}
      </div>

      <div className="flex items-center gap-2">
        <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
          ${Number(product.new_price).toFixed(2)}
        </p>
        {product.old_price && (
          <p className="text-xs md:text-sm line-through text-gray-400 dark:text-gray-500">
            ${Number(product.old_price).toFixed(2)}
          </p>
        )}
      </div>
    </Link>
  );
};

export default Item;
