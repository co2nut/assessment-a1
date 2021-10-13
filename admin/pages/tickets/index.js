import { Tag, Button, Card, Col, Input, Layout, Modal, Row, Space, Table } from 'antd';
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
  const [ filterSummary, setFilterSummary ] = useState("")

  const priorities = { 1: 'urgent', 2: 'high', 3: 'medium', 4: 'low' }
  const severities = { 1: 'urgent', 2: 'high', 3: 'medium', 4: 'low' }

  const getData=()=>{
    let skip = page>1?((page-1)*limit):0

    axios.get(`${API_URL}tickets`,
      {
        params: {
          // orRegexOr:[
          //   { make: filterSummary },
          // ],
          status:'1',
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
  },[filterSummary ])

  useEffect(()=>{
    getData()
  },[page])

  const deleteRec = () =>{
    axios.patch(`${API_URL}tickets/${activeId}`,
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
      title: 'Ticket Type',
      dataIndex: 'ticketType',
      key: '1',
    },
    {
      title: "Summary",
      dataIndex: 'summary',
      key: '2',
    },
    {
      title: "Severity",
      dataIndex: 'severity',
      key: '3',
      render: (v, r) => (<Tag>{severities[v].toUpperCase()}</Tag>)
    },
    {
      title: "Priority",
      dataIndex: 'priority',
      key: '4',
      render: (v, r) => (<Tag>{priorities[v].toUpperCase()}</Tag>)
    },
    {
      title: "Summary",
      dataIndex: 'summary',
      key: '5',
    },
    {
      title: 'Action',
      key: 'action',
      fixed:'right',
      width: '20%',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>router.push('/tickets/update/' + record._id)}>Edit</a>
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
        <title>Ticket Management System</title>
        <meta name="og:title" content="Ticketing System" key="title" />
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
                <h3>Manage Tickets</h3>
              </Col>
              <Col span={4}>
                <Link href='/tickets/new'><h3 style={{textAlign:'right'}}><a>Create</a></h3></Link>
              </Col>
            </Row>
            
            <Row>
              <Col span={24}>
                <Card>
                  <Row>
                    <Col style={{margin:10, marginTop:15}}span={1}><h4>Search</h4></Col>
                    <Col span={4}><Input placeholder="Summary" style={{margin:10, width:"90%"}} allowClear value={filterSummary} onChange={e=>{ clearTimeout(typingTimeout) ,setFilterSummary(e.target.value) }} /></Col>
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
