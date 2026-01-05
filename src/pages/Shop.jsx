import Hero from "../components/hero/Hero";
import FilterProducts from "../components/filter/FitterProducts";
import Banner from "../components/banner/Banner";

const Shop = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <Hero />
      <Banner />
      <FilterProducts />
    </div>
  );
};

export default Shop;
