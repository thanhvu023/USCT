import React from "react";

export const MenuList = [
   
    //Dashboard
    {
        title: 'Thống kê',	
        to: 'admin',
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-home" />,
        filterName: 'Thống kê'
    },
    

   

    //Professors    
    {
        title: 'Tư vấn viên',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-user" />,
        filterName: 'Tư vấn viên',
        content: [
            {
                title: 'All Consultants',
                to: 'all-customer',	
            },
            {
                title: 'Add Consultant',
                to: 'add-customer',
            },
            {
                title: 'Edit Khách hàng',
                to: 'edit-customer',
            },
            {
                title: 'Consultant Profile',
                to: 'professor-customer',
          
            },
           
        ],
    },
    //Student    
    {
        title: 'Khách hàng',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-users" />,
        filterName: 'Khách hàng',
        // content: [
        //     {
        //         title: 'All Students',
        //         to: 'all-students',	
        //         filterName: 'Khách hàng',				
        //     },
        //     {
        //         title: 'Add Students',
        //         to: 'add-student',
        //         filterName: 'Khách hàng',
        //     },
        //     {
        //         title: 'Edit Students',
        //         to: 'edit-student',
        //         filterName: 'Khách hàng',
        //     },
            
        // ],
    },

    //Programs    
    {
        title: 'Chương trình',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-graduation-cap" />,
        filterName: 'Chương trình',
        // content: [
        //     {
        //         title: 'All Programs',
        //         to: 'all-courses',	
        //         filterName: 'Chương trình',				
        //     },
        //     {
        //         title: 'Add Program',
        //         to: 'add-courses',
        //         filterName: 'Chương trình',
        //     },
        //     {
        //         title: 'Edit Program',
        //         to: 'edit-courses',
        //         filterName: 'Chương trình',
        //     },
           
        // ],
    },
   
    //Fees    
    {
        title: 'Lợi nhuận',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-dollar" />,
        filterName: 'Lợi nhuận',
        // content: [
        //     {
        //         title: 'Fees Collection',
        //         to: 'fees-collection',	
        //         filterName: 'Lợi nhuận',				
        //     },
        //     {
        //         title: 'Add Fees',
        //         to: 'add-fees',
        //         filterName: 'Lợi nhuận',
        //     },
        //     {
        //         title: 'Fees Receipt',
        //         to: 'fees-receipt',
        //         filterName: 'Lợi nhuận',
        //     },            
                 
        // ],
    },
    
    //Forms
    {
        title:'Hồ sơ',
        classsChange: 'mm-collapse',
        iconStyle: <i className="la la-file-text" />,
        filterName: 'Hồ sơ',
       
    },
] 
