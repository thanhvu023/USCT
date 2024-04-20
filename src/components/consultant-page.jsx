import React from 'react'
import Footer from './global-components/footer'
import Navbar from './global-components/navbar'
import PageHeader from './global-components/page-header'
import ConsultantProgram from './consultant-components/consultant'

const ConsultantPage = () => {
  return (
    <div>
    <Navbar />
    <PageHeader headertitle="Consultant" />
    <ConsultantProgram/>
    <Footer />
  </div>
  )
}

export default ConsultantPage