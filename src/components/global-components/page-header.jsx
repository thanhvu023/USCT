import React from 'react';

const PageHeader = ({ headertitle, subheader }) => {
  const publicUrl = process.env.PUBLIC_URL + '/';
  const HeaderTitle = headertitle;
  const Subheader = subheader ? subheader : HeaderTitle;

  return (
    <div className="breadcrumb-area " style={{backgroundImage: 'url("' + publicUrl + 'assets/img/bg/unibc.png")'}}>
      <div className="container">
        <div className="breadcrumb-inner">
          <div className="section-title mb-0 text-center">
            <h2 className="page-title" style={{animation: 'fadeInUp 1s ease'}}>{HeaderTitle}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
