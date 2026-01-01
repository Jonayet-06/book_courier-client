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
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL. No.</th>
              <th>Book Title</th>
              <th>Book Price</th>
              <th>Order Date</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>{order.bookTitle}</td>
                <td>{order.bookPrice}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  {order.status === "pending" && (
                    <span className="badge badge-warning">Pending</span>
                  )}
                  {order.status === "paid" && (
                    <span className="badge badge-success">Paid</span>
                  )}
                  {order.status === "cancelled" && (
                    <span className="badge badge-error">Cancelled</span>
                  )}
                </td>
                <td>{order.deliveryStatus}</td>
                <td>
                  {order.status === "paid" && (
                    <button
                      onClick={() => handleCancellOrder(order._id)}
                      className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850] mr-2"
                    >
                      Cancel
                    </button>
                  )}
                  {order.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleCancellOrder(order._id)}
                        className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850] mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handlePayment(order)}
                        className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]"
                      >
                        Pay Now
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

export default MyOrders;
