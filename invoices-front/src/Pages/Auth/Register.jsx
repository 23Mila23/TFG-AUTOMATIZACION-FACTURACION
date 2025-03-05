import React from "react";

export default function Register() {
  return (
    <>
      <div className="form-container">
        <div class="form">
          <div class="form-title">Welcome</div>
          <div class="subtitle">Let's create your account!</div>
          <div class="input-container ic1">
            <input class="input" type="text" placeholder="Name" />
          </div>
          <div class="input-container ic2">
            <input class="input" type="text" placeholder="Email " />
          </div>
          <div class="input-container ic2">
            <input class="input" type="Password" placeholder="Password" />
          </div>

          <div class="input-container ic2">
            <input
              class="input"
              type="Password"
              placeholder="Password Confirmation"
            />
          </div>
          <button type="text" class="submit">
            submit
          </button>
        </div>
      </div>
    </>
  );
}
