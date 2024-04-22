import React from "react";

export const MenuList = [
   
    //Dashboard
    {
        title: 'Thống kê',	
        to: 'admin',
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-home" />,
        filterName: 'admin'
    },
    

   

    //Professors    
    {
        title: 'Tư vấn viên',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-user" />,
        filterName: 'consultant',
        // content: [
        //     {
        //         title: 'All Consultants',
        //         to: 'all-customer',	
        //     },
        //     {
        //         title: 'Add Consultant',
        //         to: 'add-customer',
        //     },
        //     {
        //         title: 'Edit Khách hàng',
        //         to: 'edit-customer',
        //     },
        //     {
        //         title: 'Consultant Profile',
        //         to: 'professor-customer',
          
        //     },
           
        // ],
    },
    //Customer    
    {
        title: 'Khách hàng',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-users" />,
        filterName: 'customer',
   
    },

    //Programs    
    {
        title: 'Chương trình',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-graduation-cap" />,
        filterName: 'program',
    },
    /// Student Profile
    {
        title:'Hồ sơ học sinh',
        classsChange: 'mm-collapse',
        iconStyle: <i className="la la-file-text" />,
        filterName: 'Hồ sơ học sinh',
       
    },

    /// Registration Forms
    {
        title:'Đơn tư vấn',
        classsChange: 'mm-collapse',
        iconStyle: <i className="
        la la-pencil-square" />,
        filterName: 'Đơn tư vấn',
       
    },

    /// Test
    {
        title:'Test1',
        classsChange: 'mm-collapse',
        iconStyle: <i className="
        la la-pencil-square" />,
        filterName: 'Test1',
       
    },
 


] 
