import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function Article() {
  const [data, setData] = useState();
  const params = useParams();
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
      <Row>
        <Col>
          {data && (
            <article >
              <h1 className="text-center">{data.title}</h1>
              <p>{data.text}</p>
            </article>
          )}
        </Col>
      </Row>
    </Container>
  );
}
export { Article };
