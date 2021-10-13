import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Card, Row, Col, Form, Input, Button, Alert } from 'antd';
import axios from "axios"
import Cookie from "js-cookie";
import { parseCookies } from "../lib/parseCookies";
import { API_URL } from '../api'

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

const Index = ({ userInfo }) => {
  const router = useRouter()
  const [loginErr, setLoginErr] = useState(false)

  const onFinish = (values) => {
    axios.post(`${API_URL}authentication`,
      {
        strategy: "local",
        username: values.username,
        password: values.password,
      }
    )
      .then((res) => {
        console.log('success', {res})
        let userInfo = res.data.user
        Cookie.set("userInfo", JSON.stringify(res.data));
        if (userInfo.roles.indexOf('admin') >= 0) {
          router.push('/users')
        } else {
          router.push('/tickets')
        }
      })
      .catch((err) => {
        setLoginErr(true)
        console.log(err)
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Head>
        <title>Ticket Management System</title>
      </Head>
      <Row style={{ marginTop: '10%' }}>
        <Col span={8} offset={8} >
          {loginErr ? <Alert message="Unauthorized Login" closable type="error" showIcon /> : null}
          <Card>
            <h2 style={{ textAlign: 'center', marginBottom: 50 }}><span style={{ fontWeight: 'bolder' }}>Ticket Management System</span></h2>
            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onValuesChange={() => setLoginErr(false)}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

Index.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req);

  return {
    userInfo: cookies.userInfo
  };
};

export default Index

// export async function getServerSideProps(params) {

//   let carAds = await carAdsFilter({}, 0)
//   return {
//     props:{
//       carAds
//     }
//   }
// }
