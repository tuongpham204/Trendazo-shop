import { useEffect } from "react";
import SearchBar from "../searchbar/SearchBar";
/* eslint-disable react/prop-types */
const Filter = ({ popular, setFiltered, activeGenre, setActiveGenre }) => {
  const categories = [
    { id: "all", label: "All" },
    { id: "best", label: "Best Sellers" },
    { id: "new", label: "New Arrivals" },
    { id: "hot", label: "Hot Sales" },
  ];

  useEffect(() => {
    if (activeGenre === "all") {
      setFiltered(popular);
    } else {
      const filtered = popular.filter((item) => item.tag.includes(activeGenre));
      setFiltered(filtered);
    }
  }, [activeGenre, popular, setFiltered]);

  return (
    <div className="flex flex-col items-center gap-4 my-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-300 tracking-wide">
        Popular Products
      </h2>
      <p className="text-gray-500 dark:text-gray-300 text-sm md:text-base">
        Discover our trending collections
      </p>

      <div className="flex justify-center gap-3 flex-wrap mt-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveGenre(cat.id)}
            className={`px-5 py-2 text-sm md:text-base rounded-full border transition-all
        ${
          activeGenre === cat.id
            ? "bg-black dark:bg-gray-700 text-white dark:text-gray-100 border-black dark:border-gray-600 shadow-sm"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-gray-500 hover:text-black dark:hover:text-gray-200"
        }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <SearchBar popular={popular} setFiltered={setFiltered} />
    </div>
  );
};

export default Filter;
