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

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axiosSecure.get(`/addedNewBooks/${id}`).then((res) => {
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

  const onSubmit = async (data) => {
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

  const handleWishlist = async () => {
    const orderData = {
      bookId: book._id,
      bookName: book.name,
      bookTitle: book.title,
      bookPrice: book.price,
      image: book.image,
      userName: user?.displayName,
      email: user?.email,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You will be added it to your wishlist",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, added it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await axiosSecure.post("/wishlist", orderData);
        if (result.data.insertedId)
          Swal.fire({
            title: "Added!",
            text: "Your book has been added to wishlist successfully.",
            icon: "success",
          });
      }
    });
  };

  const handleReview = async () => {
    const reviewData = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      rating: Number(rating),
      comment: comment,
    };

    const res = await axiosSecure.post(
      `/addedNewBooks/${id}/review`,
      reviewData
    );

    if (res.data) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your review has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      setComment("");
      axiosSecure.get(`/addedNewBooks/${id}`).then((res) => setBook(res.data));
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
      <button
        onClick={handleWishlist}
        className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]"
      >
        Add to Wishlist
      </button>

      <div>
        <h2 className="text-4xl font-bold my-5">Reviews</h2>
        <div className="">
          {book.reviews?.length ? (
            book.reviews.map((review, index) => (
              <div className="card bg-base-100 shadow-md mb-10" key={index}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <img
                      className="h-[50px] w-[50px] rounded-full"
                      src={review.photoURL}
                      alt=""
                    />
                    <h2 className="font-bold">{review.displayName}</h2>
                  </div>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        checked={i < review.rating}
                        readOnly
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2 font-medium">{review.comment}</p>
                <p className="text-sm text-gray-400">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>No Reviews yet.</p>
          )}
        </div>
      </div>
      <div className="card bg-base-100 shadow-md p-5 mt-6 mx-auto">
        <h2 className="font-bold mb-2">Add Review</h2>
        <select
          className="select select-bordered w-full mb-2"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="5">★★★★★ (5)</option>
          <option value="4">★★★★☆ (4)</option>
          <option value="3">★★★☆☆ (3)</option>
          <option value="2">★★☆☆☆ (2)</option>
          <option value="1">★☆☆☆☆ (1)</option>
        </select>

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <button
          onClick={handleReview}
          className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]"
        >
          Submit Review
        </button>
      </div>
      {/* Modal */}
      <dialog
        ref={orderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form
                onSubmit={(e) => handleSubmit(onSubmit)(e)}
                className="fieldset"
              >
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
