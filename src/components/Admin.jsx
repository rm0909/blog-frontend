import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';


function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [send, setSend] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("login"));
    if (!storage) return;
    if (storage.login === true) navigate("/post");
  }, [,correct]);
  const handleClick = (e) => {
    e.preventDefault();
    loginAdmin();
  };
  const loginAdmin = async () => {
    try {
      setLoading(true);
      
      const post = await axios.post(
        `https://backend-tata-blog.up.railway.app/user/login`,
        {
          email: email,
          password: password,
        }
      );
      if (post.status === 200) {
        console.log(post);
        setLoading(false);
        setCorrect(true);
        const data = { login: true };
        localStorage.setItem("login", JSON.stringify(data));
        // DESCOMENTE setTimeout(() => navigate("/post"), 2000);
      }
      setTimeout(() => setLoading(false), 2000);
    } catch (error) {
      console.error("post error", error);
    }
    setSend(true);
  };
  return (
    <main className="component">
      {" "}
      <Form className="form-box">
        {!correct && (
          <>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>📧Email</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email de administradora"
              />
              <Form.Text className="text-muted">
                Digite a conta que eu te passei 😁.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>🔒Senha</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Senha"
              />
            </Form.Group>

            <Button
            disabled={loading}
              variant="primary"
              type="submit"
              onClick={(e) => handleClick(e)}
            >
              {loading && (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {!loading ? "Confirmar" : "Carregando"}
            </Button>
          </>
        )}

        {correct && send && (
          <Alert
            show={send}
            variant="success"
            style={{
              backgroundColor: "#52C569",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            login e senha corretas! ✔
          </Alert>
        )}
        {send && !correct && (
          <Alert
            show={send}
            variant="danger"
            style={{
              backgroundColor: "#E05F60",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            login ou senha incorreto!
          </Alert>
        )}
      </Form>
    </main>
  );
}
export { Admin };
