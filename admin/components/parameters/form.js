import { useState } from 'react'
import { useRouter } from 'next/router'
import { Select, Card, Row, Col, Form, Input, Button, Alert } from 'antd';
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
  const [activeType, setActiveType] = useState('')

  const onFinish = (values) => {
    const { type, actionAllowed, value, accessBy } = values

    if (props.mode === 'update') {
      return axios.patch(`${API_URL}parameters/${props.data._id}`,
        {
          type,
          actionAllowed,
          value,
          accessBy
        },
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(Cookie.get("userInfo")).accessToken}`
          }
        }
      )
        .then((res) => {
          if (res.data) {
            return router.push('/parameters')
          }
          return setFormErr("actionAllowed already exists")
        })
        .catch((err) => {
          setFormErr("actionAllowed already exists")
        })
    }

    axios.post(`${API_URL}parameters`,
      {
        type,
        actionAllowed,
        value,
        accessBy,
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
          return router.push('/parameters')
        }
        return setFormErr("actionAllowed already exists")
      })
      .catch((err) => {
        setFormErr("Error updating actionAllowed")
        console.log('1', { err })
      })

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const { type, actionAllowed, value, accessBy } = props.data
  return (
    <>
      {formErr ? <Alert message={formErr} closable type="error" showIcon /> : null}
      <Card style={{ marginTop: 20 }}>
        <Form
          {...layout}
          initialValues={{ type, actionAllowed, value, accessBy }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: 'Please select your type!',
              },
            ]}
          >
            <Select onChange={(e) => { setActiveType(e) }}>
              <Select.Option key={'1'}>Ticket Type</Select.Option>
              <Select.Option key={'2'}>User Role</Select.Option>
            </Select>
          </Form.Item>

          {activeType === '1' ? <Form.Item
            label="Action Allowed"
            name="actionAllowed"
            rules={[
              {
                required: true,
                message: 'Please select your actionAllowed!',
              },
            ]}
          >
            <Select mode="multiple"
              allowClear >
              <Select.Option key={'1'}>Create</Select.Option>
              <Select.Option key={'2'}>Read</Select.Option>
              <Select.Option key={'3'}>Update</Select.Option>
              <Select.Option key={'4'}>Delete</Select.Option>
            </Select>
          </Form.Item> : null}

          <Form.Item
            label="Value"
            name="value"
            rules={[
              {
                required: true,
                message: 'Please input your value!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Access By"
            name="accessBy"
            rules={[
              {
                required: true,
                message: 'Please input your accessBy!',
              },
            ]}
          >
            <Select mode="multiple"
              allowClear >
              <Select.Option key={'rq'}>QA</Select.Option>
              <Select.Option key={'rd'}>RD</Select.Option>
              <Select.Option key={'pm'}>PM</Select.Option>
            </Select>
          </Form.Item>


          <Form.Item {...tailLayout}>
            <Row>
              <Col span={6}>
                <Button type="primary" htmlType="submit">
                  {props.mode === 'update' ? "Update" : "Create"}
                </Button>
              </Col>
              <Col span={6}>
                <Button onClick={() => { router.push('/parameters') }} type="warning">
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
