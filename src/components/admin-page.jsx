import React, { Fragment, useState } from "react";
import Navbar from './global-components/navbar';
import Header from './admin-components/Header';

import Footer from './global-components/footer';
import AdminHome from './admin-components/home';
import SideBar from "./admin-components/side-bar/SideBar";

const AdminPage = () => {
  return<div>
  <AdminHome />
  <Footer />
</div>

}

export default AdminPage

