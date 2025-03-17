import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const locationLogin = useLocation();
  const location = useLocation();
  const isCreateClientPage = location.pathname === "/createclient";
  const isCreateInvoicePage = location.pathname === "/createinvoice";
  const isEditClientPage = /^\/clients\/edit\/\d+$/.test(location.pathname);
  const isEditInvoicePage = /^\/invoices\/edit\/\d+$/.test(location.pathname);
  

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
                    className="btn form-btn btn-white btn-animated"
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
                <button
                  onClick={() => navigate("/main")}
                  className="btn form-btn btn-white btn-animated"
                >
                  Home
                </button>
                {isCreateClientPage && (
                  <button
                    onClick={() => navigate("/clients")}
                    className="btn form-btn btn-white btn-animated"
                  >
                    View Clients
                  </button>
                )}
                 {isEditClientPage && (
                  <button
                    onClick={() => navigate("/clients")}
                    className="btn form-btn btn-white btn-animated"
                  >
                    View Clients
                  </button>
                )}
                {isCreateInvoicePage && (
                  <button
                    onClick={() => navigate("/invoices")}
                    className="btn form-btn btn-white btn-animated"
                  >
                    View Invoices
                  </button>
                )}
                {isEditInvoicePage && (
                  <button
                    onClick={() => navigate("/invoices")}
                    className="btn form-btn btn-white btn-animated"
                  >
                    View invoices
                  </button>
                )}
              </div>
            </div>
          </header>
        ) : (
          <header className="header">
            <div className="header-container">
              <div className="brand-box">
                {locationLogin.pathname !== "/login" && (
                  <button
                    onClick={() => navigate("/login")}
                    className="btn form-btn btn-white btn-animated"
                  >
                    Login
                  </button>
                )}
              </div>
              <div className="text-box">
                <h1 className="heading-primary">
                  <span className="heading-primary-main">INVOSync</span>
                  <span className="heading-primary-sub">
                    Invoice Automation
                  </span>
                </h1>
                <button
                  onClick={() => navigate("/")}
                  className="btn form-btn btn-white btn-animated"
                >
                  Home
                </button>
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
