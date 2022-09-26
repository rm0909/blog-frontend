import { useEffect, useState } from "react";
function Home() {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    checkIfIsLogged();
  }, []);
  const checkIfIsLogged = () => {
    const data = JSON.parse(localStorage.getItem("login"));
    if (!data) return
    if (data.login === true) setLogged(true);
  };
  return <main className="component">{logged ? <h1>Olá Thaís</h1> : null}</main>;
}

export { Home };
