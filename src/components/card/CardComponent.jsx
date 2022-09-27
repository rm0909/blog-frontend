import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
function CardComponent(props) {
  
  const deletePost = async () => {
    try {
      const response = await axios.delete(
        `https://backend-tata-blog.up.railway.app/post/${props.id}`
      );
      console.log(response);
      console.log(props.id)
      props.delete()
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  return (
    <Card className="card">
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text
          className="d-flex flex-row 
          align-items-center justify-content-around"
        >
          {/* <Button size="md" variant="secondary">
            Acessar post
          </Button> */}
          {props.logged && (
            <Button size="sm" variant="danger" onClick={deletePost}>
             🗑 Excluir
            </Button>
          )}
        </Card.Text>
        <Card.Footer>criado em {props.createdAt}</Card.Footer>
      </Card.Body>
    </Card>
  );
}
export { CardComponent };
