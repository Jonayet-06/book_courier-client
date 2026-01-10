import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageBooksForAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: newBooks = [] } = useQuery({
    queryKey: ["addedNewBooks"],
    queryFn: async () => {
      const result = await axiosSecure.get("/addedNewBooks");
      return result.data;
    },
  });
  const handlePublished = (id) => {
    const updateBookInfo = {
      status: "published",
    };
    axiosSecure.patch(`/addedNewBooks/status/${id}`, updateBookInfo);
    refetch();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your status has been published successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleUnpublished = (id) => {
    const updateBookInfo = {
      status: "unpublished",
    };
    axiosSecure.patch(`/addedNewBooks/status/${id}`, updateBookInfo);
    refetch();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your status has been unpublished successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await axiosSecure.delete(`/addedNewBooks/${id}`);
        // console.log(result.data);
        if (result.data.deletedCount) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your book has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div>
      <h2 className="text-2xl">Manage Books For Admin: {newBooks.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL. No.</th>
              <th>Book Image</th>
              <th>Book Name</th>
              <th>Book Title</th>
              <th>Book Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newBooks.map((book, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={book.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{book.name}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <button
                    onClick={() => handlePublished(book._id)}
                    className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850] mr-4"
                  >
                    Published
                  </button>
                  <button
                    onClick={() => handleUnpublished(book._id)}
                    className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850] mr-4"
                  >
                    Unpublished
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooksForAdmin;
