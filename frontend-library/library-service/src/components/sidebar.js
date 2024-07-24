import { useContext, useState } from 'react';
import { NavLink as NavLinkRRD, Link, useParams } from "react-router-dom";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Collapse,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    FormGroup,
    Form,
    Input,
    InputGroupText,
    InputGroup,
    Media,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";
import { PropTypes } from "prop-types";

const Sidebar = (props) => {
    const [collapseOpen, setCollapseOpen] = useState();
    const activeRoute = (routeName) => {
        return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };
    const toggleCollapse = () => {
        setCollapseOpen((data) => !data);
    };
    const closeCollapse = () => {
        setCollapseOpen(false);
    };
    const createLinks = (routes) => {
        return routes.map((prop, key) => {
            if ((!(prop.filter === "aux")))
            return (
                <NavItem key={key}>
                    <NavLink
                        to={prop.layout + prop.path}
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                    >
                        <i className={prop.icon} />
                        {prop.name}
                    </NavLink>
                </NavItem>
            );
        });
    };
    const { bgColor, routes, logo } = props;
    return (
        <Navbar
            className="navbar-vertical fixed-left navbar-light bg-white"
            expand="md"
            id="sidenav-main"
        >
            <Container fluid>
                <Collapse navbar isOpen={collapseOpen}>
                    <Form className="mt-4 mb-3 d-md-none">
                    </Form>
                    {/* Navigation */}
                    <Nav navbar>{createLinks(routes)}</Nav>
                    {/* Divider */}
                    <hr className="my-3" />
                    {/* Heading */}
                    <h6 className="navbar-heading text-muted">Documentation</h6>
                    {/* Navigation */}
                    <Nav className="mb-md-3" navbar>
                        <NavItem>
                            <NavLink href="https://github.com/Poskrebok/Django-react-coursesmanager">
                                <i className="ni ni-spaceship" />
                                Repository
                            </NavLink>
                        </NavItem>
                    </Nav>

                </Collapse>
            </Container>
        </Navbar>
    )
};


Sidebar.defaultProps = {
    routes: [{}],
};

Sidebar.propTypes = {
    // links that will be displayed inside the component
    routes: PropTypes.arrayOf(PropTypes.object),
};

export default Sidebar;