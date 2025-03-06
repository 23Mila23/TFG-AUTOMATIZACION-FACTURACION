import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

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
      localStorage.setItem('token', data.token)
      navigate("/main")
      console.log(data);
    }
  }
  const handleChange = (field, e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" });
  };
  return (
    <>
      <div className="form-container">
        <div className="form">
          <div className="form-title">Registro</div>
          <form onSubmit={handleRegister}>
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
                onChange={(e) =>
                  handleChange("password", e)
                }
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
            <button className="submit">submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
