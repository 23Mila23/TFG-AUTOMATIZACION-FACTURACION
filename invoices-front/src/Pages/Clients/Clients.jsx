import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export default function ClientsMain() {
  const { token, } = useContext(AppContext);
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  async function getClients() {
    const res = await fetch("api/clients", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setClients(data);
    }
  }
  async function handleDelete(id){
    const res = await fetch(`api/clients/${id}`,{
      method: 'delete',
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });
    const data = await res.json();
    if(res.ok){
      setClients(clients.filter((client) => {
        return client.id != id;
      }))
    }
    console.log(data);
  }
  useEffect(() => {
    getClients();
  }, []);
  return (
    <>
      <div>
        <div className="create-client-button-container">
            <button
              className="button-17"
              onClick={()=>navigate("/createclient")}
            >Create Client</button>
        </div>
        {clients.length > 0 ? (
          clients.map((client) => (
            <div key={client.id}>
              <div>
                <div className="clientList-container">
                  <p>
                    <strong>{client.name}</strong>
                  </p>
                  <p>{client.city}</p>
                  <p>{new Date(client.created_at).toLocaleDateString()}</p>
                  <Link to={`/clients/edit/${client.id}`} className="button-17 clientListButton">Edit</Link>
                    <button onClick={() => handleDelete(client.id)} className="button-17 clientListButton">Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-content">
            <p>There are no clients registered</p>
          </div>
        )}
      </div>
    </>
  );
}
