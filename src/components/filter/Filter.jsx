import { useEffect } from "react";

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
    <div className="flex flex-col items-center gap-4 my-10  ">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wide">
        Popular Products
      </h2>
      <p className="text-gray-500 text-sm md:text-base">
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
            ? "bg-black text-white border-black shadow-sm"
            : "bg-white text-gray-700 border-gray-300 hover:border-black hover:text-black"
        }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
