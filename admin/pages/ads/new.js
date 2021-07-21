import Head from 'next/head'
import { Layout, Row, Col } from 'antd';
import SideBar from '../../components/SideBar'
import AdsForm  from '../../components/ads/form'

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
              <h3 style={{margin:0}}>Create Model</h3>
            </Col>

            <Col span={18} >
              <AdsForm  data={{title:'', description:'', condition:'', images:'', make:'', model:'', year:'', variant:'', mileage:'', remark:'', price:'',engine:'',transmission:''}} mode="new"/>
            </Col>
          </Row>
            
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default New