import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Main from "./Pages/Main";
import { AppContext } from "./Context/AppContext";
import React, { useContext } from "react";

export default function App() {

  const {user} = useContext(AppContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/register" element={user ? <Main/> : <Register />} />
          <Route path="/login" element={user ? <Main/> : <Login />} />
          <Route path="/main" element={user ? <Main/> : <Home/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
