import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <div className="max-w-lg mx-auto p-3">
        <form className="flex flex-col ">
          <img
            src={currentUser.avatar}
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          ></img>
          <input
            type="text"
            placeholder="username"
            id="username"
            className="border p-3 my-3 rounded-lg"
          ></input>
          <input
            type="email"
            placeholder="email"
            id="email"
            className="border p-3 my-3 rounded-lg"
          ></input>
          <input
            type="password"
            placeholder="password"
            id="password"
            className="border p-3 my-3 rounded-lg"
          ></input>
          <button className="bg-green-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-50">
            Update
          </button>
        </form>
        <div className="flex justify-between mt-4">
          <span className="text-red-600 cursor-pointer">Delete Account</span>
          <span className="text-red-600 cursor-pointer">Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
