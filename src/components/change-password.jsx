import React from 'react'
import Navbar from './global-components/navbar'
import ChangePassword from './section-components/change-password'
import Footer from './global-components/footer'
import PageHeader from './global-components/page-header'

const ChangePasswordPage = () => {
  return (
    <div>
        <Navbar />
        <PageHeader headertitle="Đổi mật khẩu"/>
        <ChangePassword />
        <Footer />
    </div>
  )
}

export default ChangePasswordPage