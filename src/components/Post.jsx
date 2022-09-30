import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Post() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(
    "https://res.cloudinary.com/cloudrm0909outlook/image/upload/v1664500015/posts/nao%20exclua/Imagem%20de%20post%20padrao.jpg"
  );
  const [posted, setPosted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    checkIfIsLogged();
  }, []);
  const checkIfIsLogged = () => {
    const data = JSON.parse(localStorage.getItem("login"));
    if (!data) return navigate("/admin");
    if (data.login === true) setLogged(true);
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
        setTitle("");
        setText("");
      }
    } catch (error) {
      console.error(error.response.data.message);
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

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
    <main className="component">
      <Form
        className="post-box"
        onSubmit={(e) => {
          handlePost(e);
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>🏷 Título *</Form.Label>
          <Form.Control
            required={true}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Titulo para o seu post"
            value={title}
            className="post-title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>✏ Texto *</Form.Label>
          <ReactQuill
            theme="snow"
            value={text}
            modules={modules}
            required={true}
            placeholder="Digite seu artigo aqui..."
            onChange={setText}
          />
          <Form.Text className="text-muted">Só inclua texto aqui.</Form.Text>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>🖼 Selecione uma imagem para ser a capa do seu post</Form.Label>
          <Form.Control
            onChange={(e) => handleFile(e)}
            type="file"
            className="post-file-input"
            accept="image/png, image/jpeg, image/jpg, image/jfif"
          />
          <Form.Text className="text-muted">Imagem é opcional.</Form.Text>
        </Form.Group>
        <div className="button-row">
          {logged && (
            <Button disabled={loading} variant="success" type="submit">
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
          )}
          <Button onClick={() => navigate("/")}>
            ✈ Ir para a página principal
          </Button>
        </div>
        <ToastContainer position="bottom-start">
          <Toast show={posted} bg="success" onClose={() => setPosted(false)}>
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
