import Container from "react-bootstrap/Container";
import Image from "next/image";
import { bucket } from "../../lib/bucket";
import Navigation from "../../components/Navigation";

export async function getStaticPaths() {
  const { objects: posts } = await bucket.getObjects({
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
  const post = await bucket.getObject({
    id: params.id,
    props: "title,content,thumbnail",
  });

  return {
    props: { post: post.object },
  };
}

export default function Post({ post }) {
  return (
    <>
      <Navigation />
      <Container className="my-4">
        <h1>{post.title}</h1>
        <div
          style={{
            position: "relative",
            maxWidth: "40%",
            maxHeight: "50vh",
            width: "100%",
            height: "300px",
            float: "left",
          }}
        >
          <Image
            src={post.thumbnail}
            alt="post thumbnail"
            layout="fill"
            className="single-post-thumbnail me-4 mb-4"
          />
        </div>

        <span dangerouslySetInnerHTML={{ __html: post.content }} />
      </Container>
    </>
  );
}
