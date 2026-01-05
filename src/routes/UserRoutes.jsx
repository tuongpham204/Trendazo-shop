import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Shop from "../pages/Shop";
import ShopCategory from "../pages/ShopCategory";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import mens_banner from "../components/assets/banner_mens.png";
import women_banner from "../components/assets/banner_womens.png";
import kids_banner from "../components/assets/banner_kids.png";
import others_banner from "../components/assets/banner_others.png";
import Checkout from "../pages/Checkout";
import NotFound from "../pages/NotFound";

function UserRoutes() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <UserLayout>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/mens"
            element={<ShopCategory banner={mens_banner} category="men" />}
          />
          <Route
            path="/womens"
            element={<ShopCategory banner={women_banner} category="women" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={kids_banner} category="kid" />}
          />
          <Route
            path="/other"
            element={<ShopCategory banner={others_banner} category="other" />}
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserLayout>
    </div>
  );
}

export default UserRoutes;
