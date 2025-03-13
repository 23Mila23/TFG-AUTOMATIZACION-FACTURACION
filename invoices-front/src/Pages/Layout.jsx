import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const locationLogin = useLocation();

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
          <header className="header">
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

              <div className="text-box">
                <h1 className="heading-primary">
                  <span className="heading-primary-main">INVOSync</span>
                  <span className="heading-primary-sub">
                    Invoice Automation
                  </span>
                </h1>
                <a href="/main" className="btn btn-white btn-animated">
                  Home
                </a>
              </div>
            </div>
          </header>
        ) : (
          <header className="header">
            <div className="header-container">
              <div className="brand-box">
                {locationLogin.pathname !== "/login" && (
                  <a href="/login" class="btn btn-white btn-animated">
                    Login
                  </a>
                )}
              </div>
              <div className="text-box">
                <h1 className="heading-primary">
                  <span className="heading-primary-main">INVOSync</span>
                  <span className="heading-primary-sub">
                    Invoice Automation
                  </span>
                </h1>
                <a href="/" className="btn btn-white btn-animated">
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
