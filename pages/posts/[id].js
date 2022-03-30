import { bucket } from "../../lib/bucket";
import Navigation from "../../components/Navigation";
import SinglePost from "../../components/SinglePost";

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
      <SinglePost post={post} />
    </>
  );
}
