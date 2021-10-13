import { useState, useEffect } from 'react'
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
  const [ticketTypes, setTicketTypes] = useState([])
  const priorities = { 1: 'urgent', 2: 'high', 3: 'medium', 4: 'low' }
  const severities = { 1: 'urgent', 2: 'high', 3: 'medium', 4: 'low' }

  useEffect(() => {
    //get ticket type from parameter
    axios.get(`${API_URL}parameters`,
      {
        params: { accessBy: 'rq', type: '1' },
      },
      {
        headers: {
          'Authorization': `Bearer ${JSON.parse(Cookie.get("userInfo")).accessToken}`
        }
      }
    )
      .then((res) => {
        setTicketTypes(res.data.data)
      })
      .catch((err) => {
        console.log({ err })
      })
  }, [])

  const onFinish = (values) => {
    const { ticketType, severity, priority, summary, descriptions } = values

    if (props.mode === 'update') {
      return axios.patch(`${API_URL}tickets/${props.data._id}`,
        {
          ticketType,
          severity,
          priority,
          summary,
          descriptions,
        },
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(Cookie.get("userInfo")).accessToken}`
          }
        }
      )
        .then((res) => {
          if (res.data) {
            return router.push('/tickets')
          }
          return setFormErr("Ticket already exists")
        })
        .catch((err) => {
          setFormErr("Ticket already exists")
        })
    }

    console.log({ ticketType, severity, priority, summary, descriptions })

    axios.post(`${API_URL}tickets`,
      {
        ticketType,
        severity,
        priority,
        summary,
        descriptions,
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
          return router.push('/tickets')
        }
        return setFormErr("Ticket already exists")
      })
      .catch((err) => {
        setFormErr("Error updating model")
        console.log('1', { err })
      })

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const { ticketType, severity, priority, summary, descriptions } = props.data
  return (
    <>
      {formErr ? <Alert message={formErr} closable type="error" showIcon /> : null}
      <Card style={{ marginTop: 20 }}>
        <Form
          {...layout}
          initialValues={{ ticketType, severity, priority, summary, descriptions }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Ticket Type"
            name="ticketType"
            rules={[
              {
                required: true,
                message: 'Please input your ticket type!',
              },
            ]}
          >
            <Select allowClear >
              {ticketTypes.map(i => (<Select.Option key={i.value}>{i.value}</Select.Option>))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Severity"
            name="severity"
            rules={[
              {
                required: true,
                message: 'Please input your ticket type!',
              },
            ]}
          >
            <Select>
              {Object.keys(severities).map(k => (<Select.Option key={k}>{severities[k].toUpperCase()}</Select.Option>))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Priority"
            name="priority"
            rules={[
              {
                required: true,
                message: 'Please input your ticket type!',
              },
            ]}
          >
            <Select>
              {Object.keys(priorities).map(k => (<Select.Option key={k}>{priorities[k].toUpperCase()}</Select.Option>))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Summary"
            name="summary"
            rules={[
              {
                required: true,
                message: 'Please input your summary!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Descriptions"
            name="descriptions"
            rules={[
              {
                required: true,
                message: 'Please input your descriptions!',
              },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>


          <Form.Item {...tailLayout}>
            <Row>
              <Col span={6}>
                <Button type="primary" htmlType="submit">
                  {props.mode === 'update' ? "Update" : "Create"}
                </Button>
              </Col>
              <Col span={6}>
                <Button onClick={() => { router.push('/tickets') }} type="warning">
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
