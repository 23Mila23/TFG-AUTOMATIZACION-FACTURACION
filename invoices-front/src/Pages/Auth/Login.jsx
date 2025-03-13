import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Login() {
  const { setToken } = useContext(AppContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/main");
    }
  }
  const handleChange = (field, e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" });
  };
  return (
    <>
      <div className="form-container">
        <div className={`form__login ${Object.keys(errors).length > 0 ?  "form-errors-expanded-login" : ""}`}>
          <div className="form-title">Login to your account</div>
          <form className="form-inputs-container" onSubmit={handleLogin}>
            <div>
              <div className="input-container ic2">
                <input
                  className="input"
                  type="text"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => {
                    handleChange("email", e);
                  }}
                />
              </div>
              {errors.email ? <p className="error">{errors.email[0]}</p> : ""}
              <div className="input-container ic2">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e)}
                />
              </div>
              {errors.password ? (
                <p className="error">{errors.password[0]}</p>
              ) : (
                ""
              )}
            </div>
            <div className="form-btn-container">
              <button className="btn form-btn btn-white btn-animated">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
