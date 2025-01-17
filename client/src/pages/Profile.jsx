import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [userSuccess, setUserSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data.rest));
      setUserSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDelete = async () => {
    dispatch(deleteUserStart());
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data.message));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    dispatch(signOutStart());
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      alert(data.message);
      dispatch(signOutSuccess(data.message));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <div className="max-w-lg mx-auto p-3">
        <form className="flex flex-col " onSubmit={handleSubmit}>
          <img
            src={currentUser?.avatar}
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          ></img>
          <input
            type="text"
            placeholder="username"
            id="username"
            defaultValue={currentUser.username}
            className="border p-3 my-3 rounded-lg"
            onChange={handleChange}
          ></input>
          <input
            type="email"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
            className="border p-3 my-3 rounded-lg"
            onChange={handleChange}
          ></input>
          <input
            type="password"
            placeholder="***********"
            id="password"
            className="border p-3 my-3 rounded-lg"
            onChange={handleChange}
          ></input>
          <button
            disabled={loading}
            className="bg-green-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Update"}
          </button>
          <Link
            to="/create-listing"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 my-3 text-center"
          >
            Create Listing
          </Link>
        </form>
        <div className="flex justify-between mt-4">
          <span className="text-red-600 cursor-pointer" onClick={handleDelete}>
            Delete Account
          </span>
          <span className="text-red-600 cursor-pointer" onClick={handleSignOut}>
            Sign Out
          </span>
        </div>
        {error && <span className="text-red-600 py-3">{error}</span>}
        {userSuccess && (
          <span className="text-green-600 py-3">User updated successfully</span>
        )}
      </div>
    </div>
  );
};

export default Profile;
