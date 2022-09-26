import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Post() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [posted, setPosted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    checkIfIsLogged();
  }, []);
  const checkIfIsLogged = () => {
    const data = JSON.parse(localStorage.getItem("login"));
    if (data.login === true) setLogged(true)
    else {navigate("/admin")};
  };
  const handlePost = (e) => {
    e.preventDefault();
    postArticle();
  };
  const postArticle = async () => {
    try {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
      checkType();
      const post = await axios.post(
        "https://backend-tata-blog.up.railway.app/post/new",
        {
          title: title,
          text: text,
          image: image,
        }
      );
      if (post.status === 200) {
        setPosted(true);
        setLoading(false);
        console.log(post);
      }
    } catch (error) {
      throw error;
    }
  };
  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);
  };
  const handleFile = (e) => {
    const file = e.target.files[0];
    previewFiles(file);
  };
  const checkType = () => {
    if (
      typeof title !== "string" ||
      typeof text !== "string" ||
      typeof image !== "string" ||
      !title ||
      !text
    ) {
      return alert("Preencha os campos corretamente!");
    }
  };
  return (
    <main className="component">
      <Form className="post-box">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>🏷 Título *</Form.Label>
          <Form.Control
            required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Titulo para o seu post"
            className="post-title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>✏ Texto *</Form.Label>
          <Form.Control
            required
            onChange={(e) => setText(e.target.value)}
            className="post-textarea"
            type="text"
            as={"textarea"}
            placeholder="Digite seu texto aqui..."
          />
          <Form.Text className="text-muted">Só inclua texto aqui.</Form.Text>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>🖼 Selecione uma imagem para ser capa</Form.Label>
          <Form.Control
            onChange={(e) => handleFile(e)}
            type="file"
            className="post-file-input"
            accept="image/png, image/jpeg, image/jpg, image/jfif"
          />
          <Form.Text className="text-muted">Imagem é opcional.</Form.Text>
        </Form.Group>
        <div className="button-row">
          <Button
            disabled={loading}
            variant="primary"
            type="submit"
            onClick={(e) => handlePost(e)}
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
            {!loading ? "📮 Enviar" : "⏳ Carregando"}
          </Button>
          <Button onClick={() => navigate("/")}>
            ✈ Ir para a página principal
          </Button>
        </div>
        <ToastContainer position="bottom-end">
          <Toast show={posted} bg="success">
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Post enviado!</strong>
              <small>agora</small>
            </Toast.Header>
            <Toast.Body>
              O seu novo post aparecerá na página principal!
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Form>
    </main>
  );
}
export { Post };
