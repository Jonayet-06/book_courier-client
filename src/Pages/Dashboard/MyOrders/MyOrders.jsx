import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: orders = [], refetch } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
  });

  const handleCancellOrder = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/orders/cancel/${id}`).then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              swalWithBootstrapButtons.fire({
                title: "Cancelled!",
                text: "Your order has been cancelled.",
                icon: "success",
              });
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  const handlePayment = async (order) => {
    const paymentInfo = {
      bookId: order.bookId,
      orderId: order._id,
      bookName: order.bookName,
      email: order.email,
      bookPrice: order.bookPrice,
      orderDate: order.createdAt,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.assign(res.data.url);
  };
  return (
    <div>
      <h2>All Of My Orders: {orders.length}</h2>
      {/* Desktop & Tablet View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
              <th>Delivery</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.bookTitle}</td>
                <td>${order.bookPrice}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${
                      order.status === "paid"
                        ? "badge-success"
                        : order.status === "pending"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.deliveryStatus}</td>
                <td className="flex gap-2">
                  {(order.status === "pending" || order.status === "paid") && (
                    <button
                      onClick={() => handleCancellOrder(order._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  )}
                  {order.status === "pending" && (
                    <button
                      onClick={() => handlePayment(order)}
                      className="btn btn-sm btn-success"
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="card bg-base-100 shadow-md p-4">
            <h3 className="font-semibold text-lg">{order.bookTitle}</h3>
            <p> Price: ${order.bookPrice}</p>
            <p> Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>
              Status:{" "}
              <span
                className={`badge ${
                  order.status === "paid"
                    ? "badge-success"
                    : order.status === "pending"
                    ? "badge-warning"
                    : "badge-error"
                }`}
              >
                {order.status}
              </span>
            </p>
            <p> Delivery: {order.deliveryStatus}</p>

            <div className="flex gap-2 mt-3 flex-wrap">
              {(order.status === "pending" || order.status === "paid") && (
                <button
                  onClick={() => handleCancellOrder(order._id)}
                  className="btn btn-sm btn-error"
                >
                  Cancel
                </button>
              )}
              {order.status === "pending" && (
                <button
                  onClick={() => handlePayment(order)}
                  className="btn btn-sm btn-success"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
