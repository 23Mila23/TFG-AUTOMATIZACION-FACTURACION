import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Main from "./Pages/Main";
import { AppContext } from "./Context/AppContext";
import React, { use, useContext } from "react";
import Clients from "./Pages/Auth/Clients/Clients";
import Invoices from "./Pages/Invoices";
import CreateClient from "./Pages/Auth/Clients/CreateClient";

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
          <Route path="/clients" element={user ? <Clients/> : <Home/>} />
          <Route path="/createclient" element={user ? <CreateClient/> : <Home/>} />
          <Route path="/invoices" element={<Invoices/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
