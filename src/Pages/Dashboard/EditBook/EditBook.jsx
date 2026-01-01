import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router";

const EditBook = () => {
  const { id } = useParams();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);
    const bookImg = data.image[0];

    // prepare the image
    const formData = new FormData();
    formData.append("image", bookImg);

    // prepare the image api url
    const image_API_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMG_BB_KEY
    }`;

    // post in the imgbb
    const imgRes = await axios.post(image_API_URL, formData);
    console.log(imgRes.data);
    const image = imgRes.data.data.url;

    const newBookInfo = {
      name: data.name,
      author: data.author,
      title: data.title,
      description: data.description,
      image: image,
      status: data.status,
      price: data.price,
    };
    axiosSecure.patch(`/addedNewBooks/${id}`, newBookInfo).then((res) => {
      if (res.data.modifiedCount) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Book has been updated successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div>
      <div>
        <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
          <div className="card-body">
            <h2 className="text-center font-bold text-2xl">Edit Book Here</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
              {/* Book Name  */}
              <label className="label">Book Name</label>
              <input
                type="text"
                className="input"
                placeholder="Book Name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="font-bold text-red-500">Book Name is required.</p>
              )}
              {/* Author  */}
              <label className="label">Author Name</label>
              <input
                type="text"
                className="input"
                placeholder="Author Name"
                {...register("author", { required: true })}
              />
              {errors.author && (
                <p className="font-bold text-red-500">
                  Author Name is required.
                </p>
              )}
              {/* Book Title  */}
              <label className="label">Book Title</label>
              <input
                type="text"
                className="input"
                placeholder="Book Title"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="font-bold text-red-500">
                  Book Title is required.
                </p>
              )}
              {/* Book Description  */}
              <label className="label">Book Description</label>
              <textarea
                type="text"
                className="input"
                placeholder="Book Description"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="font-bold text-red-500">
                  Book Description is required.
                </p>
              )}
              {/* Image  */}
              <label className="label">Upload Image</label>
              <input
                type="file"
                className="file-input"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <p className="font-bold text-red-500">Image is required.</p>
              )}
              {/* Status  */}
              <label className="label">Status</label>
              <select {...register("status", { required: true })}>
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
              </select>
              {/* Price  */}
              <label className="label">Book Price</label>
              <input
                type="number"
                className="input"
                placeholder="Book Price"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <p className="font-bold text-red-500">
                  Price is required & Price must be greater than 0.
                </p>
              )}
              <button className="btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Book"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
