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
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL. No.</th>
              <th>User Name</th>
              <th>Book Image</th>
              <th>Book Name</th>
              <th>Book Title</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr>
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
