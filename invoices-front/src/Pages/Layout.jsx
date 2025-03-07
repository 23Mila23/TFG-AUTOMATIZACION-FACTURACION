import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate()
  
  async function handleLogout(e){

    e.preventDefault();

    const res = await fetch('/api/logout', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    const data = await res.json()
    console.log(data);

    if(res.ok){
      setUser(null)
      setToken(null)
      localStorage.removeItem("token");
      navigate('/');
    }


  }
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
                <p className="text-header">Welcome {user.name} </p>
                </div>
              <form onSubmit={handleLogout}>
                <button className="nav-link">Logout</button>
              </form>
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
