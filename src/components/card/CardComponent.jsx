import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom"
import axios from "axios";
import { useState } from "react";
function CardComponent(props) {
  const [date] = useState(new Date(props.createdAt).toLocaleDateString());
  
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
    <Card className="card" border="primary" >
      <Card.Img variant="top" src={props.image} className="card-image"/>
      <Card.Body>
        <Card.Title className="text-center"><h2>{props.title}</h2></Card.Title>
        <Card.Text className="text-center">
         <Link to={`/artigo/${props.id}`}>Ler artigo.</Link> 
          </Card.Text>
        <Card.Footer className="text-center">
          <small className="text-muted">📆{date}</small>{" "}
          {props.logged && (
            <Button size="sm" variant="danger" onClick={deletePost}>
              🗑 Excluir
            </Button>
          )}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}
export { CardComponent };
