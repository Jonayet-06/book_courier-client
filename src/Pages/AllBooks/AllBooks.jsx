import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const AllBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [allBooks, setAllBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axiosSecure
      .get(`/addedNewBooks?searchText=${searchText}&sortOrder=${sortOrder}`)
      .then((res) => {
        setAllBooks(res.data);
      });
  }, [axiosSecure, searchText, sortOrder]);

  // 🔹 Ensure absolute image URL
  const getImageUrl = (image) => {
    if (!image) return "/placeholder-book.png";
    if (image.startsWith("http")) return image;
    return `${import.meta.env.VITE_API_URL}/${image}`;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Heading */}
      <h2 className="font-bold text-4xl text-center my-10">All Books</h2>
      {/* <p>Search Text: {searchText}</p> */}
      <div className="flex justify-between">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            className="grow"
            placeholder="Search Book"
          />
        </label>

        <select
          className="select select-bordered"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
        {allBooks.map((book) => (
          <Link
            to={`/addedNewBooks/${book._id}`}
            key={book._id}
            className="card bg-base-100 shadow-sm overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <figure className="h-72">
              <img
                src={getImageUrl(book.image)}
                alt={book.title || "Book"}
                loading="lazy"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-book.png";
                }}
              />
            </figure>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
