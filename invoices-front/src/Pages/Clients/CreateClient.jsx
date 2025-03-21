import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Loading from "../../Components/Loading";

export default function CreateClient() {
  const { token } = useContext(AppContext);
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    adress: "",
    postalCode: "",
    city: "",
    CIF: "",
  });

  const [errors, setErrors] = useState({});

  async function handleCreateClient(e) {
    e.preventDefault();
    setIsloading(true);
    const res = await fetch("/api/clients", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/clients");
    }
    setIsloading(false);
  }
  const handleChange = (field, e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="form-container">
        <div
          className={`form__createClient ${
            Object.values(errors).some((error) => error && error.length > 0)
              ? "form-errors-expanded-create-client"
              : ""
          }`}
        >
          <div className="form-title">Create a client</div>
          <form onSubmit={handleCreateClient}>
            <div>
              <div className="input-container ic2">
                <input
                  className="input"
                  type="text"
                  placeholder="name"
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
                  placeholder="adress"
                  value={formData.adress}
                  onChange={(e) => handleChange("adress", e)}
                />
              </div>
              {errors.adress ? <p className="error">{errors.adress[0]}</p> : ""}
              <div className="input-container ic2">
                <input
                  className="input"
                  type="text"
                  placeholder="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleChange("postalCode", e)}
                />
              </div>
              {errors.postalCode ? (
                <p className="error">{errors.postalCode[0]}</p>
              ) : (
                ""
              )}
              <div className="input-container ic2">
                <input
                  className="input"
                  type="text"
                  placeholder="city"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e)}
                />
              </div>
              {errors.city ? <p className="error">{errors.city[0]}</p> : ""}
              <div className="input-container ic2">
                <input
                  className="input"
                  type="text"
                  placeholder="CIF"
                  value={formData.CIF}
                  onChange={(e) => handleChange("CIF", e)}
                />
              </div>
              {errors.CIF ? <p className="error">{errors.CIF[0]}</p> : ""}
            </div>
            <div className="form-btn-container btnCreateClient">
              <button className="btn form-btn btn-white btn-animated">
                Create Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
