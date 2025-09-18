import { createContext, useContext, useState, useEffect } from "react";

const OrdersContext = createContext();

export const OrderProvider = ({ children }) => {
  const [userOrders, setUserOrders] = useState([]);
  
  useEffect(() => {
    const storedOrders = localStorage.getItem("UserOrders");
    if (storedOrders) {
      setUserOrders(JSON.parse(storedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("UserOrders", JSON.stringify(userOrders));
  }, [userOrders]);

  const addToOrders = (product) => {
    if (!product || !product.id) return;

    setUserOrders((prevOrder) => {
      const FindItem = prevOrder.find((item) => item.id === product.id);
      if (FindItem) {
        return prevOrder.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prevOrder, { ...product, count: 1 }];
    });
  };

  const removeFromOrders = (id) => {
    setUserOrders((prevOrder) => prevOrder.filter((item) => item.id !== id));
  };

  const updateOrderCount = (id, count) => {
    setUserOrders((prevOrder) =>
      count <= 0
        ? prevOrder.filter((item) => item.id !== id)
        : prevOrder.map((item) =>
            item.id === id ? { ...item, count } : item
          )
    );
  };

  const clearOrders = () => setUserOrders([]);

  return (
    <OrdersContext.Provider
      value={{ userOrders, addToOrders, removeFromOrders, updateOrderCount, clearOrders }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
