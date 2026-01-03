import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const AllBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    axiosSecure.get("/addedNewBooks").then((res) => {
      setAllBooks(res.data);
    });
  }, [axiosSecure]);

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

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
