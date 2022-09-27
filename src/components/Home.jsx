import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
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
  const getPosts = async () => {
    try {
      const response = await axios.get(
        "https://backend-tata-blog.up.railway.app/post/"
      );
      setData(response.data.posts);
      console.log(data);
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
    <Container as="main" id="home-component" className="pt-2">
      <Row>
        <Col className="cola" lg={9}>
          {data &&
            data.map((card) => {
              return (
                <CardComponent
                  key={card._id}
                  id={card._id}
                  title={card.title}
                  image={card.image}
                  createdAt={card.createdAt}
                  logged={logged}
                  delete={handleDelete}
                />
              );
            })}
        </Col>
        <Col as="aside" className="colb ">
          <Col className="mb-4 profile-box">
            <div className="pic-box">
              <img src={pic} alt="pic" />
            </div>
            <h4 className="text-center">Thaís Martins</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </Col>
          <Col as="aside" className="recent-posts mt-4">
            <Stack>
              <h6 className="text-center">Últimas postagens</h6>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </Stack>
          </Col>
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
            <small>now</small>
          </Toast.Header>
          <Toast.Body>Esse post foi removido do banco de dados.</Toast.Body>
        </Toast>
      </ToastContainer>
      <footer>
        <a href="https://rm0909portfolio.netlify.app/">
          Feito por Raphael Machado
        </a>
        <br />
        <a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>
      </footer>
    </Container>
  );
}

export { Home };
