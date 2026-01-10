import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-5xl text-center">
        Payment History:{payments.length}
      </h2>
      <div className="md:hidden space-y-4">
        {payments.map((payment, index) => (
          <div
            key={payment._id || index}
            className="card bg-base-100 shadow-md p-4"
          >
            <h3 className="font-semibold text-lg mb-2">{payment.bookName}</h3>

            <p>
              <b>Transaction:</b> {payment.transactionId}
            </p>
            <p>
              <b>Amount:</b> ${payment.amount}
            </p>
            <p>
              <b>Status:</b>{" "}
              <span className="badge badge-success">
                {payment.paymentStatus}
              </span>
            </p>
            <p>
              <b>Email:</b> {payment.customerEmail}
            </p>
            <p>
              <b>Date:</b> {new Date(payment.paidAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Email</th>
              <th>Paid Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id || index}>
                <td>{index + 1}</td>
                <td>{payment.bookName}</td>
                <td className="truncate max-w-[180px]">
                  {payment.transactionId}
                </td>
                <td>${payment.amount}</td>
                <td>
                  <span className="badge badge-success">
                    {payment.paymentStatus}
                  </span>
                </td>
                <td>{payment.customerEmail}</td>
                <td>{new Date(payment.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
