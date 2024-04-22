import React from 'react'
import Footer from './global-components/footer'
import PageHeader from './global-components/page-header'
import ConsultantProgram from './consultant-components/consultant'
import Navbar2 from './global-components/navbar-v2'

const ConsultantPage = () => {
  return (
    <div>
    <Navbar2 />
    <PageHeader headertitle="Consultant" />
    <ConsultantProgram/>
    <Footer />
  </div>
  )
}

export default ConsultantPage