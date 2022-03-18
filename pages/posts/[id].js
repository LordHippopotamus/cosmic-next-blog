import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { url } from "../../lib/api";

export async function getStaticPaths() {
  const res = await fetch(url.posts);
  const posts = await res.json();

  const paths = posts.map((el) => ({
    params: { id: el.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(url.posts + "/" + params.id);
  const post = await res.json();

  return {
    props: { post: post.object },
  };
}

export default function Post({ post }) {
  return (
    <>
      <Container className="my-4">
        <h1>{post.title}</h1>
        <Image
          src={post.thumbnail}
          alt="post image"
          className="me-4 mb-4"
          style={{ maxWidth: "40%", maxHeight: "50vh", float: "left" }}
        />
        <span dangerouslySetInnerHTML={{ __html: post.content }} />
      </Container>
    </>
  );
}
