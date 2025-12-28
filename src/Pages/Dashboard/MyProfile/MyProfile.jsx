import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    let photoURL = user?.photoURL;
    // console.log(data);
    if (data.image?.[0]) {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMG_BB_KEY
      }`;

      const imgRes = await axios.post(image_API_URL, formData);
      photoURL = imgRes.data.data.url;
      //   console.log(imgRes.data.data.url, data.name);
    }
    await updateUserProfile(data.name, photoURL);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your profile has been updated successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    reset();
  };

  return (
    <>
      <h2 className="font-bold text-4xl text-center">My Profile</h2>
      <div className="card bg-base-100 w-96 mx-auto shadow-sm">
        <figure>
          <img
            src={user?.photoURL}
            className="h-[300px] w-full"
            alt="User Image"
          />
        </figure>
        <div className="card-body">
          <h2 className="text-center font-bold text-2xl">
            {user?.displayName}
          </h2>
        </div>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-5">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
            <h2 className="font-bold text-center text-2xl">Update Profile</h2>
            {/* Name Field  */}
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              {...register("name", { required: true })}
              placeholder="Name"
            />
            <label className="label">Profile Image</label>
            <input
              type="file"
              className="file-input"
              {...register("image")}
              placeholder="Your Image"
            />
            <button
              type="submit"
              className="btn btn-neutral mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Updated Profile"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
