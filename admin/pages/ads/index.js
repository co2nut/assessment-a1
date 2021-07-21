import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Radio, Modal, Layout, Card, Row, Col, Input, Button } from 'antd';
import SideBar from '../../components/SideBar'
import Cookie from "js-cookie";
import { parseCookies } from "../../lib/parseCookies";
import { Table, Space } from 'antd';
import Link from 'next/link'
import moment from 'moment'
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
  const [ showFeaturedModal, setShowFeaturedModal ] = useState(false)
  const [ showAlert,setShowAlert] = useState(false)
  const [ activeId, setActiveId ] = useState(null)
  const [ typeFeatured, setTypeFeatured ] = useState(null)

  const [ typingTimeout, setTypingTimeout ] = useState(0)
  const [ filterS, setFilterS ] = useState("")
  const [ filterCondition, setFilterCondition ] = useState("")
  const [ sortBy, setSortby ] = useState({createdAt:-1})
  const [ selectedRow,setSelectedRow]=useState([])
  const [ showTwo,setShowTwo] =useState(false)
  const [ totalFeatured,setTotalFeatured]=useState([])

  const getData=()=>{
    // console.log('get user',JSON.parse(userInfo).accessToken)
    // let createdBy = ''
    // if(userInfo.roles.indexOf('user') >=0){
    //   createdBy = userInfo.id
    // }

    // axios.get(`${API_URL}api/ads`, //gofiber
    console.log( JSON.parse(userInfo) )
    axios.get(`${API_URL}ads`,
      {
        params: {
          s:filterS,
          condition:filterCondition,
          page,
          sort:sortBy,
          limit:limit,
          createdBy:props.userData
        },
        headers: {
          'Authorization': `Bearer ${JSON.parse(userInfo).accessToken}` 
        }
      },
    )
    .then((res) => {
      const { total, data, limit, page } = res.data
      console.log({total, data, limit, page})
      setPage(page)
      setLimit(limit)
      setTotal(total)
      setData(data)
    })
    .catch((err) => {
      console.log('1', {err})
    })
  }

  const getFeatured=()=>{
    // axios.get(`${API_URL}api/ads`, //gofiber
    axios.get(`${API_URL}ads`,
    {
      params: {
        featured:'1',
        limit:5,

      },
      headers: {
        'Authorization': `Bearer ${JSON.parse(userInfo).accessToken}` 
      }
    },
  ).then((res)=>{
    if(res.data.total>=3){
      setShowAlert(true)
    }else{
      setShowAlert(false)
    }
  })
  }

  useEffect(()=>{
    clearTimeout(typingTimeout) 
    setTypingTimeout( setTimeout(() => { 
      if(page > 1){
        return setPage(1)
       }
       return getData()
     }, 500))
  },[filterS])

  useEffect(()=>{
    if(page > 1){
     return setPage(1)
    }
    return getData()
  },[filterCondition])

  useEffect(()=>{
    getData()
  },[page, sortBy])

  useEffect(()=>{
    getFeatured()
  },[])

  useEffect(()=>{
    if(!_.isEmpty(selectedRow) && selectedRow[0]!=undefined){
      setShowTwo(true)

    }else{
      setShowTwo(false)
    }
  },[selectedRow])

  const deleteRec = () =>{
    axios.put(`${API_URL}api/ads/${activeId}`,
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

  const deleteMulti=()=>{
    selectedRow.map((i,index)=>{
    axios.put(`${API_URL}api/ads/${i}`,
      { Status:'2' },
      { headers: {
          'Authorization': `Bearer ${JSON.parse(userInfo).accessToken}`
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

  const applyFeatured=()=>{
    selectedRow.map((i,index)=>{
      axios.put(`${API_URL}api/ads/${i}`,
        { Featured:'1' },
        { headers: {
            'Authorization': `Bearer ${JSON.parse(userInfo).accessToken}`
        } 
      }).then(()=>{
        setSortby({"featured":-1})
        setShowFeaturedModal(false)
        getFeatured()
        setSelectedRow([])
      }).catch((err) => {
        setShowFeaturedModal(false)
        setSelectedRow([])
      })
  
      })
  }

  const applyUnFeatured=()=>{
    selectedRow.map((i,index)=>{
      axios.put(`${API_URL}api/ads/${i}`,
        { Featured:'0' },
        { headers: {
            'Authorization': `Bearer ${JSON.parse(userInfo).accessToken}`
        } 
      }).then(()=>{
        setSortby({"featured":-1})
        setShowFeaturedModal(false)
        setSelectedRow([])
      }).catch((err) => {
        setShowFeaturedModal(false)
        setSelectedRow([])
      })
  
      })
  }

  const columns = [
    {
      title: 'Title',
      sorter:true,
      dataIndex: 'title',
      key: 'title',
      fixed:'left',
      width: '20%',
    },
    {
      title: "Condition",
      dataIndex: 'condition',
      key: 'condition',
      fixed:'left',
      width: '15%',
      render: (t, r) => (
        <>{t==='0'?"RECON":"USED"}</>
      ),
    },
    {
      title: "Price",
      dataIndex: 'price',
      key: 'price',
      fixed:'right',
      width: '15%',
      render:(t,r) => {
        // console.log({t})
        return (<span style={{textAlign:'right'}}>{t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>)
      }
    },
    {
      title: "Remark",
      dataIndex: 'remark',
      key: 'remark',
      fixed:'left',
      width: '15%',
    },
    {
      title: "Created At",
      dataIndex: 'createdAt',
      key: 'createdAt',
      fixed:'left',
      width: '15%',
      render: (t, r) => (
        <>{moment(t).format("DD/MM/YYYY hh:m:s")}</>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      fixed:'right',
      width: '20%',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>router.push('/ads/update/' + record.id)}>Edit</a>
          <a onClick={()=>router.push('/ads/bump/' + record.id)}>Bump</a>
          {props.userData=='60ed6becde470b817eb990bc'?record.featured=='1'?<a onClick={()=>{
            setActiveId(record.id) 
            setTypeFeatured(1)
            setShowFeaturedModal(true)}}>UnFeatured</a>:<a onClick={()=>{
            setActiveId(record.id) 
            setTypeFeatured(0)
            setShowFeaturedModal(true)}}>Featured</a>:null}
          <a onClick={()=>{
            setActiveId(record.id) 
            setShowDeleteModal(true)}}>Delete</a>
        </Space>
      ),
    },
  ];

  function selectRow (record) {
    const selectedRowKeys = [...selectedRow];
    if (selectedRowKeys.indexOf(record.id) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1);
    } else {
      selectedRowKeys.push(record.id);
    }
    setSelectedRow(selectedRowKeys);
  }
  
  function onSelectedRowKeysChange(selectedRow){

    setSelectedRow(selectedRow);
  }

  const rowSelection = {
    selectedRowKeys:selectedRow,
    onChange: onSelectedRowKeysChange,
  };
  return (
    <>
      <Head>
        <title>Aneka Auto</title>
        <meta name="og:title" content="Aneka Auto" key="title" />
      </Head>
      <Layout>
        <SideBar activeMenu='2' />
        <Layout className="site-layout" style={{ marginLeft: 150 }}>
          <Header >
          </Header>
          <Content style={{minHeight:'100vh',margin:10, padding:20, backgroundColor:'#fff'}}>
            <Modal
              title="Delete Ads"
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
            <Modal
              title={typeFeatured==0?"Select Featured Ads":"Diselect Featured Ads"}
              visible={(showFeaturedModal&& !showAlert) || (showFeaturedModal&& typeFeatured==1)}
              onOk={()=>typeFeatured==0?applyFeatured():applyUnFeatured()}
              onCancel={()=>{
                setShowFeaturedModal(false)
                setActiveId(null) 
              }}
              okText="Select"
              cancelText="Cancel"
            >
              <p>Are you sure ?</p>
            </Modal>
            <Modal
              title={"The featured ads limit to 3 ads only"}
              visible={showFeaturedModal && showAlert && typeFeatured==0}
              onOk={()=>{setShowAlert(false);setShowFeaturedModal(false)}}
              onCancel={()=>{
                setShowFeaturedModal(false)
                setActiveId(null) 
              }}
              okText="OK"
              cancelText="Cancel"
            >
              <p>Please unselect featured ads first then ny select another ads to featured ads.</p>
            </Modal>
            <Row>
              <Col span={20}>
                <h3>Manage Ads</h3>
              </Col>
              <Col span={4}>
                <Link href='/ads/new'><h3 style={{textAlign:'right'}}><a>Create</a></h3></Link>
              </Col>
            </Row>
            
            <Row>
              <Col span={24}>
                <Card>
                  <Row>
                    <Col span={8}><Input placeholder="Search Here" style={{margin:10, width:"100%"}} allowClear value={filterS} onChange={e=>{ clearTimeout(typingTimeout) ,setFilterS(e.target.value) }} /></Col>
                  </Row>
                  <Row>
                    <Col style={{margin:10}} span={8}>
                      <Radio.Group onChange={(e)=>{setFilterCondition(e.target.value)}} defaultValue="">
                        <Radio.Button value="">ALL</Radio.Button>
                        <Radio.Button value="0">RECON</Radio.Button>
                        <Radio.Button value="1">USED</Radio.Button>
                      </Radio.Group>
                    </Col>
                  </Row>
                 {showTwo?
                 <>
                  <Button type="warning" onClick={() => {setShowDeleteModal(true) }}>Delete</Button> 
                  {/* <Button type="warning" onClick={() => {setShowFeaturedModal(true)}} style={{marginLeft:10}}>Featured</Button> */}
                 </>
                 :null}
                

                  <Table bordered size="small" rowKey="id"  
                    rowSelection={rowSelection}
                    onClick={() => {
                      selectRow(record);
                    }}
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
                      defaultCurrent:1,
                      current:page

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
  const id =  JSON.parse(parseCookies(req).userInfo).id;
  // const respond = await axios.get(`${API_URL}api/users/${id}`,{
  //   headers: {
  //     'Authorization': `Bearer ${accessToken}` 
  //   }
  // })

  return {
    props:{
      userInfo: cookies.userInfo,
      userData: id || {}
    }
  }
}
