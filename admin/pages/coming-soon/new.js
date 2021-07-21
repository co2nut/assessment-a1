import Head from 'next/head'
import { Layout, Row, Col } from 'antd';
import SideBar from '../../components/SideBar'
import AdsForm  from '../../components/coming-soon/form'

const { Header, Content} = Layout;

const New = () => {
  return (
    <>
      <Head>
        <title>Aneka Auto</title>
      </Head>
      <Layout>
        <SideBar activeMenu='1' />
        <Layout className="site-layout" style={{ marginLeft: 150 }}>
          <Header></Header>
          <Content style={{minHeight:'100vh',margin:10, padding:20, backgroundColor:'#fff'}}>
          <Row>
            <Col span={20}>
              <h3 style={{margin:0}}>Create Coming Soon</h3>
            </Col>

            <Col span={18} >
              <AdsForm  data={{make:'', model:'', year:'',color:'',code:'',specification:'',engine:'',remark:'', price:'',}} mode="new"/>
            </Col>
          </Row>
            
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default New