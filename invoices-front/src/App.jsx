import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Main from "./Pages/Main";
import { AppContext } from "./Context/AppContext";
import React, { useContext } from "react";
import Invoices from "./Pages/Invoices/Invoices";
import Clients from "./Pages/Clients/Clients";
import CreateClient from "./Pages/Clients/CreateClient";
import Edit from "./Pages/Clients/EditClient";
import CreateInvoice from "./Pages/Invoices/CreateInvoice";
import EditInvoice from "./Pages/Invoices/EditInvoice";
import Loading from "./Components/Loading";

export default function App() {
  const { user, userIsLoading } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout userIsLoading={userIsLoading} />}>
          <Route index element={<Home />} />
          <Route path="/register" element={user ? <Main /> : <Register />} />
          <Route path="/login" element={user ? <Main /> : <Login />} />

         
            <Route path="/main" element={user ? <Main /> : <Home />} />
            <Route path="/clients" element={user ? <Clients /> : <Home />} />
            <Route
              path="/createclient"
              element={user ? <CreateClient /> : <Home />}
            />
            <Route
              path="/clients/edit/:id"
              element={user ? <Edit /> : <Home />}
            />
            <Route path="/invoices" element={<Invoices />} />
            <Route
              path="/createinvoice"
              element={user ? <CreateInvoice /> : <Home />}
            />
            <Route
              path="/invoices/edit/:id"
              element={user ? <EditInvoice /> : <Home />}
            />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
