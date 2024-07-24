import { Link } from "react-router-dom";
// reactstrap components
import {
  Form,
  FormGroup,
  Navbar,
  Nav,
  Container,
} from "reactstrap";

const LayoutNavbar = (props) => {
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default LayoutNavbar;