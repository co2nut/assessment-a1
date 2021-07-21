import { useState } from 'react'
import { useRouter } from 'next/router'
import { Card, Row, Col, Form, Input, Button, Alert } from 'antd';
import axios from "axios"
import Cookie from "js-cookie";
import { API_URL } from '../../api'

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
  const router = useRouter()
  const [formErr, setFormErr] = useState('')

  const onFinish = (values) => {
    const { make, model, year, variant } = values

    if (props.mode === 'update') {
      return axios.patch(`${API_URL}specs/${props.data._id}`,
        {
          make,
          model,
          year,
          variant
        },
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(Cookie.get("userInfo")).accessToken}`
          }
        }
      )
      .then((res) => {
        if (res.data) {
          return router.push('/specs')
        }
        return setFormErr("Model already exists")
      })
      .catch((err) => {
        setFormErr("Model already exists")
      })
    }

    axios.post(`${API_URL}specs`,
      {
        make,
        model,
        year,
        variant,
        status: "1"
      },
      {
        headers: {
          'Authorization': `Bearer ${JSON.parse(Cookie.get("userInfo")).accessToken}`
        }
      }
    )
    .then((res) => {
      if (res.data) {
        return router.push('/specs')
      }
      return setFormErr("Model already exists")
    })
    .catch((err) => {
      setFormErr("Error updating model")
      console.log('1', { err })
    })

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const { make, model, year, variant } = props.data
  return (
    <>
      {formErr ? <Alert message={formErr} closable type="error" showIcon /> : null}
      <Card style={{ marginTop: 20 }}>
        <Form
          {...layout}
          initialValues={{ make, model, year, variant }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Make"
            name="make"
            rules={[
              {
                required: true,
                message: 'Please input your make!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Model"
            name="model"
            rules={[
              {
                required: true,
                message: 'Please input your model!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Year"
            name="year"
            rules={[
              {
                required: true,
                message: 'Please input your year!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Variant"
            name="variant"
            rules={[
              {
                required: true,
                message: 'Please input your variant!',
              },
            ]}
          >
            <Input />
          </Form.Item>


          <Form.Item {...tailLayout}>
            <Row>
              <Col span={6}>
                <Button type="primary" htmlType="submit">
                  {props.mode === 'update' ? "Update" : "Create"}
                </Button>
              </Col>
              <Col span={6}>
                <Button onClick={() => { router.push('/specs') }} type="warning">
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
