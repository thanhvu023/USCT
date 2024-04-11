// AdminLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import NavHader from "./NavHader";
import Footer from "../global-components/footer";
import SideBarAd from "./side-bar/SideBar";

const AdminLayout = () => {
  return (
    <div id="main-wrapper">
      <NavHader />
      <SideBarAd/>
      <div className="content-body">
        <div className="container-fluid" style={{ minHeight: window.screen.height - 45 }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
