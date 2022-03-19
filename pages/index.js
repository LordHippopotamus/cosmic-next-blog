import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import Image from "next/image";
import { postsBucket } from "../lib/postsBucket";

export async function getStaticProps() {
  const { objects: posts } = await postsBucket.getObjects({
    query: { type: "posts" },
    props: "id,title,thumbnail",
  });

  return {
    props: { posts },
  };
}

export default function Blog({ posts }) {
  return (
    <Container className="mb-4">
      <Row>
        {posts.map((el) => (
          <Col xs={12} sm={6} md={4} lg={3} className="g-4" key={el.id}>
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
}
