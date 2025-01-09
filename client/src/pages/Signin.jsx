import { Link } from "react-router-dom";
const Signin = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg border"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg border"
        />
        <button className="bg-green-600 text-white py-3 rounded-lg hover:opacity-90 uppercase">
          Signin
        </button>
      </form>
      <div className="flex gap-4 mt-4">
        <p>Don't have an account?</p>
        <Link to="/sign-up" className="text-blue-500 hover:text-red-600">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Signin;
