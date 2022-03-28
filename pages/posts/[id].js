import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
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
    props: "title,content,thumbnail,metadata",
  });

  const { objects: pages } = await bucket.getObjects({
    query: { type: "pages" },
    props: "id,title",
  });

  return {
    props: { post: post.object, pages },
  };
}

export default function Post({ post, pages }) {
  return (
    <>
      <Navigation pages={pages} />
      <Container className="my-4">
        <h1>{post.title ? post.title : "no title"}</h1>
        <div className="d-flex justify-content-center my-2">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt="post thumbnail"
              style={{ maxWidth: "100%", maxHeight: "80vh" }}
            />
          ) : (
            "no thumbnail"
          )}
        </div>

        <span
          dangerouslySetInnerHTML={{
            __html: post.content ? post.content : "no content",
          }}
        />

        <div>
          category:{" "}
          {post.metadata.category
            ? post.metadata.category.title
            : "no category"}
        </div>
        <div>
          tags:{" "}
          {post.metadata.tags
            ? post.metadata.tags.map(
                (el, index, array) =>
                  el.title + (array.length - 1 !== index ? " / " : "")
              )
            : "no tags"}
        </div>
      </Container>
    </>
  );
}
