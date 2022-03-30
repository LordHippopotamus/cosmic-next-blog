import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { bucket } from "../lib/bucket";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";
import PostsList from "../components/PostsList";
import { filterPosts } from "../lib/filterPost";

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

  const filteredPosts = filterPosts(posts, category, tag);

  return (
    <>
      <Navigation pages={pages} />
      <Row>
        <Col sm={12} md={3} className="mt-4">
          <Sidebar categories={categories} tags={tags} />
        </Col>
        <Col sm={12} md={9}>
          <PostsList posts={filteredPosts} />
        </Col>
      </Row>
    </>
  );
}
