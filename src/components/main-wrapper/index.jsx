import React ,{useContext} from "react";
import {  Routes, Route, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer_v2 from "../global-components/footer-v2";




const Markup = () => {
  function NotFound(){    
    const url = allroutes.map((route) => route.url);
    let path = window.location.pathname
    path = path.split('/')
    path = path[path.length - 1]    
      
    if(url.indexOf(path) <= 0){     
      return <Error404 />
    }
  }   
}
  return (
       <>
         <Routes>              
            <Route path='/page-lock-screen' element= {} />
            <Route path='/page-error-400' element={} />            
            <Route path='/page-error-403' element={} />
            <Route path='/page-error-404' element={} />
            <Route path='/page-error-500' element={} />
            <Route path='/page-error-503' element={} />     
            <Route  element={<MainLayout />} > 
                {allroutes.map((data, i) => (
                  <Route
                    key={i}
                    exact
                    path={`${data.url}`}
                    element={data.component}
                  />
                ))}
            </Route>                
            <Route path='*' element={} />               
          </Routes>        
          {/* <ScrollToTop /> */}
       </>
  )

function MainLayout(){  
  const {sidebariconHover} = useContext(ThemeContext);
  const sideMenu = useSelector(state => state.sideMenu);
  return (
    <>
      <div id="main-wrapper" className={`show  ${sidebariconHover ? "iconhover-toggle": ""} ${ sideMenu ? "menu-toggle" : ""}`}>  
          <Nav />
          <div className="content-body" >          
            <div className="container-fluid" style={{ minHeight: window.screen.height - 45 }}>
              <Outlet />   
            </div>
          </div>
          <Footer_v2 />        
      </div>          
    </>
  )
};

export default Markup;