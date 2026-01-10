import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyWishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: books = [] } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/wishlist?email=${user?.email}`);
      return result.data;
    },
  });
  return (
    <div>
      <h2 className="text-4xl text-center">My Wishlist</h2>
      <div className="md:hidden space-y-4">
        {books.map((book, index) => (
          <div
            key={book._id || index}
            className="card bg-base-100 shadow-md p-4 flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-16 w-16">
                  <img src={book.image} alt={book.bookTitle} />
                </div>
              </div>
              <div>
                <p className="font-semibold">{book.bookTitle}</p>
                <p className="text-sm text-gray-600">{book.bookName}</p>
              </div>
            </div>
            <p> User: {book.userName}</p>
            <p> Book Title: {book.bookTitle}</p>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Book Image</th>
              <th>Book Name</th>
              <th>Book Title</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id || index}>
                <td>{index + 1}</td>
                <td>{book.userName}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={book.image} alt={book.bookTitle} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{book.bookName}</td>
                <td>{book.bookTitle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWishlist;
