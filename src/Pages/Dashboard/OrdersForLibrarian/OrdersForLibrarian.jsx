import { useQuery } from "@tanstack/react-query";
import { AxiosHeaders } from "axios";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const OrdersForLibrarian = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: librarianOrders = [] } = useQuery({
    queryKey: ["/librarian/orders"],
    queryFn: async () => {
      const result = await axiosSecure.get("/librarian/orders");
      return result.data;
    },
  });
  const handleStatusChange = (id, newStatus) => {
    const updateStatus = {
      deliveryStatus: newStatus,
    };
    axiosSecure.patch(`/librarian/status/${id}`, updateStatus);
    refetch();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Your delivery status has been updated successfully.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleCancel = (id) => {
    const updateStatus = {
      deliveryStatus: "cancelled",
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await axiosSecure.patch(
          `/librarian/status/${id}`,
          updateStatus
        );
        // console.log(result.data);
        if (result.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your order has been cancelled.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div>
      <h2 className="text-3xl">
        Orders For Librarian: {librarianOrders.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL. No.</th>
              <th>Book Image</th>
              <th>Book Name</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Status</th>
              <th>Update</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {librarianOrders.map((order, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={order.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{order.bookName}</td>
                <td>{order.userName}</td>
                <td>{order.email}</td>
                <td
                  className={`badge ${
                    order.deliveryStatus === "cancelled"
                      ? "badge-error"
                      : order.deliveryStatus === "pending"
                      ? "badge-warning"
                      : "badge-success"
                  } mt-6`}
                >
                  {order.deliveryStatus}
                </td>
                <td>
                  {order.deliveryStatus !== "cancelled" && (
                    <>
                      <select
                        value={order.deliveryStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="select select-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </>
                  )}
                </td>
                <td>
                  {order.deliveryStatus !== "cancelled" && (
                    <>
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersForLibrarian;
