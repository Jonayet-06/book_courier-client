import React from "react";
import logo from "../../assets/bookCourierLogo.jpg";
const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <img
        className="w-[50px] h-[50px] rounded-full"
        src={logo}
        alt="LogoImage"
      />
      <span className="font-bold text-green-900">Book</span>
      <span className="font-bold text-red-900">Courier</span>
    </div>
  );
};

export default Logo;
