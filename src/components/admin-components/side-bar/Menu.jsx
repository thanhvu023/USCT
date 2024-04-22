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
    //Student    
    {
        title: 'Khách hàng',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-users" />,
        filterName: 'customer',
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
        filterName: 'program',
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
    // {
    //     title: 'Lợi nhuận',	
    //     classsChange: 'mm-collapse',		
    //     iconStyle: <i className="la la-dollar" />,
    //     filterName: 'fee',
    //     // content: [
    //     //     {
    //     //         title: 'Fees Collection',
    //     //         to: 'fees-collection',	
    //     //         filterName: 'Lợi nhuận',				
    //     //     },
    //     //     {
    //     //         title: 'Add Fees',
    //     //         to: 'add-fees',
    //     //         filterName: 'Lợi nhuận',
    //     //     },
    //     //     {
    //     //         title: 'Fees Receipt',
    //     //         to: 'fees-receipt',
    //     //         filterName: 'Lợi nhuận',
    //     //     },            
                 
    //     // ],
    // },
    
    //Forms
    {
        title:'Hồ sơ học sinh',
        classsChange: 'mm-collapse',
        iconStyle: <i className="la la-file-text" />,
        filterName: 'Hồ sơ học sinh',
       
    },
    {
        title:'Đơn tư vấn',
        classsChange: 'mm-collapse',
        iconStyle: <i className="
        la la-pencil-square" />,
        filterName: 'Đơn tư vấn',
       
    },
    {
        title:'Test1',
        classsChange: 'mm-collapse',
        iconStyle: <i className="
        la la-pencil-square" />,
        filterName: 'Test1',
       
    },
    {
        title:'Test2',
        classsChange: 'mm-collapse',
        iconStyle: <i className="
        la la-pencil-square" />,
        filterName: 'Test2',
       
    },
    {
        title:'Test3',
        classsChange: 'mm-collapse',
        iconStyle: <i className="
        la la-pencil-square" />,
        filterName: 'Test3',
       
    },


] 
