import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div>
      <h2>Payment is cancelled. Please, try again.</h2>
      <Link to="/dashboard/my-orders">
        <button className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]">
          Try Again
        </button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
