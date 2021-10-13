import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Select, Layout, Card, Row, Col, Form, Input, Button, Alert } from 'antd';
import SideBar from '../../components/SideBar'
import axios from "axios"
import Cookie from "js-cookie";
import { API_URL, login } from '../../api'


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

const App = (props) => {
  useEffect(() => {
    axios.get(`${API_URL}parameters/${props.data._id}`)
      .then((res) => {
        console.log({ res })
      })
      .catch((err) => {
        console.log({ err })
      })
  }, [])

  const router = useRouter()
  const [formErr, setFormErr] = useState('')

  const onFinish = (values) => {
    const { password, confirmPassword, username, roles } = values
    if (password !== confirmPassword) {
      return setFormErr("Password & Confirm Password is not same")
    }

    if (props.mode === 'update') {
      return axios.put(`${API_URL}users/${props.data._id}`,
        {
          username,
          password,
          roles,
        },
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(Cookie.get("userInfo")).accessToken}`
          }
        }
      )
        .then((res) => {
          if (res.data) {
            router.push('/users')
          }
        })
        .catch((err) => {
          setFormErr("Username already exists")
        })
    }

    axios.post(`${API_URL}users`,
      {
        username,
        password,
        roles,
      },
      {
        headers: {
          'Authorization': `Bearer ${JSON.parse(Cookie.get("userInfo")).accessToken}`
        }
      }
    )
      .then((res) => {
        if (res.data) {
          router.push('/users')
        }
      })
      .catch((err) => {
        setFormErr("Username already exists")
        console.log(err)
      })

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const { username, password , roles} = props.data

  const rolesOption = ['RD', 'QA', "PM"];

  return (
    <>
      {formErr ? <Alert message={formErr} closable type="error" showIcon /> : null}
      <Card style={{ marginTop: 20 }}>
        <Form
          {...layout}
          initialValues={{ username }}
          name="basic"
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
            label="Roles"
            name="roles"
            rules={[
              {
                required: true,
                message: 'Please input your roles!',
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select roles"
              // onChange={handleChange}
            >
              {rolesOption.map(i=>( <Select.Option key={i}>{i}</Select.Option> ))}
            </Select>
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

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Please input confirm password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Row>
              <Col span={6}>
                <Button type="primary" htmlType="submit">
                  {props.mode === 'update' ? "Update" : "Create"}
                </Button>
              </Col>
              <Col span={6}>
                <Button onClick={() => { router.push('/users') }} type="warning">
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

export default App
