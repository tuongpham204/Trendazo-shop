import Slider from "react-slick";
import hero_women from "../assets/slide-women.jpg";
import hero_men from "../assets/slide-men.jpg";

const Hero = () => {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 6500,
    cssEase: "linear",
  };

  return (
    <Slider {...settings} className="hero min-h-[38rem]">
      <div className="h-screen relative">
        <img
          className="w-full h-full object-cover absolute inset-0 z-[-1]"
          src={hero_men}
          alt="Men Collection"
        />
        <div className="hero-left flex flex-col justify-center gap-5 px-5 lg:px-[50px] xl:px-[100px] 2xl:px-[140px] relative top-[30vh] container mx-auto">
          <h2 className="fade-text text-red-600 text-[13px] md:text-[15px] font-bold uppercase tracking-[2px] delay-[200ms]">
            NEW ARRIVALS ONLY
          </h2>
          <div className="lg:leading-[88px] md:leading-[80px] leading-[60px]">
            <p className="fade-text text-[#171717] text-[36px] md:text-[60px] font-semibold delay-[400ms]">
              New Season
            </p>
            <p className="fade-text text-[#171717] text-[36px] md:text-[60px] font-semibold delay-[600ms]">
              Men Collections
            </p>
          </div>
          <p className="fade-text text-gray-700 text-base md:text-lg max-w-md delay-[800ms]">
            Discover the latest men’s fashion and elevate your wardrobe with
            Trendify’s exclusive collection.
          </p>
          <button
            aria-label="Shop new men collection"
            className="fade-text flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-red-600 transition duration-300 w-fit delay-[1000ms]"
          >
            Shop Now
          </button>
        </div>
      </div>
      <div className="h-screen relative">
        <img
          className="w-full h-full object-cover absolute inset-0 z-[-1]"
          src={hero_women}
          alt="Women Collection"
        />
        <div className="hero-left flex flex-col justify-center gap-5 px-5 lg:px-[50px] xl:px-[100px] 2xl:px-[140px] relative top-[30vh] container mx-auto">
          <h2 className="fade-text text-red-600 text-[13px] md:text-[15px] font-bold uppercase tracking-[2px] delay-[200ms]">
            NEW ARRIVALS ONLY
          </h2>
          <div className="lg:leading-[88px] md:leading-[80px] leading-[60px]">
            <p className="fade-text text-[#171717] text-[36px] md:text-[60px] font-semibold delay-[400ms]">
              New Season
            </p>
            <p className="fade-text text-[#171717] text-[36px] md:text-[60px] font-semibold delay-[600ms]">
              Women Collections
            </p>
          </div>
          <p className="fade-text text-gray-700 text-base md:text-lg max-w-md delay-[800ms]">
            Refresh your style with our latest women’s collection, designed for
            comfort and elegance.
          </p>
          <button
            aria-label="Shop new women collection"
            className="fade-text flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-red-600 transition duration-300 w-fit delay-[1000ms]"
          >
            Shop Now
          </button>
        </div>
      </div>
    </Slider>
  );
};

export default Hero;
