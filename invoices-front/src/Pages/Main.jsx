import React from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  return (
    <>
      <div className="main-container">
        <section class="cards-home-wrapper">
          <div class="card-grid-space">
            <a class="card" href="#">
              <div>
                <h1>Clients</h1>
                <p>Manage your clients</p>
                <div class="tags">
                  <button
                    className="tag"
                    onClick={() => navigate("/clients")}
                    value="clients"
                  >
                    Clients
                  </button>
                </div>
              </div>
            </a>
          </div>
        </section>

        <section class="cards-home-wrapper">
          <div class="card-grid-space">
            <a class="card" href="#">
              <div>
                <h1>Invoices</h1>
                <p>Manage your invoices</p>
                <div class="tags">
                  <button
                    className="tag"
                    onClick={() => navigate("/invoices")}
                    value="invoices"
                  >
                    Invoices
                  </button>
                </div>
              </div>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
