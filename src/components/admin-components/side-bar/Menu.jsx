import React from "react";

export const MenuList = [
    //Dashboard
    {
        title:"Menu chính ",
        classsChange: "menu-title",
        extraclass:"first"
    },
    //Dashboard
    {
        title: 'Thống kê',	
        to: 'index-2',
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-home" />,
        content: [
            // {
            //     title: 'Dashboard 1',
            //     to: 'dashboard',					
            // },
            // {
            //     title: 'Dashboard ',
            
            // },
            // {
            //     title: 'Dashboard 3',
            //     to: 'index-3',
            // },
           
        ],
    },
    

    //Management
    // {
    //     title: 'Event Management',	        
    //     to:"event-management",
    //     iconStyle: <i className="la la-calendar" />,        
    // },
    

    //Professors    
    {
        title: 'Tư vấn viên',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-user" />,
        content: [
            {
                title: 'All Consultants',
                to: 'all-professors',					
            },
            {
                title: 'Add Consultant',
                to: 'add-professor',
            },
            {
                title: 'Edit Consultant',
                to: 'edit-professor',
            },
            {
                title: 'Consultant Profile',
                to: 'professor-profile',
            },
           
        ],
    },
    //Student    
    {
        title: 'Khách hàng',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-users" />,
        content: [
            {
                title: 'All Students',
                to: 'all-students',					
            },
            {
                title: 'Add Students',
                to: 'add-student',
            },
            {
                title: 'Edit Students',
                to: 'edit-student',
            },
            
        ],
    },

    //Programs    
    {
        title: 'Chương trình',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-graduation-cap" />,
        content: [
            {
                title: 'All Programs',
                to: 'all-courses',					
            },
            {
                title: 'Add Program',
                to: 'add-courses',
            },
            {
                title: 'Edit Program',
                to: 'edit-courses',
            },
            // {
            //     title: 'About Program',
            //     to: 'about-courses',
            // },
           
        ],
    },
   
    //Fees    
    {
        title: 'Lợi nhuận',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-dollar" />,
        content: [
            {
                title: 'Fees Collection',
                to: 'fees-collection',					
            },
            {
                title: 'Add Fees',
                to: 'add-fees',
            },
            {
                title: 'Fees Receipt',
                to: 'fees-receipt',
            },            
                 
        ],
    },

    //Apps
    // {
    //     title:"Apps",
    //     classsChange: "menu-title"
    // },
    // {
    //     title: 'Apps',	
    //     classsChange: 'mm-collapse',
    //     iconStyle: <i className="la la-users" />,
    //     content: [
    //         {
    //             title: 'Profile',
    //             to: 'app-profile'
    //         },
    //         {
    //             title: 'Edit Profile',
    //             to: 'edit-profile'
    //         },
    //         {
    //             title: 'Post Details',
    //             to: 'post-details'
    //         },
    //         {
    //             title: 'Email',                
    //             hasMenu : true,
    //             content: [
    //                 {
    //                     title: 'Compose',
    //                     to: 'email-compose',
    //                 },
    //                 {
    //                     title: 'Index',
    //                     to: 'email-inbox',
    //                 },
    //                 {
    //                     title: 'Read',
    //                     to: 'email-read',
    //                 }
    //             ],
    //         },
    //         {
    //             title:'Calendar',
    //             to: 'app-calender'
    //         },
    //         {
    //             title: 'Shop',
    //             //to: './',
    //             hasMenu : true,
    //             content: [
    //                 {
    //                     title: 'Product Grid',
    //                     to: 'ecom-product-grid',
    //                 },
    //                 {
    //                     title: 'Product List',
    //                     to: 'ecom-product-list',
    //                 },
    //                 {
    //                     title: 'Product Details',
    //                     to: 'ecom-product-detail',
    //                 },
    //                 {
    //                     title: 'Order',
    //                     to: 'ecom-product-order',
    //                 },
    //                 {
    //                     title: 'Checkout',
    //                     to: 'ecom-checkout',
    //                 },
    //                 {
    //                     title: 'Invoice',
    //                     to: 'ecom-invoice',
    //                 },
    //                 {
    //                     title: 'Customers',
    //                     to: 'ecom-customers',
    //                 },
    //             ],
    //         },
    //     ],
    // },

    //CMS
    // {
    //     title : "CMS",
    //     classsChange: 'mm-collapse',
    //     // update:"New",
    //     iconStyle: <i className="flaticon-381-database-1" />,
    //     content:[
    //         {
    //             title:'Content',
    //             to:'/content'
    //         },
    //         {
    //             title:'Menu',
    //             to:'/menu'
    //         },
    //         {
    //             title:'Email Template',
    //             to:'/email-template'
    //         },
    //         {
    //             title:'Blog',
    //             to:'/blog'
    //         },
    //         {
    //             title:'Add Content',
    //             to:'/content-add'
    //         },
    //         {
    //             title:'Add Email',
    //             to:'/add-email'
    //         },
    //         {
    //             title:'Add Blog',
    //             to:'/add-blog'
    //         },
    //         {
    //             title:'Blog Category',
    //             to:'/blog-category'
    //         },
    //     ],
    // },
    //Charts
    // {
    //     title: 'Charts',	
    //     classsChange: 'mm-collapse',
    //     iconStyle: <i className="la la-signal" />,
    //     content: [
            
    //         {
    //             title: 'RechartJs',
    //             to: 'chart-rechart',					
    //         },
    //         {
    //             title: 'Chartjs',
    //             to: 'chart-chartjs',					
    //         },
    //         {
    //             title: 'Sparkline',
    //             to: 'chart-sparkline',					
    //         },
    //         {
    //             title: 'Apexchart',
    //             to: 'chart-apexchart',					
    //         },
    //     ]
    // },
    // {
    //     title:"Components",
    //     classsChange:"menu-title"
    // },

    //Boosttrap
    // {
    //     title: 'Bootstrap',	
    //     classsChange: 'mm-collapse',
    //     iconStyle: <i className="la la-globe"></i>,	
    //     content: [
    //         {
    //             title: 'Accordion',
    //             to: 'ui-accordion',					
    //         },
    //         {
    //             title: 'Alert',
    //             to: 'ui-alert',					
    //         },
    //         {
    //             title: 'Badge',
    //             to: 'ui-badge',					
    //         },
    //         {
    //             title: 'Button',
    //             to: 'ui-button',					
    //         },
    //         {
    //             title: 'Modal',
    //             to: 'ui-modal',					
    //         },
    //         {
    //             title: 'Button Group',
    //             to: 'ui-button-group',					
    //         },
    //         {
    //             title: 'List Group',
    //             to: 'ui-list-group',					
    //         },
    //         {
    //             title: 'Cards',
    //             to: 'ui-card',					
    //         },
    //         {
    //             title: 'Carousel',
    //             to: 'ui-carousel',					
    //         },
    //         {
    //             title: 'Dropdown',
    //             to: 'ui-dropdown',					
    //         },
    //         {
    //             title: 'Popover',
    //             to: 'ui-popover',					
    //         },
    //         {
    //             title: 'Progressbar',
    //             to: 'ui-progressbar',					
    //         },
    //         {
    //             title: 'Tab',
    //             to: 'ui-tab',					
    //         },
    //         {
    //             title: 'Typography',
    //             to: 'ui-typography',					
    //         },
    //         {
    //             title: 'Pagination',
    //             to: 'ui-pagination',					
    //         },
    //         {
    //             title: 'Grid',
    //             to: 'ui-grid',					
    //         },
    //     ]
    // },
    //plugins
    // {
    //     title:'Plugins',
    //     classsChange: 'mm-collapse',
    //     iconStyle : <i className="la la-plus-square-o"></i>,
    //     content : [
    //         {
    //             title:'Select 2',
    //             to: 'uc-select2',
    //         },
           
    //         {
    //             title:'Sweet Alert',
    //             to: 'uc-sweetalert',
    //         },
    //         {
    //             title:'Toastr',
    //             to: 'uc-toastr',
    //         },            
    //         {
    //             title:'Light Gallery',
    //             to: 'uc-lightgallery',
    //         },
    //     ]
    // },
    //Widget
    // {   
    //     title:'Widget',
    //     iconStyle: <i className="la la-desktop" />,
    //     classsChange: 'mm-collapse',        
    //     content : [
    //         {
    //             title:'Widget Card',
    //             to:'widget-card'
    //         },
    //         {
    //             title:'Widget Chart',
    //             to:'widget-chart'
    //         },
    //         {
    //             title:'Widget List',
    //             to:'widget-list'
    //         },
    //     ]
    // },

    // {
    //     title:"Forms",
    //     classsChange:"menu-title"
    // },
    //Forms
    {
        title:'Hồ sơ',
        classsChange: 'mm-collapse',
        iconStyle: <i className="la la-file-text" />,
        content : [
            {
                title:'Form Elements',
                to: 'form-element',
            },
            {
                title:'Wizard',
                to: 'form-wizard',
            },
            {
                title:'CkEditor',
                to: 'form-ckeditor',
            },
            {
                title:'Pickers',
                to: 'form-pickers',
            },
            {
                title:'Form Validate',
                to: 'form-validation',
            },

        ]
    },

    //Table
    // {
    //     title:"Table",
    //     classsChange:"menu-title"
    // },
    // {
    //     title:'Table',
    //     classsChange: 'mm-collapse',
    //     iconStyle: <i className="la la-table" />,
    //     content : [
    //         {
    //             title:'Table Filtering',
    //             to: 'table-filtering',
    //         },
    //         {
    //             title:'Table Sorting',
    //             to: 'table-sorting',
    //         },
    //         {
    //             title:'Bootstrap',
    //             to: 'table-bootstrap-basic',
    //         },
           

    //     ]
    // },
  
    
]