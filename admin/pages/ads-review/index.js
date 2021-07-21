import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Select, Radio, Modal, Layout, Card, Row, Col, Input, Button } from 'antd';
import SideBar from '../../components/SideBar'
import Cookie from "js-cookie";
import { parseCookies } from "../../lib/parseCookies";
import { Table, Space } from 'antd';
import Link from 'next/link'
import moment from 'moment'
import _ from 'lodash';
import { API_URL } from '../../api'
import axios from 'axios';
const { Option } = Select;
const { Header, Content } = Layout;

const Index = (props) => {
  const {userInfo, usernames} = props

  const router = useRouter()
  const [ loaded, setLoaded ] = useState(false)
  const [ users, setUsers ] = useState(usernames)
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
  const [ filterUser, setFilterUser ] = useState("")
  const [ filterCondition, setFilterCondition ] = useState("")
  const [ sortBy, setSortby ] = useState({})
  const [ selectedRow,setSelectedRow]=useState([])
  const [ showTwo,setShowTwo] =useState(false)

  
  // const getUsers=()=>{
  //   if (!loaded){return}
  //   axios.get(`${API_URL}api/users`,
  //     {
  //       params: {
  //         limit:99,
  //       },
  //       headers: {
  //         'Authorization': `Bearer ${JSON.parse(userInfo).access_token}` 
  //       }
  //     },
  //   )
  //   .then(async (res) => {
  //     setUsers(res.data.data)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }

  const getData=()=>{
    if (!loaded){return}

    console.log({filterUser})
    axios.get(`${API_URL}api/ads`,
      {
        params: {
          s:filterS,
          createdBy:filterUser,
          condition:filterCondition,
          page,
          sort:sortBy,
          limit:limit,
        },
        headers: {
          'Authorization': `Bearer ${JSON.parse(userInfo).access_token}` 
        }
      },
    )
    .then(async (res) => {
      let check=res.data.data
      let checkData={}
      check=_.map(check,function(r){
        return r.featured==1
      })
      checkData=_.compact(check)
      if(checkData.length>=3){
        setShowAlert(true)
      }else{
        setShowAlert(false)
      }
      let { total, data, limit, page } = res.data
      console.log({data})
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
    setLoaded(true)
  },[])

  useEffect(()=>{
    if(loaded){
      getData()
      // getUsers()
    }
  },[loaded])

  useEffect(()=>{
    clearTimeout(typingTimeout) 
    setTypingTimeout( setTimeout(() => { getData() }, 500))
  },[filterS])

  useEffect(()=>{
    getData()
  },[filterCondition])

  useEffect(()=>{
    getData()
  },[page, sortBy, filterUser])

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
    axios.put(`${API_URL}api/ads/${i}`,
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

  const applyFeatured=()=>{
    selectedRow.map((i,index)=>{
      axios.put(`${API_URL}api/ads/${i}`,
        { Featured:'1' },
        { headers: {
            'Authorization': `Bearer ${JSON.parse(userInfo).access_token}`
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

  const applyUnFeatured=()=>{
    console.log('2')

    selectedRow.map((i,index)=>{
      axios.put(`${API_URL}api/ads/${i}`,
        { Featured:'0' },
        { headers: {
            'Authorization': `Bearer ${JSON.parse(userInfo).access_token}`
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

  const renderUsername =(v)=>{
    let index = _.findIndex(users,["id", v])
    if(index>=0){
      return <span style={{width:'100%', textAlign:'center'}}>{users[index].username}</span>
    }
    return ""
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
      title: "Created By",
      dataIndex: 'createdBy',
      key: 'createBy',
      fixed:'left',
      width: '15%',
      render: (t, r) => renderUsername(t)
    },
    {
      title: 'Action',
      key: 'action',
      fixed:'right',
      width: '20%',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>router.push('/ads/update/' + record.id)}>Update</a>
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
        <SideBar activeMenu='4' />
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
                <h3>Manage Ads Reviews</h3>
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
                    <Col offset={1} span={8}>
                      <Select 
                        showSearch
                        style={{ margin:10, width: 200 }}
                        placeholder="Select a user"
                        onChange={e=>setFilterUser(e)}
                        // onBlur={e=>setFilterUser(e)}
                        // onSearch={e=>setFilterUser(e)}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >{users.map(i=>{
                        return <Option key={i.id} value={i.id}>{i.username}</Option>
                      })}
                    </Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{margin:10}} span={8}>
                      <Radio.Group onChange={(e)=>{setFilterCondition(e.target.value), console.log(e.target.value)}} defaultValue="">
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
  let accessToken = JSON.parse(cookies.userInfo).access_token
  // console.log({cookies})
  let userdata = await axios.get(`${API_URL}api/users`,
      {
        params: {
          limit:99,
        },
        headers: {
          'Authorization': `Bearer ${accessToken}` 
        }
      },
  )
  let usernames = userdata.data.data.map(e=>{
    return {
      "username":e.username ,
      "id":e.id
    }
  })
  
  return {
    props:{
      userInfo: cookies.userInfo,
      usernames
    }
  }
}
