import React from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  return (
    <>
      <div className="main-container">
        <div className="main-options-container">
          <div>
            <button
              className="button-17 mainButton"
              onClick={() => navigate("/clients")}
              value="Clients"
            >Clients</button>
          </div>

          <div>
            <button
              className="button-17 mainButton"
              onClick={() => navigate("/invoices")}
              value="Invoices"
            >Invoices</button>
          </div>
        </div>
      </div>
    </>
  );
}
