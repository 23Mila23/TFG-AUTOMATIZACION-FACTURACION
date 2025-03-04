import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>
        <div className="nav-home-container">
          <div>
            <nav className="nav-link">
              <Link to="/">Home</Link>
            </nav>
          </div>
        </div>
        <div className="nav-link-container">
          <nav className="nav-link">
            <Link to="/login">Login</Link>
          </nav>
          <nav className="nav-link">
            <Link to="/logout">Logout</Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
