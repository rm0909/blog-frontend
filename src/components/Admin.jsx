import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [send, setSend] = useState(false);
  const [correct, setCorrect] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    console.log(send, correct);
  }, [send]);
  const handleClick = (e) => {
    e.preventDefault();
    loginAdmin();
  };
  const loginAdmin = async () => {
    try {
      const post = await axios.post(
        `https://backend-tata-blog.up.railway.app/user/login`,
        {
          email: email,
          password: password,
        }
      );
      if (post.status === 200) {
        setCorrect(true);
        setTimeout(() => navigate("/post"), 2000);
      }
    } catch (error) {
      console.log("post error", error);
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email de adm"
              />
              <Form.Text className="text-muted">
                Digite sua conta de administradora.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Senha"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleClick(e)}
            >
              Confirmar
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
            login e senha corretas!
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
