import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const LatestBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { data: books = [] } = useQuery({
    queryKey: ["latest-books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-books");
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="font-bold text-center text-4xl">Latest Books</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {books.map((book) => (
          <div key={book._id} className="card bg-base-100  shadow-sm">
            <figure>
              <img src={book.image} alt="Shoes" />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;
