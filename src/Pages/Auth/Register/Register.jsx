import React from "react";
import { useForm } from "react-hook-form";
import { VscErrorSmall } from "react-icons/vsc";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfileInitial } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const handleRegistration = (data) => {
    // console.log(data);
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        // console.log(result.user);
        // reset();
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMG_BB_KEY
        }`;
        axios.post(image_API_URL, formData).then((res) => {
          console.log("after image upload", res.data);

          let photoURL = res.data.data.url;
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          const userInfo = {
            displayName: data.name,
            email: data.email,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("User created in the database");
            }
          });
          updateUserProfileInitial(userProfile)
            .then((res) => {
              console.log(res);
              console.log("User profile updated successfully.");
              navigate(location?.state || "/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h2 className="font-bold text-3xl text-center">Register Now</h2>
        <form onSubmit={handleSubmit(handleRegistration)} className="fieldset">
          {/* Name  */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Name"
          />
          {errors.name?.type === "required" && (
            <p className="font-bold text-red-500">Name is required.</p>
          )}
          {/* Photo/Image field  */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
          />
          {errors.photo?.type === "required" && (
            <p className="font-bold text-red-500">Photo is required.</p>
          )}
          {/* Email  */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="font-bold text-red-500">Email is required.</p>
          )}
          {/* Password  */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "minLength" && (
            <p className="font-bold text-red-500">
              Password shoubld be eight(8) characters or longer.
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="font-bold text-red-500">
              Password should be at least one uppercase letter, one lowercase
              letter, one special character & one number.
            </p>
          )}
          <button className="btn btn-neutral mt-4">Register</button>
          <div>
            <p>
              Already have an account? Please,{" "}
              <Link state={location.state} to="/login">
                <span className="underline hover:text-green-400">login</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
