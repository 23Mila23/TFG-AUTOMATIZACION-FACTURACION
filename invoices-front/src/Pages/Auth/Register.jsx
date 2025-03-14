import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Register() {
  const { setToken } = useContext(AppContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch("/api/register", {
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
        <div className={`form ${
            Object.values(errors).some(error => error && error.length > 0)
              ? "form-errors-expanded"
              : ""
          }`}>
          <div className="form-title">Registro</div>
          <form className="form-inputs-container" onSubmit={handleRegister}>
            <div>
              <div className="input-container ic1">
                <input
                  className="input"
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => {
                    handleChange("name", e);
                  }}
                />
              </div>
              {errors.name ? <p className="error">{errors.name[0]}</p> : ""}
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
              <div className="input-container ic2">
                <input
                  className="input"
                  type="password"
                  placeholder="Password Confirmation"
                  value={formData.password_confirmation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password_confirmation: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="form-btn-container">
              <button className="btn form-btn btn-white btn-animated">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
