import {Outlet} from "react-router-dom";
import ResponsiveAppBar from "../components/AppBar";
import * as React from "react";

const Layout = () => {
    return (
        <>
            <ResponsiveAppBar/>
            <Outlet/>
        </>
    )
};

export default Layout;