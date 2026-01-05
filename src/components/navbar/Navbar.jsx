import { useContext, useState } from "react";
import nav_dropdown from "../assets/nav_dropdown.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { useAuth } from "../../context/AuthProvider";
import { useDarkMode } from "../../context/DarkModeContext";
import { FiMoon, FiSun } from "react-icons/fi";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { dark, setDark } = useDarkMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { getTotalCartItems } = useContext(ShopContext);

  const drop_toggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const renderAuthButton = () => {
    if (user) {
      return (
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-800 dark:text-gray-100">
            {user.username || user.name || user.email || "User"}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              logout();
              navigate("/");
              closeMobileMenu();
            }}
            className="px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:opacity-90 transition duration-300"
          >
            Logout
          </motion.button>
        </div>
      );
    }

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setMenu(null);
          closeMobileMenu();
          navigate("/login");
        }}
        className="px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:opacity-90 transition duration-300"
      >
        Login
      </motion.button>
    );
  };

  return (
    <div className="navbar flex flex-col sticky top-0 z-50 bg-white dark:bg-gray-900  dark:border-b border-gray-500 ">
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
            <p className="text-gray-800 dark:text-gray-100 text-2xl md:text-3xl font-semibold">
              SHOP
            </p>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-gray-800 dark:text-gray-100 text-base font-medium">
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

        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <Link
            onClick={() => {
              setMenu(null);
              closeMobileMenu();
            }}
            to="/cart"
            className="relative p-2"
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              className="w-6 h-6 md:w-7 md:h-7 dark:filter dark:brightness-150"
              alt="Cart"
            />
            {getTotalCartItems() > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 flex justify-center items-center rounded-full text-white text-xs">
                {getTotalCartItems()}
              </div>
            )}
          </Link>

          <div className="hidden md:block">{renderAuthButton()}</div>

          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            onClick={drop_toggle}
          >
            <img
              className="w-6 h-6 dark:filter dark:brightness-150"
              src={nav_dropdown}
              alt="Menu"
            />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-inner">
          <ul className="flex flex-col items-center gap-4 py-4 text-gray-800 dark:text-gray-100 text-base font-medium">
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

            <li>{renderAuthButton()}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
