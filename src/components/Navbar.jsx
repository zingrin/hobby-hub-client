import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navLinks = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/groups">All Groups</Link></li>
      {user && (
        <>
          <li><Link to="/create-group">Create Group</Link></li>
          <li><Link to="/my-groups">My Groups</Link></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Start - Logo + Mobile Dropdown */}
      <div className="navbar-start">
        {/* Mobile Dropdown Button */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
            {navLinks}
          </ul>
        </div>

        {/* Logo / Site Name */}
        <Link to="/" className="text-2xl font-bold text-primary">HobbyHub</Link>
      </div>

      {/* Center - Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {navLinks}
        </ul>
      </div>

      {/* End - Auth Controls */}
      <div className="navbar-end">
        {!user ? (
          <Link to="/login" className="btn btn-outline btn-sm">Login / Register</Link>
        ) : (
          <div className="flex items-center gap-3">
            <div className="tooltip tooltip-bottom" data-tip={user.displayName || "User"}>
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border border-primary"
              />
            </div>
            <button onClick={logout} className="btn btn-sm btn-error">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
