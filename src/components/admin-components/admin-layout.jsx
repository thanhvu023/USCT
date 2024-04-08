// AdminLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import NavHader from "./NavHader";
import Footer_v2 from "../global-components/footer-v2";
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
      <Footer_v2 />
    </div>
  );
};

export default AdminLayout;
