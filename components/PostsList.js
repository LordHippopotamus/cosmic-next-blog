import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import Image from "next/image";

const PostsList = ({ posts }) => (
  <Container className="mb-4">
    <Row>
      {posts.map((el) => (
        <Col sm={12} md={6} lg={4} xl={3} className="g-4" key={el.id}>
          <Card>
            <div
              style={{
                position: "relative",
                height: 300,
              }}
            >
              <Image
                src={el.thumbnail}
                alt="post thumbnail"
                layout="fill"
                className="card-img-top object-fit-cover"
              />
            </div>
            <Card.Body>
              <Card.Title>{el.title}</Card.Title>
              <Link href={"/posts/" + el.id} passHref>
                <Button variant="primary">Read More</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default PostsList;
