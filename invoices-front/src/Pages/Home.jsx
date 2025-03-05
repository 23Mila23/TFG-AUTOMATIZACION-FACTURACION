import React from "react";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <div>
          <h1 className="title">Welcome</h1>
        </div>
        <div className="home-registro-container">
          <div>
            <form action="/register">
              <input className="button-17" type="submit" value="Register" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
