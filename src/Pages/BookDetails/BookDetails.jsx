import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Component/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [book, setBook] = useState();
  const orderModalRef = useRef();
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    axiosSecure.get(`/books/${id}`).then((res) => {
      //   console.log(res.data);
      setBook(res.data);
    });
  }, [id, axiosSecure]);

  if (!book) {
    return <Loading></Loading>;
  }

  const handleOrder = () => {
    orderModalRef.current.showModal();
  };

  const onSubmitData = async (data) => {
    const orderData = {
      bookId: book._id,
      bookName: book.name,
      bookTitle: book.title,
      bookPrice: book.price,
      image: book.image,
      userName: user?.displayName,
      email: user?.email,
      phone: data.phone,
      address: data.address,
    };
    const res = await axiosSecure.post("/orders", orderData);
    if (res.data.insertedId) {
      orderModalRef.current.close();
      Swal.fire({
        title: "Your order has been added successfully.",
        icon: "success",
        draggable: true,
      });
    }
  };

  return (
    <div className="text-center mt-5">
      <img className="mx-auto" src={book.image} alt="BookImage" />
      <h1 className="font-bold text-2xl">{book.name}</h1>
      <p className="font-bold text-xl">{book.author}</p>
      <p className="text-xl">{book.title}</p>
      <p>{book.description}</p>
      <button
        onClick={handleOrder}
        className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]"
      >
        Order Now
      </button>

      {/* Modal */}
      <dialog
        ref={orderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmitData)} className="fieldset">
                {/* Name */}
                <label className="label">Name</label>
                <input
                  type="name"
                  defaultValue={user?.displayName}
                  className="input"
                  placeholder="Name"
                  readOnly
                />
                {/* Email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="input"
                  placeholder="Email"
                  readOnly
                />
                {/* Phone Number */}
                <label className="label">Phone Number</label>
                <input
                  type="phone"
                  {...register("phone", { required: true })}
                  className="input"
                  placeholder="Phone Number"
                />
                {/* Address */}
                <label className="label">Address</label>
                <textarea
                  type="address"
                  {...register("address", { required: true })}
                  className="input"
                  placeholder="Address"
                />
                <button className="btn btn-neutral mt-4">Place Order</button>
              </form>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BookDetails;
