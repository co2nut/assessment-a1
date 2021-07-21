// import { useEffect } from 'react'
import Head from 'next/head'
import { Layout, Menu, Card, Row, Col, Form, Input, Button, Checkbox } from 'antd';
import SideBar from '../../components/SideBar'
// import Cookie from "js-cookie";
import { parseCookies } from "../../lib/parseCookies";
const { Header, Content, Footer, Sider } = Layout;

import { carAdsFilter, login } from '../../api'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


// const Index = ({carAds}) => {
// console.log({carAds});
const Index = (props) => {
  const {userInfo} = props
  console.log('from dashboard', JSON.parse(userInfo))
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // useEffect(() => {
  //   const timer = props.startClock()

  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [props])

  return (
    <>
      <Head>
        <title>Aneka Auto</title>
        <meta name="og:title" content="Aneka Auto" key="title" />
      </Head>
      <Layout>
        <SideBar activeMenu='1' />
        <Layout className="site-layout" style={{ marginLeft: 150 }}>
          <Header >
          </Header>
          <Content>
            <Row style={{}}>
              <Col span={8}  >
                {/* Some Summaries Info */}
            </Col>
            </Row>
          </Content>
        </Layout>

      </Layout>

    </>
  )
}

// Index.getInitialProps = ({ req }) => {
//   const cookies = parseCookies(req);

//   return {
//     userInfo: cookies.userInfo
//   };
// };

export default Index

export async function getServerSideProps({req}) {
  const cookies = parseCookies(req);
//   let carAds = await carAdsFilter({}, 0)
  return {
    props:{
      userInfo: cookies.userInfo
    }
  }
}
