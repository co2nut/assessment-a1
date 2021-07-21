import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Radio, Select, Upload, Card, Row, Col, Form, Input, InputNumber, Button, Alert } from 'antd';
import axios from "axios"
import Cookie from "js-cookie";
import { API_URL } from '../../api'
import { mileageRange } from '../../lib/data'

import { InboxOutlined ,CloseCircleOutlined} from '@ant-design/icons';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;
var FormData = require('form-data');

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const layoutPrice = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 4,
  },
};

const layoutCondition = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
};

const layout2 = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};



const App = (props) => {
  const { make, model, year, remark, color,code,specification,price,engine
  } = props.data
  const [form] = Form.useForm();

  const router = useRouter()  
  const [formErr, setFormErr] = useState('')
  const [makeList, setMakeList] = useState([])
  const [modelList, setModelList] = useState([])
  const [yearList, setYearList] = useState([])

  const getParams =async(field, filterObj)=>{
    return axios.get(`${API_URL}spec-params`,
      {
        params: {
          distinct: {field, filterObj},
        },
      },
    )
    .then((res) => {
      if(field === 'make'){
        return setMakeList(res.data.result)
      }
      if(field === 'model'){
        return setModelList(res.data.result)
      }
      if(field === 'year'){
        return setYearList(res.data.result)
      }

    })
    .catch((err) => {
      console.log(err)
      return []
    })

  }

  const onNumberChange = (e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      props.onChange(value);
    }
  };

  useEffect(()=>{
    if(props.mode === 'update'){
      getParams("model",{make})
      getParams("year",{make,model})
      getParams("variant",{make,model,year})
    }
    getParams("make",{})
  },[])
  


  
  const onFinish = (values) => {
    const { make, model, year, remark, color,code,specification,price,engine} = values

    if(props.mode === 'update'){
      return axios.put(`${API_URL}api/comingsoon/${props.data.id}`,
        {
          Make:make,
          Model:model,
          Year:year,
          Remark:remark,
          Price:price,
          Engine:engine,
          Color:color,
          Code:code,
          Specification:specification
        },
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(Cookie.get("userInfo")).access_token}`
          }
        }
      )
      .then((res) => {
        if(res.data.success){
          router.push('/coming-soon')
        }else{
          setFormErr("Invalid " +  res.data[0].FailedField.split(".")[1] + " entered")  
        }
      })
      .catch((err) => {
        setFormErr("Model already exists")
      })
    }
    
    axios.post(`${API_URL}api/comingsoon`,
      {
        Make:make,
        Model:model,
        Year:year,
        Remark:remark,
        Price:price,
        Engine:engine,
        Color:color,
        Code:code,
        Specification:specification,
        Status:'1'
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
        router.push('/coming-soon')
      }else{
        setFormErr("Invalid " +  res.data[0].FailedField.split(".")[1] + " entered")  
      }
    })
    .catch((err) => {
      setFormErr("Coming soon creation error")
      console.log(err)
    })

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {formErr ? <Alert message={formErr} closable type="error" showIcon /> : null}
      <Card style={{ marginTop: 20 }}>

        <Form
          form={form}
          style={{marginTop:30}}
          {...layout}
          initialValues={{ make, model, year, remark, color,code,specification,price,engine }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >


          <Row>
            <Col span={12}>
              <Form.Item label="Make" name="make"
                rules={[
                  {
                    required: true,
                    message: 'Please input your make!',
                  },
                ]}
              >
                <Select onChange={(e)=>{  console.log("hello"), form.setFieldsValue({model:'', year:'', variant:''}), getParams("model",{make:e}) }} showSearch>
                  {makeList.map(i=>(
                    <Option key={i} value={i}>{i}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="Model" name="model"
                rules={[
                  {
                    required: true,
                    message: 'Please input your model!',
                  },
                ]}
              >
                <Select onChange={(e)=>{  form.setFieldsValue({year:'', variant:''}),  getParams("year",{make:form.getFieldValue('make'),model:e}) }} showSearch>
                  {modelList.map(i=>(
                    <Option key={i} value={i}>{i}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item label="Year" name="year"
                rules={[
                  {
                    required: true,
                    message: 'Please input your year!',
                  },
                ]}
              >
                <Select onChange={(e)=>{ form.setFieldsValue({variant:''}), getParams("variant",{make:form.getFieldValue('make'),model:form.getFieldValue('model'),year:e}) }} showSearch>
                  {yearList.map(i=>(
                    <Option key={i} value={i}>{i}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Code"
                name="code"
                rules={[
                  {
                    required: true,
                    message: 'Please input your code!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item label="Color" name="color"
                rules={[
                  {
                    required: true,
                    message: 'Please input your color!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Remark"
                name="remark"
                rules={[
                  {
                    required: true,
                    message: 'Please input your remark!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        
          <Row>
          <Col span={12}>
          <Form.Item label="Price" name="price"
            rules={[
              {
                required: true,
                message: 'Please input your price!',
              },
            ]}
          >
            <InputNumber 
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={{width:'100%', textAlign:'right'}}
              min="0"
              max="999999999"
              step="10000" />
          </Form.Item>
          </Col>

          <Col span={12}>
              <Form.Item label="Engine Capacity" name="engine"
                rules={[
                  {
                    required: true,
                    message: 'Please input your engine capacity!',
                  },
                ]}
              >
                <InputNumber 
                  style={{width:'100%', textAlign:'right'}}
                  min="0"
                  max="999999"
                  step="0.1" />
              </Form.Item>
            </Col>

          </Row>


          <Form.Item {...layout2}
            label="Specification" name="specification"
              rules={[
                {
                  required: true,
                  message: 'Please input your specification!',
                },
              ]}
            >
            <Input />
          </Form.Item>


          <Form.Item {...tailLayout}>
            <Row>
              <Col span={6}>
                <Button type="primary" htmlType="submit">
                  {props.mode==='update'?"Edit":"Create"}
                </Button>
              </Col>
              <Col span={6}>
                <Button onClick={() => { router.push('/coming-soon') }} type="warning">
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
