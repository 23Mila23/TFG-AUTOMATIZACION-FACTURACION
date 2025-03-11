import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";

export default function InvoicesMain() {
  const { token, } = useContext(AppContext);
  const [invoices, setInvoices] = useState([]);

  async function getInvoices() {
    const res = await fetch("api/invoices", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setInvoices(data);
    }
  }
  async function handleDelete(id){
    const res = await fetch(`api/invoices/${id}`,{
      method: 'delete',
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });
    const data = await res.json();
    if(res.ok){
      setInvoices(invoices.filter((invoice) => {
        return invoice.id != id;
      }))
    }
    console.log(data);
  }
  useEffect(() => {
    getInvoices();
  }, []);
  return (
    <>
      <div>
        <div>
          <form action="/createinvoice" className="create-client-button-container">
            <input
              className="button-17"
              type="submit"
              value="New invoice"
            />
          </form>
        </div>
        {invoices.length > 0 ? (
          invoices.map((invoice) => (
            <div key={invoice.id}>
              <div>
                <div className="clientList-container">
                  <p>
                    <strong>{invoice.id}</strong>
                  </p>
                  <p>{invoice.client_id}</p>
                  <p>{invoice.total}</p>
                  <p>{new Date(invoice.created_at).toLocaleDateString()}</p>
                  <Link to={`/clients/edit/${invoice.id}`} className="button-17 clientListButton">Edit</Link>
                    <button onClick={() => handleDelete(invoice.id)} className="button-17 clientListButton">Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-content">
            <p>There are no invoices created</p>
          </div>
        )}
      </div>
    </>
  );
}
