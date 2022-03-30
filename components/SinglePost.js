import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Link from "next/link";

const SinglePost = ({ post }) => (
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
      {post.metadata.category ? (
        <Link
          href={{
            pathname: "/",
            query: { category: post.metadata.category.id },
          }}
        >
          <a>{post.metadata.category.title}</a>
        </Link>
      ) : (
        "no category"
      )}
    </div>
    <div>
      tags:{" "}
      {post.metadata.tags
        ? post.metadata.tags.map((el) => (
            <span key={el.id}>
              <Link
                href={{
                  pathname: "/",
                  query: { tag: el.id },
                }}
              >
                <a>{el.title}</a>
              </Link>{" "}
            </span>
          ))
        : "no tags"}
    </div>
  </Container>
);

export default SinglePost;
