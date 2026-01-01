import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../../Component/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
const Navbar = () => {
  const { user, userLogOut } = useAuth();

  const userSignOut = () => {
    userLogOut()
      .then(() => {
        console.log("User has logged out Successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/addedNewBooks">Books</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/dashboard/my-orders">My Orders</NavLink>
          </li>
        </>
      )}
    </>
  );

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const handleTheme = (checked) => {
    // console.log(checked);
    setTheme(checked ? "dark" : "light");
  };
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <Logo></Logo>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-2">
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={localStorage.getItem("theme")}
            className="toggle"
          />
          <div>
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user?.photoURL}
                    alt=""
                  />
                  <button
                    onClick={() => {
                      userSignOut();
                    }}
                    className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]"
                  >
                    SignOut
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="btn bg-linear-to-r from-[rgb(17,153,142)] via-[#38ef7d] to-[#0fd850]">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
