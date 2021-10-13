import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Tag, Modal, Layout, Card, Row, Col, Input,Button } from 'antd';
import SideBar from '../../components/SideBar'
import Cookie from "js-cookie";
import { parseCookies } from "../../lib/parseCookies";
import { Table, Space } from 'antd';
import Link from 'next/link'
import _ from 'lodash';
import { API_URL } from '../../api'
import axios from 'axios';

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
  const [ filterUsername, setFilterUsername ] = useState("")
  const [ filterPassword, setFilterPassword ] = useState("")
  const [ sortBy, setSortby ] = useState({})
  const [ selectedRow,setSelectedRow]=useState([])
  const [ showTwo,setShowTwo] =useState(false)

  const getData=()=>{
    let skip = page>1?((page-1)*limit):0

    axios.get(`${API_URL}users`,
      {
        params: {
          orRegexOr:[
            { username: filterUsername },
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
      console.log(res.data)
      const { total, data, limit, page } = res.data
      setPage(page)
      setLimit(limit)
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
  },[filterUsername, filterPassword])

  useEffect(()=>{
    console.log({sortBy})
    getData()
  },[page, sortBy])

  useEffect(()=>{
    if(!_.isEmpty(selectedRow) && selectedRow[0]!=undefined){
      setShowTwo(true)

    }else{
      setShowTwo(false)
    }
  },[selectedRow])

  const deletpatcheRec = () =>{
    axios.put(`${API_URL}users/${activeId}`,
      { Status:'2' },
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

  const deleteRec = () =>{
    axios.patch(`${API_URL}users/${activeId}`,
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
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      fixed:'left',
      width: '40%',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (v, r) => {
        return v.map(i=>(
          <Tag>{i}</Tag>
        ))
      }
    },
    {
      title: 'Action',
      key: 'action',
      fixed:'right',
      width: '20%',
      render: (text, record) => ( 
        <Space size="middle">
          <a onClick={()=>router  .push('/users/update/' + record._id)}>Update</a>
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
        <title>Ticket Management System </title>
        <meta name="og:title" content="Ticketing System" key="title" />
      </Head>
      <Layout>
        <SideBar activeMenu='5' />
        <Layout className="site-layout" style={{ marginLeft: 150 }}>
          <Header >
          </Header>
          <Content style={{minHeight:'100vh',margin:10, padding:20, backgroundColor:'#fff'}}>
            <Modal
              title="Delete User"
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
              <Col span={8}>
                <h3>Manage Users</h3>
              </Col>
              <Col span={4}>
                <Link href='/users/new'><h3 style={{textAlign:'right'}}><a>Create</a></h3></Link>
              </Col>
            </Row>
            
            <Row>
              <Col span={12}>
                <Card>
                  <Row>
                    <Col style={{margin:10, marginTop:15}} span={2}><h4>Search</h4></Col>
                    <Col span={4}><Input placeholder="Username" style={{margin:10, width:"90%"}} allowClear value={filterUsername} onChange={e=>{ clearTimeout(typingTimeout) ,setFilterUsername(e.target.value) }} /></Col>
                    {/* <Col span={4}><Input placeholder="Password" style={{margin:10, width:"90%"}} allowClear value={filterPassword} onChange={e=>{ clearTimeout(typingTimeout) ,setFilterPassword(e.target.value) }} /></Col> */}
                  </Row>
                  {showTwo?<Button type="warning" onClick={() => {setShowDeleteModal(true) }}>Delete</Button>:null}
                

                  <Table bordered size="small" rowKey="id"  
                    onChange={(p, f, s)=>{
                      if(p){
                        setPage(p.current)
                      }
                      if(s){
                        if(Array.isArray(s)){
                        }else{
                          console.log({s})
                          const {columnKey, order} = s
                          let sortValue = {}
                          sortValue[columnKey]=order==='ascend'?1:-1
                          setSortby(sortValue)
                        }
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
