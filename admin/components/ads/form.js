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

const SortableItem = SortableElement(({value,onRemove}) => {
  return <div key={value.uid} style={{width:100, height:100, margin:5, textAlign:"center", float:'left', backgroundColor:"lightgrey", borderRadius:15}}>
    {value.response?<img style={{width:'100%', height:'100%'}} src={value.response} />:<p style={{marginTop:'35%',textAlign:'center'}}>Uploading...</p>}
    <button  style={{cursor:'pointer',position:'absolute',borderRadius:10,marginLeft:-15,marginTop:-5,fontSize:10}} onClick={() => onRemove(value.uid)}>
        X
      </button>
    </div>
});

const SortableList = SortableContainer(({items,onRemove}) => {
  return (
    <div style={{width:"100%", padding:15, paddingLeft:20, overflow: "auto",backgroundColor:"lightblue"}} >
      {items.map((value, index) => (
        <div id={"item_" + value.id} key={`item-${value.uid}`}>
          <SortableItem  key={`item-${index}`} index={index} value={value} onRemove={onRemove} />
        </div>
      ))}
    </div>
  );
});

const App = (props) => {
  const { condition, mileage, remark, price, title, description,
   images, make, model, year, variant,engine,transmission
  } = props.data
  const [form] = Form.useForm();

  const router = useRouter()  
  const [formErr, setFormErr] = useState('')
  const [imageList, setImageList] = useState([])
  const [makeList, setMakeList] = useState([])
  const [modelList, setModelList] = useState([])
  const [yearList, setYearList] = useState([])
  const [variantList, setVariantList] = useState([])

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
      if(field === 'variant'){
        return setVariantList(res.data.result)
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
      let imageList = images.map((i,index)=>{
        console.log({i,index})
        return {response:i, uid:"img-"+index}
      })
      setImageList(imageList)

    }
    getParams("make",{})
  },[])
  

  const onSortEnd = ({oldIndex, newIndex}) => {
    setImageList(arrayMove(imageList, oldIndex, newIndex))
  };

  function onRemove(id){
    setImageList(imageList.filter(item => item.uid !== id))
    
  }


  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data", 'Authorization': `Bearer ${JSON.parse(Cookie.get("userInfo")).accessToken}` },
      // onUploadProgress: event => {
      //   const percent = Math.floor((event.loaded / event.total) * 100);
      //   setProgress(percent);
      //   if (percent === 100) {
      //     setTimeout(() => setProgress(0), 1000);
      //   }
      //   onProgress({ percent: (event.loaded / event.total) * 100 });
      // }
    };
    fmData.append("documents", file);
    try {
      const res = await axios.post(`${API_URL}upload/`,
        fmData,
        config
      );

      onSuccess(res.data[0]);
      console.log("server res: ", res);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };

  const uploadProps = {
    accept:"image/*",
    showUploadList:false,
    multiple: true,
    withCredentials:true,
    maxCount:20,
    fileList:imageList,
    onChange(info) {
      setImageList(info.fileList)
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  
  const onFinish = (values) => {
    const { title, description, condition, make, model, year, variant, mileage, remark, price,engine,transmission } = values
    // return  console.log({title, description, condition, make, model, year, variant, mileage, remark, price}, imageList.map(i=>i.response))
    let Images = imageList.map(i=>i.response)
    

    if(props.mode === 'update'){
      if(Images.length>0){
      return axios.put(`${API_URL}api/ads/${props.data.id}`,
        {
          Title:title,
          Description:description,
          Condition:condition,
          Transmission:transmission,
          Images,
          Make:make,
          Model:model,
          Year:year,
          Variant:variant,
          Mileage:mileage,
          Remark:remark,
          Price:price,
          Engine:engine
        },
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(Cookie.get("userInfo")).accessToken}`
          }
        }
      )
      .then((res) => {
        if(res.data.success){
          router.push('/ads')
        }else{
          setFormErr("Invalid " +  res.data[0].FailedField.split(".")[1] + " entered")  
        }
      })
      .catch((err) => {
        setFormErr("Model already exists")
      })}else{
        setFormErr("Please upload image")
  
      }
    }
    
    if(Images.length>0){
    axios.post(`${API_URL}api/ads`,
      {
        Title:title,
        Description:description,
        Condition:condition,
        Transmission:transmission,
        Images,
        Make:make,
        Model:model,
        Year:year,
        Variant:variant,
        Mileage:mileage,
        Remark:remark,
        Price:price,
        Status:"1",
        Engine:engine

      },
      {
        headers: {
          'Authorization': `Bearer ${JSON.parse(Cookie.get("userInfo")).accessToken}`
        }
      }
    )
    .then((res) => {
      console.log(res.data)
      if(res.data.success){
        router.push('/ads')
      }else{
        setFormErr("Invalid " +  res.data[0].FailedField.split(".")[1] + " entered")  
      }
    })
    .catch((err) => {
      setFormErr("Ads creation error")
      console.log(err)
    })}else{
      setFormErr("Please upload image")

    }

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {formErr ? <Alert message={formErr} closable type="error" showIcon /> : null}
      <Card style={{ marginTop: 20 }}>
        {imageList.length>0?<SortableList axis="xy" items={imageList} onSortEnd={onSortEnd} onRemove={onRemove} />:null}
        <Dragger {...uploadProps} 
          customRequest={uploadImage}
          >
          <p className="ant-upload-drag-icon"> <InboxOutlined /> </p>
          <p className="ant-upload-text"> Click or drag file to this area to upload </p>
          <p className="ant-upload-hint"> It is recommended to upload files with size that is not more than 10mb </p>
        </Dragger>

        <Form
          form={form}
          style={{marginTop:30}}
          {...layout}
          initialValues={{ condition, title, mileage, remark, price, make, model, year, variant, description,engine,transmission }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >

          <Row>
          <Col span={12}>
          <Form.Item
            name="condition"
            label="Condition"
            rules={[{ required: true, message: 'Please pick an item!' }]}
          >
            <Radio.Group size="middle">
              <Radio.Button value="0">RECON</Radio.Button>
              <Radio.Button value="1">USED</Radio.Button>
            </Radio.Group>
          </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item
            name="transmission"
            label="Transmission"
            rules={[{ required: true, message: 'Please pick an item!' }]}
          >
            <Radio.Group size="middle">
              <Radio.Button value="0">AUTO</Radio.Button>
              <Radio.Button value="1">MANUAL</Radio.Button>
            </Radio.Group>
          </Form.Item>
          </Col>
          </Row>

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
                label="Variant"
                name="variant"
                rules={[
                  {
                    required: true,
                    message: 'Please input your variant!',
                  },
                ]}
              >
                <Select>
                  {variantList.map(i=>(
                    <Option key={i} value={i}>{i}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item label="Mileage" name="mileage"
                rules={[
                  {
                    required: true,
                    message: 'Please input your mileage!',
                  },
                ]}
              >
                <Select onChange={(e)=>{}}>
                  {mileageRange.map(i=>(
                    <Option key={i} value={i}>{i}</Option>
                  ))}
                </Select>
                {/* <InputNumber 
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  style={{width:'100%', textAlign:'right'}}
                  min="0"
                  max="999999"
                  step="5000" /> */}
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
            label="Title" name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input your title!',
                },
              ]}
            >
            <Input />
          </Form.Item>

          <Form.Item {...layout2} label="Description" name="description"
            rules={[
              {
                required: true,
                message: 'Please input your description!',
              },
            ]}
          >
            <TextArea rows={10} />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Row>
              <Col span={6}>
                <Button type="primary" htmlType="submit">
                  {props.mode==='update'?"Edit":"Create"}
                </Button>
              </Col>
              <Col span={6}>
                <Button onClick={() => { router.push('/ads') }} type="warning">
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
