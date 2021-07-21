import Head from 'next/head'
import { Layout, Row, Col } from 'antd';
import SideBar from '../../../components/SideBar'
import { parseCookies } from "../../../lib/parseCookies";
import AdForm  from '../../../components/ads/form'
import { API_URL } from '../../../api'
import axios from 'axios'

const { Header, Content } = Layout;

const App = (props) => {
  return (
    <>
      <Head>
        <title>Aneka Auto</title>
      </Head>
      <Layout>
        <SideBar activeMenu='1' />
        <Layout className="site-layout" style={{ marginLeft: 150 }}>
          <Header></Header>
          <Content style={{ minHeight: '100vh', margin: 10, padding: 20, backgroundColor: '#fff' }}>
            <Row>
              <Col span={20}>
                <h3 style={{ margin: 0 }}>Update Ads</h3>
              </Col>

              <Col span={18} >
                <AdForm data={props.data} mode="update"/>
              </Col>
            </Row>

          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default App

export async function getServerSideProps({ req, params }) {
  const access_token =  JSON.parse(parseCookies(req).userInfo).access_token;
  const { id } = req.params
  const respond = await axios.get(`${API_URL}api/ads/${id}`,{
    headers: {
      'Authorization': `Bearer ${access_token}` 
    }
  })

  return {
    props: {
      data: respond.data.data || {},
    }
  };
}
