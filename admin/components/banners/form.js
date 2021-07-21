import { useState } from 'react'
import { useRouter } from 'next/router'
import { Select, Card, Row, Col, Form, Input, Button, Alert } from 'antd';
import axios from "axios"
import Cookie from "js-cookie";
import { API_URL } from '../../api'
const { Option } = Select
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
    const { title, url, type }  = values

    if(props.mode === 'update'){
      return axios.put(`${API_URL}api/banners/${props.data.id}`,
        {
          Title:title,
          Url:url,
          Type:type,
        },
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(Cookie.get("userInfo")).access_token}`
          }
        }
      )
      .then((res) => {
        // console.log(res.data)
        if(res.data.success){
          router.push('/banners')
        }else{
          setFormErr("Invalid " +  res.data[0].FailedField.split(".")[1] + " entered")  
        }
      })
      .catch((err) => {
        setFormErr("Banner already exists")
        // console.log(err)
      })
    }
    axios.post(`${API_URL}api/banners`,
      {
        Title:title,
        Url:url,
        Type:type,
        Status:"1"
      },
      {
        headers: {
          'Authorization': `Bearer ${JSON.parse(Cookie.get("userInfo")).access_token}`
        }
      }
    )
    .then((res) => {
      console.log(res.data)
      if(res.data.success){
        router.push('/banners')
      }else{
        setFormErr("Invalid " +  res.data[0].FailedField.split(".")[1] + " entered")  
      }
    })
    .catch((err) => {
      setFormErr("Banner already exists")
      console.log(err)
    })

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const {title, url, type} = props.data
  return (
    <>
      {formErr ? <Alert message={formErr} closable type="error" showIcon /> : null}
      <Card style={{ marginTop: 20 }}>
        <Form
          {...layout}
          initialValues={{ title, url, type }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input your title!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Url"
            name="url"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: 'Please select your banner type!',
              },
            ]}
          >
            <Select>
              <Option key="0" value="0">Main Banner</Option>
              <Option key="1" value="1">Side Banner</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Row>
              <Col span={6}>
                <Button type="primary" htmlType="submit">
                  {props.mode==='update'?"Update":"Create"}
                </Button>
              </Col>
              <Col span={6}>
                <Button onClick={() => { router.push('/banners') }} type="warning">
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
