import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditCustomer = () => {
    // Sử dụng useParams để lấy ID của khách hàng từ URL
    let { id } = useParams();

    return (
        <>
            <div className="row">
                <h1>Edit Customer with ID: {id}</h1>
            </div>
        </>
    );
};

export default EditCustomer;
