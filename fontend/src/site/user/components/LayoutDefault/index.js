import React from 'react'
import { Layout } from 'antd';
const { Sider, Content } = Layout;


const LayoutDefault = ({
    layoutContent,
    layoutSider
}) => {
    return (
        <Layout style={{ background: '#FFF' }}>
            <Content className="mr-2" style={{ background: '#FFF' }}>
                {layoutContent}
            </Content>
            <Sider className="ml-2" width={"30%"} style={{ background: '#FFF' }}>
                {layoutSider}
            </Sider>
        </Layout>

    )
}


export default LayoutDefault