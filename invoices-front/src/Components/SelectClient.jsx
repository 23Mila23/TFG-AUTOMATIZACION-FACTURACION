import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { AppContext } from "../Context/AppContext";

export default function SelectClient({onClientSelect}) {
  const { token } = useContext(AppContext);
  const [clients, setClients] = useState([]);

  async function getClients() {
    const res = await fetch("api/clients", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    const clientsResult = data.map((client) => ({
      label: client.name,
      value: client.id,
    }));
    if (res.ok) {
      setClients(clientsResult);
    }
  }

  const handleSelectChange = ({value}) => {
    onClientSelect(value);
  };

  useEffect(() => {
    getClients();
  }, []);
  return (
    <div>
        
      <Select defaultValue={{label: 'Select a client'}} options={clients} onChange={handleSelectChange} />;
    </div>
  );
}
