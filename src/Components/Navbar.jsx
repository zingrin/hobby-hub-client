import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";

import ThemeToggle from "../Components/ThemeToggle";
import {
  Home,
  LogOut,
  Menu,
  Plus,
  User,
  Users,
} from "lucide-react";
import AuthContext from "../Context/Context/Contex";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-full bg-[#F98334] p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-white"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </div>
          <span className="text-xl font-bold">HobbyHub</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link
            to="/"
            className="text-sm font-medium hover:text-hobbyhub-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/groups"
            className="text-sm font-medium hover:text-hobbyhub-600 transition-colors"
          >
            All Groups
          </Link>
          {user && (
            <>
              <Link
                to="/create-group"
                className="text-sm font-medium hover:text-hobbyhub-600 transition-colors"
              >
                Create Group
              </Link>
              <Link
                to="/my-groups"
                className="text-sm font-medium hover:text-hobbyhub-600 transition-colors"
              >
                My Groups
              </Link>
            </>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {user ? (
            <div style={{ position: "relative" }}>
              {/* Avatar Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="User menu"
                style={{
                  borderRadius: "50%",
                  height: 40,
                  width: 40,
                  padding: 0,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: "50%",
                      backgroundColor: "#ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      color: "#555",
                      userSelect: "none",
                    }}
                  >
                    {user.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </button>

              {/* Dropdown */}
              {isOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    marginTop: 8,
                    width: 220,
                    background: "white",
                    boxShadow:
                      "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)",
                    borderRadius: 6,
                    zIndex: 1000,
                  }}
                >
                  <div
                    style={{
                      padding: 12,
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: 14,
                        margin: 0,
                      }}
                    >
                      {user.name}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#666",
                        margin: 0,
                      }}
                    >
                      {user.email}
                    </p>
                  </div>
                  <nav
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "8px 0",
                    }}
                  >
                    <Link
                      to="/my-groups"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 12px",
                        textDecoration: "none",
                        color: "black",
                        fontSize: 14,
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      <User style={{ marginRight: 8, width: 16, height: 16 }} />
                      My Groups
                    </Link>
                    <Link
                      to="/create-group"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 12px",
                        textDecoration: "none",
                        color: "black",
                        fontSize: 14,
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      <Plus style={{ marginRight: 8, width: 16, height: 16 }} />
                      Create Group
                    </Link>
                    <hr style={{ margin: "8px 0", borderColor: "#eee" }} />
                    <button
                    className="bg-[#F98334]"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 12px",
                        width: "100%",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: 14,
                        color: "black",
                        textAlign: "left",
                      }}
                    >
                      <LogOut
                        style={{ marginRight: 8, width: 16, height: 16 }}
                      />
                      Log out
                    </button>
                  </nav>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden  md:inline-block px-4 py-2 rounded-md bg-primary text-white bg-[#F98334]"
            >
              Log in
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent"
          >
            <Menu style={{ width: 24, height: 24 }} />
          </button>

          {/* Mobile menu panel */}
          {isOpen && (
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                height: "100vh",
                width: 280,
                background: "white",
                boxShadow:
                  "-4px 0 8px rgba(0,0,0,0.1), -1px 0 2px rgba(0,0,0,0.06)",
                padding: 20,
                display: "flex",
                flexDirection: "column",
                zIndex: 1500,
              }}
            >
              <nav
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <Home style={{ width: 16, height: 16 }} />
                  Home
                </Link>
                <Link
                  to="/groups"
                  onClick={() => setIsOpen(false)}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <Users style={{ width: 16, height: 16 }} />
                  All Groups
                </Link>

                {user ? (
                  <>
                    <Link
                      to="/create-group"
                      onClick={() => setIsOpen(false)}
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <Plus style={{ width: 16, height: 16 }} />
                      Create Group
                    </Link>
                    <Link
                      to="/my-groups"
                      onClick={() => setIsOpen(false)}
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <User style={{ width: 16, height: 16 }} />
                      My Groups
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 12px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 14,
                        color: "black",
                        justifyContent: "flex-start",
                      }}
                    >
                      <LogOut style={{ width: 16, height: 16 }} />
                      Log out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#007bff",
                      color: "white",
                      borderRadius: 4,
                      textAlign: "center",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Log in
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
