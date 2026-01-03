import React from "react";
import { FaSearch, FaShoppingCart, FaTruck } from "react-icons/fa";
import book_courier from "../../../public/images/book_courier.avif";
const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Text */}
        <div>
          <h2 className="text-4xl font-bold mb-6">How Book Courier Works</h2>
          <p className="text-gray-600 mb-4">
            Ordering books has never been easier. Just follow these steps.
          </p>

          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <FaSearch className="text-indigo-500" />
              Search your favorite books
            </li>
            <li className="flex items-center gap-3">
              <FaShoppingCart className="text-indigo-500" />
              Place your order online
            </li>
            <li className="flex items-center gap-3">
              <FaTruck className="text-indigo-500" />
              Receive books at your doorstep
            </li>
          </ul>
        </div>

        {/* Right Image */}
        <div>
          <img
            src={book_courier}
            alt="Book Delivery"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
