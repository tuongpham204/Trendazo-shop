import banner_1 from "../assets/banner_1.png";
import banner_2 from "../assets/banner_2.png";

const Banner = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative group overflow-hidden rounded-lg lg:col-span-2">
            <img
              src={banner_1}
              alt="Clothing Collections"
              className="w-full h-[280px] md:h-[350px] lg:h-[380px] object-cover transform group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-4 md:p-8 bg-gradient-to-r from-black/40 to-transparent">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 max-w-sm leading-snug">
                Clothing Collections
              </h2>
              <a
                href="#"
                className="inline-block bg-white text-gray-900 px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wide hover:bg-gray-200 transition"
              >
                Shop Now
              </a>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <img
              src={banner_2}
              alt="Accessories"
              className="w-full h-[180px] md:h-[220px] object-cover transform group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-4 bg-gradient-to-r from-black/40 to-transparent">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                Accessories
              </h2>
              <a
                href="#"
                className="inline-block bg-white text-gray-900 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide hover:bg-gray-200 transition"
              >
                Shop Now
              </a>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="/banner/banner-3.jpg"
              alt="Shoes Spring 2030"
              className="w-full h-[180px] md:h-[220px] object-cover transform group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-4 bg-gradient-to-r from-black/40 to-transparent">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 max-w-[12rem]">
                Shoes Spring
              </h2>
              <a
                href="#"
                className="inline-block bg-white text-gray-900 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide hover:bg-gray-200 transition"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
