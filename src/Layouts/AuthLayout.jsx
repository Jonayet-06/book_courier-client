import React from "react";
import Logo from "../Component/Logo/Logo";
import { Outlet } from "react-router";
import authImage from "../assets/book_delivery.jpg";
const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Logo></Logo>
      <div className="grid md:grid-cols-2 gap-5">
        <Outlet></Outlet>
        <img
          className="w-[380px] h-[350px] mx-auto"
          src={authImage}
          alt="Authenticate Image"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
