/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/item/Item";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortby, setSortby] = useState("All");
  const [showing, setShowing] = useState(0);
  const [explore, setExplore] = useState(8);
  const [totalProduct, setTotalProduct] = useState(all_product.length);

  useEffect(() => {
    const total = all_product.filter(
      (item) => props.category === item.category
    );
    const arry = total.slice(0, explore);
    setShowing(arry.length);
    setTotalProduct(total.length); // Cập nhật totalProduct
  }, [props, explore]);

  return (
    <div className="max-w-7xl mx-auto px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] my-8 rounded-xl shadow-sm overflow-hidden">
        <img
          src={props.banner}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 uppercase font-serif">
          {props.category} Collection
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm md:text-base">
          Discover our curated selection of{" "}
          <span className="font-medium">{props.category}</span> products.
          Crafted with style and comfort in mind, perfect for your daily wear.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
          <span className="font-medium">Showing 1-{showing}</span> out of{" "}
          {totalProduct} products
        </p>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex justify-center items-center gap-x-1.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
              Sort by
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-400 dark:text-gray-500"
              />
            </MenuButton>
          </div>
          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <MenuItem>
                <button
                  onClick={() => setSortby("All")}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  All
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => setSortby("Low")}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Price: Low → High
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => setSortby("High")}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Price: High → Low
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
      <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {all_product
            .sort((a, b) =>
              sortby === "High"
                ? b.new_price - a.new_price
                : sortby === "Low"
                ? a.new_price - b.new_price
                : a.id - b.id
            )
            .filter((item) => props.category === item.category)
            .map((item, i) =>
              i < showing ? (
                <motion.div
                  key={item.id}
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  layout
                >
                  <Item product={item} />
                </motion.div>
              ) : null
            )}
        </AnimatePresence>
      </motion.div>
      {showing < totalProduct && (
        <div
          onClick={() => setExplore(explore + 4)}
          className="cursor-pointer mt-16 mx-auto w-48 h-12 flex items-center justify-center rounded-full bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-100 text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition duration-300 shadow"
        >
          LOAD MORE
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
