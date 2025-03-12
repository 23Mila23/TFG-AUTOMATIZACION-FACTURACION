import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { AppContext } from "../Context/AppContext";

export default function SelectClient({onClientSelect, selectedClientId}) {
  const { token } = useContext(AppContext);
  const [clients, setClients] = useState([]);

  async function getClients() {
    const res = await fetch("/api/clients", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("Clientes recibidos:", data);

    const clientsResult = data.map((client) => ({
      label: client.name,
      value: client.id,
    }));
    if (res.ok) {
      setClients(clientsResult);
    }
  }

  const selectedClient = clients.find(client => client.value === selectedClientId) || null;

  useEffect(() => {
    getClients();
  }, []);
  return (
    <div>
        
      <Select  options={clients} onChange={(option) => onClientSelect(option.value)} value={selectedClient} />
    </div>
  );
}
