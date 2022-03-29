import Link from "next/link";
import { useRouter } from "next/router";
import { Nav } from "react-bootstrap";

export default function Sidebar({ categories, tags }) {
  const router = useRouter();
  const { category, tag } = router.query;

  return (
    <div
      style={{ height: "auto" }}
      className="flex-column bg-light border-top border-end border-bottom"
    >
      <Nav
        variant="pills"
        defaultActiveKey={category ? category : "all"}
        className="flex-column"
      >
        <Nav.Item className="m-2">
          <Link href="/" passHref>
            <Nav.Link eventKey="all">All</Nav.Link>
          </Link>
        </Nav.Item>
        {categories.map((el) => (
          <Nav.Item className="mb-2 ms-2 me-2" key={el.id}>
            <Link
              href={{
                query: { category: el.id, tag },
              }}
              passHref
            >
              <Nav.Link eventKey={el.id}>{el.title}</Nav.Link>
            </Link>
          </Nav.Item>
        ))}
      </Nav>
      <hr className="my-0 mx-2" />
      <Nav
        variant="pills"
        defaultActiveKey={tag ? tag : "all"}
        className="m-2"
        style={{ gap: ".5rem" }}
      >
        <Nav.Item>
          <Link href="/" passHref>
            <Nav.Link eventKey="all">All</Nav.Link>
          </Link>
        </Nav.Item>
        {tags.map((el) => (
          <Nav.Item key={el.id}>
            <Link
              href={{
                query: { category, tag: el.id },
              }}
              passHref
            >
              <Nav.Link eventKey={el.id}>{el.title}</Nav.Link>
            </Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
}
