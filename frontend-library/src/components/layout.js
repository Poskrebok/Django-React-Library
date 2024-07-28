import React from "react";
import { useLocation, Route, Routes, Navigate, useNavigate } from "react-router-dom";

import Sidebar from "./sidebar.js";
import LayoutNavbar from "./layoutnavbar.js";
import routes from "../routes.js";

const Layout = (props) => {
    const mainContent = React.useRef(null);
    const location = useLocation();
    /* Это нам нужно для прокрути */
    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);
    /* Функция для получения ссылок */
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            return (
                <Route path={prop.path} element={prop.component} key={key} exact />
            );
        })
    };

    return (
        <>
            <Sidebar
                {...props}
                routes={routes}
            />
            <div className="main-content" ref={mainContent}>
                <LayoutNavbar
                {...props}
                />
                <Routes>
                    {getRoutes(routes)}
                    <Route path="*" element={<Navigate to="/Main/books" replace />} />
                </Routes>
            </div>
        </>
    );
};

export default Layout;
