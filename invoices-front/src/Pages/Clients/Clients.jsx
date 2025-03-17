import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";

export default function ClientsMain() {
  const { token } = useContext(AppContext);
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [isLoadingDelete, setIsloadingDelete] = useState(false);

  async function getClients() {
    setIsloading(true);
    const res = await fetch("api/clients", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setClients(data);
    }

    setIsloading(false);
  }
  async function handleDelete(id) {
    setIsloadingDelete(true);
    const res = await fetch(`api/clients/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setClients(
        clients.filter((client) => {
          return client.id != id;
        })
      );
    }
    setIsloadingDelete(false);
  }
  useEffect(() => {
    getClients();
  }, []);

  if (isLoading || isLoadingDelete) {
    return <Loading />;
  }
  return (
    <>
      <div>
        <div className="create-client-button-container">
          <button
            className="btn form-btn btn-white btn-animated"
            onClick={() => navigate("/createclient")}
          >
            Create Client
          </button>
        </div>
        {clients.length > 0 ? (
          clients.map((client) => (
            <div key={client.id}>
              <div>
                <div className="clientList-container">
                  <p className="list-elements-large">
                    <strong>{client.name}</strong>
                  </p>
                  <p className="list-elements-large">{client.city}</p>
                  <p className="list-elements">
                    {new Date(client.created_at).toLocaleDateString()}
                  </p>
                  <div className="list-elements">
                    {" "}
                    <Link
                      to={`/clients/edit/${client.id}`}
                      className="btn list-btn  btn-white btn-animated"
                    >
                      Edit
                    </Link>
                  </div>
                  <div className="list-elements">
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="btn list-btn btn-white btn-animated "
                    >
                      Delete
                    </button>
                  </div>
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
