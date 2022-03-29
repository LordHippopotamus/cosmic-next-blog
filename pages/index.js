import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import Image from "next/image";
import { bucket } from "../lib/bucket";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";

export async function getStaticProps() {
  const { objects: posts } = await bucket.getObjects({
    query: { type: "posts" },
    props: "id,title,thumbnail,metadata",
  });

  const { objects: pages } = await bucket.getObjects({
    query: { type: "pages" },
    props: "id,title",
  });

  const { objects: categories } = await bucket.getObjects({
    query: { type: "categories" },
    props: "id,title",
  });

  const { objects: tags } = await bucket.getObjects({
    query: { type: "tags" },
    props: "id,title",
  });

  return {
    props: { posts, pages, categories, tags },
  };
}

export default function Blog({ posts, pages, categories, tags }) {
  const router = useRouter();
  const { category, tag } = router.query;

  // console.log(posts);

  return (
    <>
      <Navigation pages={pages} />
      <Row>
        <Col sm={12} md={3} className="mt-4">
          <Sidebar categories={categories} tags={tags} />
        </Col>
        <Col sm={12} md={9}>
          <Container className="mb-4">
            <Row>
              {posts
                .filter((el) => {
                  if (category && tag) {
                    const isCategoryMatch =
                      el.metadata.category.id === category;
                    const isTagMatch = el.metadata.tags.find(
                      (tagsEl) => tagsEl.id === tag
                    );
                    return isCategoryMatch && isTagMatch;
                  }
                  if (category) {
                    return el.metadata.category.id === category;
                  }
                  if (tag) {
                    return el.metadata.tags.find((tagsEl) => tagsEl.id === tag);
                  }
                  return true;
                })
                .map((el) => (
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
        </Col>
      </Row>
    </>
  );
}
