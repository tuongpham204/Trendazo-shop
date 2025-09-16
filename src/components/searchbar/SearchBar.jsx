import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import PropTypes from "prop-types";

export default function SearchBar({ popular, setFiltered }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setQuery(q);

    if (q === "") {
      setFiltered(popular);
    } else {
      setFiltered(
        popular.filter((item) => item.name.toLowerCase().includes(q))
      );
    }
  };

  return (
    <div className="flex items-center border border-gray-500 rounded-full px-3 py-2 w-full max-w-xl bg-white shadow-sm">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search products..."
        className="flex-grow outline-none px-2 text-gray-700"
      />
      <FiSearch className="text-gray-500" size={20} />
    </div>
  );
}

SearchBar.propTypes = {
  popular: PropTypes.array.isRequired,
  setFiltered: PropTypes.func.isRequired,
};
