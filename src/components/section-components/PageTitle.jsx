import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PageTitle = ({ motherMenu, activeMenu }) => {
    return (   
        <div className="row page-titles mx-0">
            <div className="col-md-6 p-0">
                <div className="welcome-text">
                    <h4>{activeMenu}</h4>
                </div>
            </div>
            <div className="col-md-6 p-0 d-flex align-items-center justify-content-end">
                <ol className="breadcrumb m-0 p-0">                
                    <li className="breadcrumb-item"><Link to={"#"}>{motherMenu}</Link></li>
                    <li className="breadcrumb-item active"><Link to={"#"}>{activeMenu}</Link></li>
                </ol>
            </div>
        </div>
    );
};

PageTitle.propTypes = {
    motherMenu: PropTypes.string.isRequired,
    activeMenu: PropTypes.string.isRequired
};

export default PageTitle;
