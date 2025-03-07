import React from "react";
import { AppContext } from "../Context/AppContext";

export default function Main() {


  return (
    <>
     <div className="main-container">
        <div className= "main-options-container">
          <div>
            <form action="/clients">
              <input className="button-17 mainButton" type="submit" value="Clients" />
            </form>
          </div>

          <div>
            <form action="/invoices">
              <input className="button-17 mainButton" type="submit" value="Invoices" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
