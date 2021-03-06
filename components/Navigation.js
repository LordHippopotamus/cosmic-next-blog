import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";

export default function Navigation({ pages }) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand href="#home">Blog</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
            {pages.map((el) => (
              <Link href={"/pages/" + el.id} passHref key={el.id}>
                <Nav.Link>{el.title}</Nav.Link>
              </Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
