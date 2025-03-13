import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();

    const res = await fetch("/api/logout", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate("/");
    }
  }
  return (
    <>
      <div className="container">
        {user ? (
          <header class="header">
            <div className="header-container">
              <div>
                <div class="brand-box">
                  <button
                    onClick={handleLogout}
                    className="btn btn-white btn-animated"
                  >
                    Logout
                  </button>
                </div>
              </div>

              <div class="text-box">
                <h1 class="heading-primary">
                  <span class="heading-primary-main">INVOSync</span>
                  <span class="heading-primary-sub">Invoice Automation</span>
                </h1>
                <a href="/main" class="btn btn-white btn-animated">
                  Home
                </a>
              </div>
            </div>
          </header>
        ) : (
          <header class="header">
            <div className="header-container">
                <div class="brand-box">
                  <a href="/login" class="btn btn-white btn-animated">
                    Login
                  </a>
                </div>
              <div class="text-box">
                <h1 class="heading-primary">
                  <span class="heading-primary-main">INVOSync</span>
                  <span class="heading-primary-sub">Invoice Automation</span>
                </h1>
                <a href="/" class="btn btn-white btn-animated">
                  Home
                </a>
              </div>
            </div>
          </header>
        )}
        <main className="main">
          <Outlet />
        </main>
      </div>
    </>
  );
}
