import { Link } from "react-router";
import { Mail } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import Logo from "../../../Component/Logo/Logo";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850] py-8 px-4  rounded-xl mt-20 max-w-7xl mx-auto">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-white">
              <span className="text-xl font-bold text-gray-800 dark:text-gray-200 flex gap-2">
                <Logo></Logo>
              </span>
            </div>
            <ul className="space-y-2 mt-4">
              <li>
                <Link
                  to="/all-models"
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-600"
                >
                  All Models
                </Link>
              </li>
              <li>
                <Link
                  to="/add-model"
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-600"
                >
                  Add Model
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-600"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-600"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-600"
                >
                  Learning Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-600"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-600"
                >
                  Poly Tips
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-600"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">
              Community
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-600"
                >
                  Discussion Forums
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-600"
                >
                  Study Groups
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-600"
                >
                  Events & Workshops
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-600"
                >
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">
              Connect With Us
            </h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-200 hover:text-blue-700"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-200 hover:text-blue-400"
              >
                <BsTwitterX size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-200 hover:text-pink-600"
              >
                <FaInstagram size={24} />
              </a>
            </div>
            <div className="break-all">
              <a
                href="mailto:support@nihonlearn.com"
                className="flex items-center text-gray-600 dark:text-gray-200 hover:text-blue-600"
              >
                <Mail size={18} className="mr-2" />
                <span className="break-all">support@habittracklearn.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t lg:mb-0 md:mb-0 mb-20 border-[#fa7171] mt-8 pt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-200">
            © {currentYear} Habit Track Learn. All Rights Reserved.
            <span className="ml-4">
              <Link to="/" className="hover:text-blue-600 mr-3">
                Privacy Policy
              </Link>
              <Link to="/" className="hover:text-blue-600">
                Terms of Service
              </Link>
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
