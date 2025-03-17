import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [userIsLoading, setUserIsLoading] = useState(false);

  async function getUser() {
    setUserIsLoading(true)
    const res = await fetch("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    if(res.ok){
      setUser(data);
    }

    setUserIsLoading(false)
  }

  useEffect(() => {
    console.log(token,user)
    if (token && !user) {
      getUser();
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser, userIsLoading }}>
      {children}
    </AppContext.Provider>
  );
}
