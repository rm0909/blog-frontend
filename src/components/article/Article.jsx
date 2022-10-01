import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import pedagogia from "../../assets/pic/pedagogia.png"
function Article() {
  const [data, setData] = useState();
  const params = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    getArticle();
  }, []);
  const getArticle = async () => {
    try {
      const response = await axios(
        `https://backend-tata-blog.up.railway.app/post/${params.id}`
      );
      setData(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <Container as="main" id="article-component">
      <Button className="mb-2" variant="primary" onClick={()=> navigate("/")}>⬅ Voltar</Button>
          {data && (
            <article >
              <div className="pedagogy-pic-box">
                <img src={pedagogia} alt="pedagogia" id="pedagogy-pic" />
              </div>
              <h1 className="text-center" id="article-title">{data.title}</h1>
              <section dangerouslySetInnerHTML={{__html: data.text}} />
            </article>
          )}
    </Container>
  );
}
export { Article };
