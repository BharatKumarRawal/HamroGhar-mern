import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center p-3 max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-red-500">Hamro</span>
            <span className="text-slate-700">Ghar</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          ></input>
          <FaSearch className="text-slate-700" />
        </form>
        <ul className="flex gap-4 font-semibold">
          <li className="hidden sm:inline text-slate-600 hover:underline hover:text-red-700">
            <Link to="/">Home</Link>
          </li>
          <li className="hidden sm:inline text-slate-600 hover:underline  hover:text-red-700">
            <Link to="/about">About</Link>
          </li>
          <li className="hidden sm:inline text-slate-600 hover:underline  hover:text-red-700">
            <Link to="/sign-in">Sign in</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
