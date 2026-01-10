import { useQuery } from "@tanstack/react-query";
// import React, { useRef } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const MyBooksForLibrarian = () => {
  const axiosSecure = useAxiosSecure();
  //   const handleEditRef = useRef();
  const { data: newBooks = [] } = useQuery({
    queryKey: ["addedNewBooks"],
    queryFn: async () => {
      const result = await axiosSecure.get("/addedNewBooks");
      return result.data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl">My Books for Librarian: {newBooks.length}</h2>
      <div className="md:hidden space-y-4">
        {newBooks.map((book, index) => (
          <div
            key={book._id || index}
            className="card bg-base-100 shadow-md p-4 flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-16 w-16">
                  <img src={book.image} alt={book.name} />
                </div>
              </div>
              <div>
                <p className="font-semibold text-lg">{book.name}</p>
              </div>
            </div>
            <Link to={`/dashboard/edit-book/${book._id}`}>
              <button className="btn btn-sm bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850] mt-2 w-full">
                Edit
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Book Name</th>
              <th>Book Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newBooks.map((book, index) => (
              <tr key={book._id || index}>
                <td>{index + 1}</td>
                <td>{book.name}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={book.image} alt={book.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <Link to={`/dashboard/edit-book/${book._id}`}>
                    <button className="btn btn-sm bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooksForLibrarian;
