import Link from "next/link";
import { Nav } from "react-bootstrap";

export default function Sidebar({ categories }) {
  return (
    <Nav
      variant="pills"
      defaultActiveKey="all"
      style={{ height: "auto" }}
      className="flex-column bg-light border-top border-end border-bottom"
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
              query: { category: el.id },
            }}
            passHref
          >
            <Nav.Link eventKey={el.id}>{el.title}</Nav.Link>
          </Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}
