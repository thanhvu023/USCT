import React from "react";
import { Link } from "react-router-dom";

const PageTitle = ({ motherMenu, activeMenu, pageContent }) => {
  

  return (   
	<div className="row page-titles mx-0">
		<div className="col-sm-6 p-md-0">
			<div className="welcome-text">
				<h4>{activeMenu}</h4>
			</div>
		</div>
		
	</div>
  );
};

export default PageTitle;
