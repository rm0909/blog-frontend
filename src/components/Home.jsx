import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import pic from "../assets/pic/thais.jpeg";
import { CardComponent } from "./card/CardComponent.jsx";

function Home() {
  const [logged, setLogged] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getPosts();
    checkIfIsLogged();
  }, [, deleted]);
  let navigate = useNavigate();
  const getPosts = async () => {
    try {
      const response = await axios.get(
        "https://backend-tata-blog.up.railway.app/post/"
      );
      const {posts} = response.data
      if (posts) setData(posts);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  const checkIfIsLogged = () => {
    const data = JSON.parse(localStorage.getItem("login"));
    if (!data) return;
    if (data.login === true) setLogged(true);
  };
  const handleDelete = () => {
    setDeleted(true);
    setTimeout(() => setDeleted, 1500);
  };
  return (
    <Container as="main" id="home-component">
      <Row>
        <Col className="card-container p-4 my-2">
          <Row>
            {data &&
              data.map((card) => {
                return (
                  <Col className="mb-2">
                    <CardComponent
                      key={card._id}
                      id={card._id}
                      title={card.title}
                      image={card.image}
                      createdAt={card.createdAt}
                      logged={logged}
                      delete={handleDelete}
                    />
                  </Col>
                );
              })}
          </Row>
        </Col>
        <Col as="aside" className="profile-col p-4 mt-2" lg={3}>
          <div className="center-col">
            <div className="pic-box mb-2">
              <img src={pic} alt="pic" />
            </div>
            <h4 className="text-center">Thaís Martins</h4>
            <p>Bem-vindos ao meu blog!</p>
          </div>
          <div>
           {logged && <Button variant="success"size="sm" onClick={() => navigate("/post")}>
             📩 Novo post.
            </Button>}
          </div>
        </Col>
      </Row>
      <ToastContainer position="bottom-end">
        <Toast show={deleted} bg="danger" onClose={() => setDeleted(false)}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Post deletado!</strong>
            <small>agora</small>
          </Toast.Header>
          <Toast.Body>Esse post foi removido do banco de dados.</Toast.Body>
        </Toast>
      </ToastContainer>
      
    </Container>
  );
}

export { Home };
