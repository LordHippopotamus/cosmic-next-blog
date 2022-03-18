import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { postsBucket } from "../../lib/postsBucket";

export async function getStaticPaths() {
  const { objects: posts } = await postsBucket.getObjects({
    query: { type: "posts" },
    props: "id",
  });

  const paths = posts.map((el) => ({
    params: { id: el.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await postsBucket.getObject({
    id: params.id,
    props: "id,title,content,metadata,thumbnail",
  });

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
