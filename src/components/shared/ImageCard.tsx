import { Button, Card } from "react-bootstrap";
import type { ImageCardProps } from "../../interfaces";

export const ImageCard = ({
  src,
  title,
  body,
  isBtnReq,
  btnTxt,
}: ImageCardProps) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={src} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        {isBtnReq && <Button variant="primary">{btnTxt}</Button>}
      </Card.Body>
    </Card>
  );
};
