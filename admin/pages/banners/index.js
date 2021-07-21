import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Modal, Layout, Card, Row, Col, Input, Button } from 'antd';
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
  const [ limit, setLimit ] = useState(10)
  const [ page, setPage ] = useState(1)
  const [ showDeleteModal, setShowDeleteModal ] = useState(false)
  const [ activeId, setActiveId ] = useState(null)

  const [ typingTimeout, setTypingTimeout ] = useState(0)
  const [ sortBy, setSortby ] = useState({})
  const [ selectedRow,setSelectedRow]=useState([])
  const [ showTwo,setShowTwo] =useState(false)

  const getData=()=>{
    axios.get(`${API_URL}api/banners`,
      {
        params: {
          page,
          sort:sortBy,
          limit:limit,
        },
        headers: {
          'Authorization': `Bearer ${JSON.parse(userInfo).access_token}` 
        }
      },
    )
    .then((res) => {
      console.log(res.data)
      const { total, data, limit, page } = res.data
      setPage(page)
      // setLimit(limit)
      setTotal(total)
      setData(data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(()=>{
    getData()
  },[page, sortBy])

  useEffect(()=>{
    if(!_.isEmpty(selectedRow) && selectedRow[0]!=undefined){
      setShowTwo(true)

    }else{
      setShowTwo(false)
    }
  },[selectedRow])

  const deleteRec = () =>{
    axios.put(`${API_URL}api/banners/${activeId}`,
      { Status:'2' },
      { headers: {
          'Authorization': `Bearer ${JSON.parse(userInfo).access_token}`
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

  const deleteMulti=()=>{
    selectedRow.map((i,index)=>{
    axios.put(`${API_URL}api/banners/${i}`,
      { Status:'2' },
      { headers: {
          'Authorization': `Bearer ${JSON.parse(userInfo).access_token}`
      } 
    }).then(()=>{
      getData()
      setShowDeleteModal(false)
      setSelectedRow([])

    }).catch((err) => {
      setShowDeleteModal(false)
      setSelectedRow([])
    })

    })
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'make',
      fixed:'left',
      width: '20%',
    },
    {
      title: "Url",
      dataIndex: 'url',
      key: 'url',
      fixed:'left',
      width: '40%',
    },
    {
      title: "Type",
      dataIndex: 'type',
      key: 'type',
      fixed:'left',
      width: '20%',
      render: (v, r) => {
        return v==='0'?"Main":"Side"
      }
    },
    {
      title: 'Action',
      key: 'action',
      fixed:'right',
      width: '20%',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>router.push('/banners/update/' + record.id)}>Update</a>
          <a onClick={()=>{
            setActiveId(record.id) 
            setShowDeleteModal(true)}}>Delete</a>
        </Space>
      ),
    },
  ];

  function selectRow (record) {
    const selectedRowKeys = [...selectedRow];
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    } else {
      selectedRowKeys.push(record.key);
    }
    setSelectedRow(selectedRowKeys);
  }
  
  function onSelectedRowKeysChange(selectedRowKeys){
    setSelectedRow(selectedRowKeys);
  }

  const rowSelection = {
    selectedRow,
    onChange: onSelectedRowKeysChange,
  };

  return (
    <>
      <Head>
        <title>Aneka Auto</title>
        <meta name="og:title" content="Aneka Auto" key="title" />
      </Head>
      <Layout>
        <SideBar activeMenu='9' />
        <Layout className="site-layout" style={{ marginLeft: 150 }}>
          <Header >
          </Header>
          <Content style={{minHeight:'100vh',margin:10, padding:20, backgroundColor:'#fff'}}>
            <Modal
              title="Delete Model"
              visible={showDeleteModal}
              onOk={()=>!_.isEmpty(selectedRow) && selectedRow[0]!=undefined?deleteMulti():deleteRec()}
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
                <h3>Manage Banners</h3>
              </Col>
              <Col span={4}>
                <Link href='/banners/new'><h3 style={{textAlign:'right'}}><a>Create</a></h3></Link>
              </Col>
            </Row>
            
            <Row>
              <Col span={24}>
                <Card>
                  <Row>
                    <Col style={{margin:10, marginTop:15}}span={1}><h4>Search</h4></Col>
                  </Row>
                  {showTwo?<Button type="warning" onClick={() => {setShowDeleteModal(true) }}>Delete</Button>:null}

                  <Table bordered size="small" rowKey="id"  
                    rowSelection={rowSelection}
                    onRow={(record) => ({
                      onClick: () => {
                        selectRow(record);
                      },
                    })}
                    onChange={(p, f, s)=>{
                      if(p){
                        setPage(p.current)
                      }
                      if(s){
                        if(Array.isArray(s)){
                          // let sortValue = {}
                          // s.map(i=>{
                          //   const {columnKey, order} = i
                          //   sortValue[columnKey]=order==='ascend'?1:-1
                          // })
                          // setSortby(sortValue)
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
