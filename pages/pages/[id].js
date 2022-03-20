import Container from "react-bootstrap/Container";
import { bucket } from "../../lib/bucket";
import Navigation from "../../components/Navigation";

export async function getStaticPaths() {
  const { objects: pages } = await bucket.getObjects({
    query: { type: "pages" },
    props: "id",
  });

  const paths = pages.map((el) => ({
    params: { id: el.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = await bucket.getObject({
    id: params.id,
    props: "title,content,thumbnail",
  });

  const { objects: pages } = await bucket.getObjects({
    query: { type: "pages" },
    props: "id,title",
  });

  return {
    props: { page: page.object, pages },
  };
}

export default function Page({ page, pages }) {
  return (
    <>
      <Navigation pages={pages} />
      <Container
        dangerouslySetInnerHTML={{ __html: page.content }}
        className="my-4"
      />
    </>
  );
}
