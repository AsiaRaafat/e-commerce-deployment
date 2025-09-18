import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { CartProvider } from '../CartContext';
import { OrderProvider } from "../OrdersContext";
export default function Layout() {
  return (
    <div>
      <OrderProvider>
      <CartProvider>
      <NavBar />
      <Outlet />
      <Footer />
      </CartProvider>
      </OrderProvider>
    </div>
  );
}
