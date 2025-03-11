import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import SelectClient from "../../Components/SelectClient";

export default function CreateInvoice() {
  const { token} = useContext(AppContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    client_id: "",
    total: "",
  });

  const [errors, setErrors] = useState({});

  async function handleCreateInvoice(e) {
    e.preventDefault();
    const res = await fetch("/api/invoices", {
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
      navigate("/invoices");
    }
  }
  const handleChange = (field, e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" });
  };
  return (
    <>
      <div className="form-container">
        <div className="form__createInvoice">
          <div className="form-title">New Invoice</div>
          <form onSubmit={handleCreateInvoice}>
            <div className="input-container ic2">
              <SelectClient onClientSelect={(id) => setFormData({...formData, client_id: id})}
              />
            </div>
            {errors.client_id ? <p className="error">{errors.client_id[0]}</p> : ""}
            <div className="input-container ic2">
              <input
                className="input"
                type="text"
                placeholder="total"
                value={formData.total}
                onChange={(e) => handleChange("total", e)}
              />
            </div>
            {errors.total ? <p className="error">{errors.total[0]}</p> : ""}
            
            <button className="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
