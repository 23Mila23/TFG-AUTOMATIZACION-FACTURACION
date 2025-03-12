import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import SelectClient from "../../Components/SelectClient";

export default function EditInvoice() {
  const { id } = useParams();
  const { token, user } = useContext(AppContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    client_id: "",
    total: "",
  });

  const [errors, setErrors] = useState({});

  async function getInvoice() {
    const res = await fetch(`/api/invoices/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      if (data.invoice.user_id !== user.id) {
        navigate("/main");
      }
      setFormData({
        client_id: data.invoice.client_id,
        total: data.invoice.total,
      });
    }
  }

  async function handleEditInvoice(e) {
    e.preventDefault();
    const res = await fetch(`/api/invoices/${id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data);

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

  useEffect(() => {
    getInvoice();
  }, []);
  return (
    <>
      <div className="form-container">
        <div className="form__createClient">
          <div className="form-title">Edit Invoice</div>
          <form onSubmit={handleEditInvoice}>
            <div className="input-container ic2">
              <SelectClient
                onClientSelect={(id) =>
                  setFormData({ ...formData, client_id: id })
                }
                selectedClientId={formData.client_id}
              />
            </div>
            {errors.client_id ? (
              <p className="error">{errors.client_id[0]}</p>
            ) : (
              ""
            )}
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
            <button className="submit">Edit</button>
          </form>
        </div>
      </div>
    </>
  );
}
