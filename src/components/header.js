import React from 'react'
import { Layout } from 'antd';
const { Header } = Layout;


function HeaderPage() {
  return (
    <>
        <Layout>
          <Header className="header_wrap">
            <div>
            My Profile
            </div>
            </Header>
        </Layout>
    </>
  )
}

export default HeaderPage