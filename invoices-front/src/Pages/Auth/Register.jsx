import React from "react";

export default function Register() {
  return (
    <>
      <h1 className="title">Register new account</h1>
      <form>
        <div>
          <input type="text" placeholder="Name"/>
        </div>

        <div>
          <input type="text" placeholder="Email"/>
        </div>

        <div>
          <input type="password" placeholder="Password"/>
        </div>

        <div>
          <input type="password" placeholder="Confirm your password"/>
        </div>

        <button>Register</button>
      </form>
    </>
  );
}
