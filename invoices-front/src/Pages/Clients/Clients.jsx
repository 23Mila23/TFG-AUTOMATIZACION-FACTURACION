import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";

export default function ClientsMain() {
  const { token, user } = useContext(AppContext);
  const [clients, setClients] = useState([]);

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
  useEffect(() => {
    getClients();
  }, []);
  return (
    <>
      <div>
        <div>
          <form action="/createclient" className="create-client-button-container">
            <input
              className="button-17"
              type="submit"
              value="Create Client"
            />
          </form>
        </div>
        {clients.length > 0 ? (
          clients.map((client) => (
            <div key={client.id}>
              <div>
                <div className="clientList-container">
                  <p>
                    <strong>{client.name}</strong>{" "}
                  </p>
                  <p>{client.city}</p>
                  <p>{new Date(client.created_at).toLocaleDateString()}</p>
                  <Link to={`/clients/${client.id}`} className="button-17 clientListButton">Edit</Link>
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
