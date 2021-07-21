import { Button, Card, Col, Input, Layout, Modal, Row, Space, Table } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { API_URL } from '../../api';
import SideBar from '../../components/SideBar';
import { parseCookies } from "../../lib/parseCookies";

const { Header, Content } = Layout;

const Index = (props) => {
  const {userInfo} = props
  const router = useRouter()
  const [ data, setData ] = useState([])
  const [ total, setTotal ] = useState(0)
  const [ limit, setLimit ] = useState(5)
  const [ page, setPage ] = useState(1)
  const [ showDeleteModal, setShowDeleteModal ] = useState(false)
  const [ activeId, setActiveId ] = useState(null)

  const [ typingTimeout, setTypingTimeout ] = useState(0)
  const [ filterMake, setFilterMake ] = useState("")
  const [ filterModel, setFilterModel ] = useState("")
  const [ filterYear, setFilterYear ] = useState("")
  const [ filterVariant, setFilterVariant ] = useState("")

  const getData=()=>{
    let skip = page>1?((page-1)*limit):0

    axios.get(`${API_URL}specs`,
      {
        params: {
          orRegexOr:[
            { make: filterMake },
            { model: filterModel },
            { year: filterYear } ,
            { variant: filterVariant } ,
          ],
          status:'1',
          $skip:skip,
          $limit:limit,
        },
        headers: {
          'Authorization': `Bearer ${JSON.parse(userInfo).accessToken}` 
        }
      },
    )
    .then((res) => {
      const { total, data } = res.data
      console.log({total})
      setTotal(total)
      setData(data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(()=>{
    clearTimeout(typingTimeout) 
    setTypingTimeout( setTimeout(() => { getData() }, 500))
  },[filterMake, filterModel, filterYear, filterVariant])

  useEffect(()=>{
    getData()
  },[page])

  const deleteRec = () =>{
    axios.patch(`${API_URL}specs/${activeId}`,
      { status:'2' },
      { headers: {
          'Authorization': `Bearer ${JSON.parse(userInfo).accessToken}`
      } }
    )
    .then((res) => {
      getData()
      setShowDeleteModal(false)
    })
    .catch((err) => {
      setShowDeleteModal(false)
      setActiveId(null)
    })
  }

  const columns = [
    {
      title: 'Make',
      dataIndex: 'make',
      key: 'make',
      fixed:'left',
      width: '20%',
    },
    {
      title: "Model",
      dataIndex: 'model',
      key: 'model',
      fixed:'left',
      width: '20%',
    },
    {
      title: "Year",
      dataIndex: 'year',
      key: 'year',
      fixed:'left',
      width: '20%',
    },
    {
      title: "Variant",
      dataIndex: 'variant',
      key: 'variant',
      fixed:'left',
      width: '20%',
    },
    {
      title: 'Action',
      key: 'action',
      fixed:'right',
      width: '20%',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>router.push('/specs/update/' + record._id)}>Edit</a>
          <a onClick={()=>{
            setActiveId(record._id) 
            setShowDeleteModal(true)}}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Car CMS</title>
        <meta name="og:title" content="Aneka Auto" key="title" />
      </Head>
      <Layout>
        <SideBar activeMenu='3' />
        <Layout className="site-layout" style={{ marginLeft: 150 }}>
          <Header >
          </Header>
          <Content style={{minHeight:'100vh',margin:10, padding:20, backgroundColor:'#fff'}}>
            <Modal
              title="Delete Model"
              visible={showDeleteModal}
              onOk={()=>deleteRec()}
              onCancel={()=>{
                setShowDeleteModal(false)
                setActiveId(null) 
              }}
              okText="Delete"
              cancelText="Cancel"
            >
              <p>Are you sure ?</p>
            </Modal>
            <Row>
              <Col span={20}>
                <h3>Manage Models</h3>
              </Col>
              <Col span={4}>
                <Link href='/specs/new'><h3 style={{textAlign:'right'}}><a>Create</a></h3></Link>
              </Col>
            </Row>
            
            <Row>
              <Col span={24}>
                <Card>
                  <Row>
                    <Col style={{margin:10, marginTop:15}}span={1}><h4>Search</h4></Col>
                    <Col span={4}><Input placeholder="Make" style={{margin:10, width:"90%"}} allowClear value={filterMake} onChange={e=>{ clearTimeout(typingTimeout) ,setFilterMake(e.target.value) }} /></Col>
                    <Col span={4}><Input placeholder="Model" style={{margin:10, width:"90%"}} allowClear value={filterModel} onChange={e=>{ clearTimeout(typingTimeout) ,setFilterModel(e.target.value) }} /></Col>
                    <Col span={4}><Input placeholder="Year" style={{margin:10, width:"90%"}} allowClear value={filterYear} onChange={e=>{ clearTimeout(typingTimeout) ,setFilterYear(e.target.value) }} /></Col>
                    <Col span={4}><Input placeholder="Variant" style={{margin:10, width:"90%"}} allowClear value={filterVariant} onChange={e=>{ clearTimeout(typingTimeout) ,setFilterVariant(e.target.value) }} /></Col>
                  </Row>
                  <Table bordered size="small" rowKey="id"  
                    onChange={(p, f, s)=>{
                      if(p){
                        setPage(p.current)
                      }
                    }}
                    pagination={{
                      size:"large",
                      total:total,
                      showSizeChanger:false,
                      pageSize:limit,
                      defaultCurrent:1
                    }} style={{marginTop:20}} columns={columns} dataSource={data} />
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>

    </>
  )
}

export default Index

export async function getServerSideProps({req}) {
  const cookies = parseCookies(req);
  return {
    props:{
      userInfo: cookies.userInfo
    }
  }
}
