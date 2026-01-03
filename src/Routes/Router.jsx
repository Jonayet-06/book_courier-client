import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import AllBooks from "../Pages/AllBooks/AllBooks";
import BookDetails from "../Pages/BookDetails/BookDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
// import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import AddBookByLibrarian from "../Pages/Dashboard/AddBookByLibrarian/AddBookByLibrarian";
import MyBooksForLibrarian from "../Pages/Dashboard/MyBooksForLibrarian/MyBooksForLibrarian";
import EditBook from "../Pages/Dashboard/EditBook/EditBook";
import OrdersForLibrarian from "../Pages/Dashboard/OrdersForLibrarian/OrdersForLibrarian";
import MyProfileForAdmin from "../Pages/Dashboard/MyProfileForAdmin/MyProfileForAdmin";
import ManageBooksForAdmin from "../Pages/Dashboard/ManageBooksForAdmin/ManageBooksForAdmin";
import LatestBooks from "../Pages/LatestBooks/LatestBooks";
import Coverage from "../Pages/Coverage/Coverage";
import WhyChooseBookCourier from "../Pages/WhyChooseBookCourier/WhyChooseBookCourier";
import HowItWorks from "../Pages/HowItWorks/HowItWorks";
import BookCourierStats from "../Pages/BookCourierStats/BookCourierStats";
// import EditBook from "../Pages/EditBook/EditBook";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/addedNewBooks",
        Component: AllBooks,
      },
      {
        path: "/addedNewBooks/:id",
        Component: BookDetails,
      },
      {
        path: "/latest-books",
        Component: LatestBooks,
      },
      {
        path: "/coverage",
        Component: Coverage,
      },
      {
        path: "/whyChooseBookCourier",
        Component: WhyChooseBookCourier,
      },
      {
        path: "/howItWorks",
        Component: <HowItWorks></HowItWorks>,
      },
      {
        path: "/bookCourierStats",
        Component: <BookCourierStats></BookCourierStats>,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-orders",
        Component: MyOrders,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "users-management",
        Component: UsersManagement,
      },
      {
        path: "add-book-by-librarian",
        Component: AddBookByLibrarian,
      },
      {
        path: "my-books-for-librarian",
        Component: MyBooksForLibrarian,
      },
      {
        path: "edit-book/:id",
        Component: EditBook,
      },
      {
        path: "orders-for-librarian",
        Component: OrdersForLibrarian,
      },
      {
        path: "my-profile-for-admin",
        Component: MyProfileForAdmin,
      },
      {
        path: "manage-books-for-admin",
        Component: ManageBooksForAdmin,
      },
    ],
  },
]);

export default Router;
