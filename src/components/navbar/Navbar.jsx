import { useContext, useState } from "react";
import cart_icon from "../assets/cart_icon.png";
import nav_dropdown from "../assets/nav_dropdown.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { useAuth } from "../../context/AuthProvider";
import jwtDecode from "jwt-decode";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("auth-token");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { getTotalCartItems } = useContext(ShopContext);

  const drop_toggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const btncheckRole = () => {
    if (token) {
      const decoded = jwtDecode(token);
      const userRole = decoded.user?.role;
      if (userRole === "admin") {
        return (
          <div
            onClick={() => {
              navigate("/admin");
              closeMobileMenu();
            }}
            className="cursor-pointer"
          ></div>
        );
      }
      return (
        <div
          onClick={() => {
            localStorage.removeItem("auth-token");
            logout();
            navigate("/");
            closeMobileMenu();
          }}
          className="cursor-pointer"
        ></div>
      );
    }
    return (
      <Link
        onClick={() => {
          setMenu(null);
          closeMobileMenu();
        }}
        to="/login"
      ></Link>
    );
  };

  return (
    <div className="navbar flex flex-col sticky top-0 z-50 bg-white shadow-md">
      <div className="flex justify-between items-center py-3 px-4 md:px-8 lg:px-12">
        <Link
          className="flex items-center"
          onClick={() => {
            setMenu("shop");
            closeMobileMenu();
          }}
          to="/"
        >
          <div className="nav-logo flex items-center gap-1">
            <p className="text-red-600 text-2xl md:text-3xl font-black">
              TRENDOZA
            </p>
            <p className="text-gray-800 text-2xl md:text-3xl font-semibold">
              SHOP
            </p>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-gray-800 text-base font-medium">
          {["shop", "men", "women", "kids", "other"].map((item) => (
            <li
              key={item}
              onClick={() => setMenu(item)}
              className={`cursor-pointer font-bold pb-1 hover:text-red-500 transition-all duration-300 ${
                menu === item ? "border-b-2 border-red-500 text-red-500" : ""
              }`}
            >
              <Link
                to={
                  item === "shop"
                    ? "/"
                    : item === "men"
                    ? "/mens"
                    : item === "women"
                    ? "/womens"
                    : item === "kids"
                    ? "/kids"
                    : "/other"
                }
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-login-cart flex items-center gap-4 md:gap-6">
          <div className="hidden md:block">{btncheckRole()}</div>

          <Link
            onClick={() => {
              setMenu(null);
              closeMobileMenu();
            }}
            to="/cart"
            className="relative p-2"
          >
            <img className="w-6 h-6 md:w-7 md:h-7" src={cart_icon} alt="Cart" />
            {getTotalCartItems() > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 flex justify-center items-center rounded-full text-white text-xs">
                {getTotalCartItems()}
              </div>
            )}
          </Link>

          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={drop_toggle}
          >
            <img className="w-6 h-6" src={nav_dropdown} alt="Menu" />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-inner">
          <ul className="flex flex-col items-center gap-4 py-4 text-gray-800 text-base font-medium">
            {["shop", "men", "women", "kids", "other"].map((item) => (
              <li
                key={item}
                onClick={() => {
                  setMenu(item);
                  closeMobileMenu();
                }}
                className={`cursor-pointer ${
                  menu === item ? "text-red-500 font-bold" : ""
                }`}
              >
                <Link
                  to={
                    item === "shop"
                      ? "/"
                      : item === "men"
                      ? "/mens"
                      : item === "women"
                      ? "/womens"
                      : item === "kids"
                      ? "/kids"
                      : "/other"
                  }
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </li>
            ))}

            <li>
              <Link
                to="/cart"
                onClick={closeMobileMenu}
                className="flex items-center gap-2"
              >
                <img className="w-5 h-5" src={cart_icon} alt="Cart" />
                <span>Cart ({getTotalCartItems()})</span>
              </Link>
            </li>

            <li>{btncheckRole()}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
