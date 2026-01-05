/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import allproduct from "../components/assets/all_product";
import { goldhelper } from "../helpers/goldhelper";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 60 + 1; index++) {
    cart[index] = { total: 0, size: "none" };
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [cartTotal, setCartTotal] = useState(0);
  const [all_product, setAll_product] = useState(null || allproduct);
  const [productTotal, setProductTotal] = useState(0);
  const [allusers, setAllusers] = useState([]);
  const [allorders, setAllorders] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const URL = import.meta.env.VITE_APP_API;

  const getAllProduct = async () => {
    await fetch(`${URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setAll_product(data))
      .catch((err) => console.log("Error", err));
  };

  const getAllUsers = async () => {
    await fetch(`${URL}/api/users`)
      .then((resq) => resq.json())
      .then((data) => {
        setAllusers(data);
      })
      .catch((err) => console.log("Error", err));
  };

  const getAllOrders = async () => {
    await fetch(`${URL}/api/payment`)
      .then((resq) => resq.json())
      .then((data) => {
        setAllorders(data);
      })
      .catch((err) => console.log("Error", err));
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const combinedData = all_product
    .filter((item) => cartItems[item.id]?.total > 0)
    .map((item) => ({
      ...item,
      ...cartItems[item.id],
    }));

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      fetch(`${URL}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/from-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((req) => req.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const addToCart = (itemId, size) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], total: prev[itemId].total + 1, size },
    }));

    if (localStorage.getItem("auth-token")) {
      fetch(`${URL}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/from-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((req) => req.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], total: prev[itemId].total - 1 },
    }));

    if (localStorage.getItem("auth-token")) {
      fetch(`${URL}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/from-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      });
    }
  };

  const changSize = (itemId, size) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], total: prev[itemId].total, size },
    }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item].total > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item].total;
        setCartTotal(totalAmount.toFixed(2));
      }
      if (totalAmount === 0) {
        setCartTotal(0);
      }
    }
  };

  const getAllOrderAmount = () => {
    let totalAmount = 0;
    allorders.forEach((price) => {
      totalAmount += Number(price.amount_total);
    });
    const price = (goldhelper(totalAmount) / 35).toFixed(2);
    setOrderTotal(price);
    return price;
  };

  const getAllProductsAmount = () => {
    let totalAmount = 0;
    all_product.forEach((price) => {
      totalAmount += Number(price.new_price);
    });
    const price = totalAmount.toFixed(2);
    setProductTotal(price);
    return price;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      totalItem += cartItems[item].total;
    }
    return totalItem;
  };
  const contextValue = {
    getTotalCartItems,
    cartTotal,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    setAll_product,
    getAllProduct,
    getAllUsers,
    allusers,
    setAllusers,
    combinedData,
    getAllOrders,
    allorders,
    changSize,
    orderTotal,
    getAllOrderAmount,
    productTotal,
    getAllProductsAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
