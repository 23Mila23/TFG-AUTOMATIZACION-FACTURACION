import { useContext, useEffect } from "react";
import { AppContext } from "../../../Context/AppContext";

export default function Clients() {
  const { token, user } = useContext(AppContext);

  async function getPosts() {
    const res = await fetch('api/clients',{
     headers: {
        Authorization: `Bearer ${token}`,
      }, 
    })
    const data = await res.json();

    console.log(data);
  }

  useEffect(() =>{
    getPosts();
  }, [])
  return (
    <>
      <div>
        <div>
          <h1>Clients Page</h1>
        </div>
        <div>
          <form action="/createclient">
            <input
              className="button-17 mainButton"
              type="submit"
              value="Create Client"
            />
          </form>
        </div>
      </div>
    </>
  );
}
