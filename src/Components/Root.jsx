import { createBrowserRouter } from "react-router-dom";
import Layout from "./MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/LogIn";
import Register from "../Pages/Register";
import MakeUp from "../Pages/MakeUp/MakeUp";
import SingleProduct from "../Pages/SingleProduct/SingleProduct";
import SkinCare from "../Pages/SkinCare/SkinCare";
import Cart from "../Pages/Cart/Cart";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Profile from "../Pages/Profile/Profile";
import P404 from "../Pages/P404/P404";
import Perfumes from "../Pages/Perfumes/Perfumes";
import SpecialOffers from "../Pages/SpecialOffers/SpecialOffers";
import UserOrders from "../Pages/Orders/UserOrders";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/MakeUp",
        element: <MakeUp />,
      },

      {
        path: "/MakeUp/:documentId",
        element: <SingleProduct />,
      },
      {
        path: "/SkinCare/:documentId",
        element: <SingleProduct />,
      },
      {
        path: "/Perfumes/:documentId",
        element: <SingleProduct />,
      },
      {
        path: "/SpecialOffers/:documentId",
        element: <SingleProduct />,
      },
      {
        path: "/:documentId",
        element: <SingleProduct />,
      },
      {
        path: "/SkinCare",
        element: <SkinCare />,
      },
      {
        path: "/Cart",
        element: <Cart />,
      },
      {
        path: "/CheckOut",
        element: <CheckOut />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
      {
        path: "/Perfumes",
        element: <Perfumes/>,
      },
      {
        path: "/SpecialOffers",
        element: <SpecialOffers />,
      },
      {
        path: "/orders",
        element: <UserOrders />,
      },
      {
        path: "*",
        element: <P404 />,
      },
    ],
  },
]);

export default router;
