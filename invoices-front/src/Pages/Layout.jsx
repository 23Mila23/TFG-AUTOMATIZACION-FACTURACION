import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user } = useContext(AppContext);
  console.log(user)
  return (
    <>
      <header>
        <div className="header-container">
          <div className="nav-home-container">
            <div>
              <nav className="nav-link">
                <Link to="/">Home</Link>
              </nav>
            </div>
          </div>
          {user ? (
            <div className="nav-link-container">
              <div>
                <p>Welcome {user.name} </p>
                </div>
              <nav className="nav-link">
                <Link to="/logout">Logout</Link>
              </nav>
            </div>
          ) : (
            <div className="nav-link-container">
              <nav className="nav-link">
                <Link to="/login">Login</Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
