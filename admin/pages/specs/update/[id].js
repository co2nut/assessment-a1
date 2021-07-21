import Head from 'next/head'
import { Layout, Card, Row, Col } from 'antd';
import SideBar from '../../../components/SideBar'
import { parseCookies } from "../../../lib/parseCookies";
import SpecForm  from '../../../components/specs/form'
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
                <h3 style={{ margin: 0 }}>Update Model</h3>
              </Col>

              <Col span={12} >
                <SpecForm data={props.data} mode="update"/>
              </Col>
            </Row>

          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default App

export async function getServerSideProps({ req }) {
  const accessToken =  JSON.parse(parseCookies(req).userInfo).accessToken;
  const { id } = req.params
  console.log({id})
  const response = await axios.get(`${API_URL}specs/${id}`,{
    headers: {
      'Authorization': `Bearer ${accessToken}` 
    }
  })

  return {
    props: {
      data: response.data || {},
    }
  };
}
