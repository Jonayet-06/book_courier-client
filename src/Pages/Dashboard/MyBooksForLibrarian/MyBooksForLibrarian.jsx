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

  //   const handleEdit = () => {
  //     // const newBookInfo = {};
  //     // axiosSecure.patch(`/addedNewBooks/${book._id}`, newBookInfo);
  //     handleEditRef.current.showModal();
  //   };

  return (
    <div>
      <h2 className="text-2xl">My Books for Librarian: {newBooks.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL. No.</th>
              <th>Book Name</th>
              <th>Book Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newBooks.map((newBook, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{newBook.name}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={newBook.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <th>
                  <Link to={`/dashboard/edit-book/${newBook._id}`}>
                    <button className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]">
                      Edit
                    </button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <dialog
        ref={handleEditRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog> */}
    </div>
  );
};

export default MyBooksForLibrarian;
