import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect } from "react";
function CardComponent(props) {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(new Date(props.createdAt).toLocaleDateString());
    console.log(date);
  }, []);
  const deletePost = async () => {
    try {
      const response = await axios.delete(
        `https://backend-tata-blog.up.railway.app/post/${props.id}`
      );
      console.log(response);
      console.log(props.id);
      props.delete();
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  return (
    <Card className="card" border="primary">
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title className="text-center">{props.title}</Card.Title>
        <Card.Text
          className="d-flex flex-row 
          align-items-center justify-content-around"
        >
          🗓 criado em {date}
          {/* <Button size="md" variant="secondary">
            Acessar post
          </Button> */}
        </Card.Text>
        {props.logged && (
          <Card.Footer className="text-center">
            <Button size="sm" variant="danger" onClick={deletePost}>
              🗑 Excluir
            </Button>
          </Card.Footer>
        )}
      </Card.Body>
    </Card>
  );
}
export { CardComponent };
