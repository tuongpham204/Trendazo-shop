import data_product from "../assets/data";
import Item from "../item/Item";

const RelatedProducts = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4 mb-28">
      <h1 className="text-xl md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-300">
        YOU MAY ALSO LIKE
      </h1>
      <hr className="w-[500px] h-[2px] rounded-lg bg-gray-800" />

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full">
        {data_product.map((item, i) => (
          <Item key={i} product={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
