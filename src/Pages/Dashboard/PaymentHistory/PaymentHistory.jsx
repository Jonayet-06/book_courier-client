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
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL. No.</th>
              <th>Book Name</th>
              <th>Payment Id</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Email</th>
              <th>Paid Date</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((payment, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{payment.bookName}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.amount}</td>
                <td>{payment.paymentStatus}</td>
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
