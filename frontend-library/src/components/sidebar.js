import { useState } from 'react';
import { NavLink as NavLinkRRD} from "react-router-dom";
import {
    Collapse,
    Form,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
} from "reactstrap";
import { PropTypes } from "prop-types";
/*  Боковая панель сайта.*/
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
    /* Создаем ссылки, из routes. Берем только те, что не (aux) */
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
                            <NavLink href="https://github.com/Poskrebok/Django-React-Library">
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