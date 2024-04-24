import React from "react";

export const MenuList = [
  //Dashboard
  {
    title: "Thống kê",
    to: "admin",
    classChange: "mm-collapse",
    iconStyle: <i className="la la-home" />,
    filterName: "admin",
  },

  //Professors
  //   {
  //     title: "Tư vấn viên",
  //     classChange: "mm-collapse",
  //     iconStyle: <i className="la la-user" />,
  //     filterName: "consultant",
  //     // content: [
  //     //     {
  //     //         title: 'All Consultants',
  //     //         to: 'all-customer',
  //     //     },
  //     //     {
  //     //         title: 'Add Consultant',
  //     //         to: 'add-customer',
  //     //     },
  //     //     {
  //     //         title: 'Edit Khách hàng',
  //     //         to: 'edit-customer',
  //     //     },
  //     //     {
  //     //         title: 'Consultant Profile',
  //     //         to: 'professor-customer',

  //     //     },

  //     // ],
  //   },
  //Customer
  // {
  //     title: 'Khách hàng',
  //     classsChange: 'mm-collapse',
  //     iconStyle: <i className="la la-users" />,
  //     filterName: 'customer',

  // },

  //Programs
  {
    title: "Chương trình",
    classChange: "mm-collapse",
    iconStyle: <i className="la la-graduation-cap" />,
    filterName: "program",
  },
  /// Student Profile
  {
    title: "Hồ sơ đăng ký",
    classChange: "mm-collapse",
    iconStyle: <i className="la la-file-text" />,
    filterName: "programApplication",
  },

  /// Registration Forms
  {
    title: "Đơn tư vấn",
    classChange: "mm-collapse",
    iconStyle: (
      <i
        className="
        la la-pencil-square"
      />
    ),
    filterName: "registrationForms",
  },
];
