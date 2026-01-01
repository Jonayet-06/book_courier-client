import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser, FaUserTie } from "react-icons/fa6";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    const roleInfo = {
      role: "admin",
    };
    axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be an Admin!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I agree with it!",
      }).then((result) => {
        if (result.isConfirmed) {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Marked Admin!",
              text: `${user.displayName} marked as an Admin.`,
              icon: "success",
            });
          }
        }
      });
    });
  };

  const handleMakeLibrarian = (user) => {
    const roleInfo = {
      role: "librarian",
    };
    axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be a librarian!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I agree with it!",
      }).then((result) => {
        if (result.isConfirmed) {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Marked Librarian!",
              text: `${user.displayName} marked as a librarian.`,
              icon: "success",
            });
          }
        }
      });
    });
  };
  return (
    <div>
      <h2 className="text-4xl">All Users : {users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL. No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Role Icon</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    <button className="badge badge-warning">
                      <MdAdminPanelSettings />
                    </button>
                  ) : user.role === "librarian" ? (
                    <button className="badge badge-info">
                      <FaUserTie />
                    </button>
                  ) : (
                    <button className="badge badge-success">
                      <FaUser />
                    </button>
                  )}
                </td>
                <th className="flex gap-5">
                  <button
                    onClick={() => handleMakeLibrarian(user)}
                    className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]"
                  >
                    Make Librarian
                  </button>
                  <button
                    onClick={() => handleMakeAdmin(user)}
                    className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]"
                  >
                    Make Admin
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
