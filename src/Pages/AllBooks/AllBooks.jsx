import React, { Suspense, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Loading from "../../Component/Loading/Loading";

const AllBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    axiosSecure.get("/addedNewBooks").then((res) => {
      console.log(res.data);
      setAllBooks(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <h2 className="font-bold text-4xl text-center my-10">All Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allBooks.map((book) => (
            <Link
              to={`/addedNewBooks/${book._id}`}
              key={book._id}
              className="card bg-base-100 shadow-sm"
            >
              <figure>
                <img src={book.image} alt="Shoes" />
              </figure>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
