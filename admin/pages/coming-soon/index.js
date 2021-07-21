import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import { parseCookies } from "../../lib/parseCookies";
import Head from 'next/head'
import { Layout, Menu, Card, Row, Col,Table, Form, Input, Button, Modal,Space } from 'antd';
import SideBar from '../../components/SideBar'
const { Header, Content, Footer, Sider,} = Layout;
import { API_URL } from '../../api'
import axios from 'axios';
import _ from 'lodash';
import Link from 'next/link'

const Index = (props) => {
  const {userInfo} = props
  const router = useRouter()
  const [ data, setData ] = useState([])
  const [ total, setTotal ] = useState(0)
  const [ limit, setLimit ] = useState(15)
  const [ page, setPage ] = useState(1)
  const [ showDeleteModal, setShowDeleteModal ] = useState(false)
  const [ activeId, setActiveId ] = useState(null)

  const [ typingTimeout, setTypingTimeout ] = useState(0)
  const [ filterMake, setFilterMake ] = useState("")
  const [ filterModel, setFilterModel ] = useState("")
  const [ filterYear, setFilterYear ] = useState("")
  const [ filterCode, setFilterCode ] = useState("")
  const [ sortBy, setSortby ] = useState({createdAt:-1})
  const [ showTwo,setShowTwo] =useState(false)
  const [ selectedRow,setSelectedRow]=useState([])


  const getData=()=>{
    axios.get(`${API_URL}api/comingsoon`,
      {
        params: {
          make: filterMake,
          model: filterModel,
          year: filterYear,
          code: filterCode,
          page,
          sort:sortBy,
          limit:limit,
        },
 
      },
    )
    .then((res) => {
      const { total, data, limit, page } = res.data
      setPage(page)
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
    clearTimeout(typingTimeout) 
    setTypingTimeout( setTimeout(() => { getData() }, 500))
  },[filterMake, filterModel, filterYear, filterCode])

  useEffect(()=>{
    if(!_.isEmpty(selectedRow) && selectedRow[0]!=undefined){
      setShowTwo(true)

    }else{
      setShowTwo(false)
    }
  },[selectedRow])

  const deleteRec = () =>{
    axios.put(`${API_URL}api/comingsoon/${activeId}`,
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
    axios.put(`${API_URL}api/comingsoon/${i}`,
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
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
        fixed:'left',
        width: '20%',
    },
    {
        title: 'Make',
        sorter:true,
        dataIndex: 'make',
        key: 'make',
        fixed:'left',
        width: '20%',
    },
    {
        title: 'Model',
        sorter:true,
        dataIndex: 'model',
        key: 'model',
        fixed:'left',
        width: '20%',
    },
    {
        title: 'CC',
        dataIndex: 'engine',
        key: 'engine',
        fixed:'left',
        width: '20%',
    },
    {
        title: 'Color',
        dataIndex: 'color',
        key: 'color',
        fixed:'left',
        width: '20%',
    },
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        fixed:'left',
        width: '20%',
    },
    {
        title: 'Specification',
        dataIndex: 'specification',
        key: 'specification',
        fixed:'left',
        width: '20%',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        fixed:'left',
        width: '20%',
        render:(t,r) => {
          return (<span style={{textAlign:'right'}}>{t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>)
        }
    },
    {
        title: 'Remark',
        dataIndex: 'remark',
        key: 'remark',
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
          <a onClick={()=>router.push('/coming-soon/update/' + record.id)}>Edit</a>
          <a onClick={()=>{
            setActiveId(record.id) 
            setShowDeleteModal(true)}}>Delete</a>
        </Space>
      ),
    },
  ]

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
        <SideBar activeMenu='7' />
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
          <Row>
              <Col span={20}>
                <h3>Manage Coming Soon</h3>
              </Col>
              <Col span={4}>
                <Link href='/coming-soon/new'><h3 style={{textAlign:'right'}}><a>Create</a></h3></Link>
              </Col>
          </Row>
          <Row>
            <Col style={{margin:10, marginTop:15}}span={1}><h4>Search</h4></Col>
            <Col span={4}><Input placeholder="Make" style={{margin:10, width:"90%"}} allowClear value={filterMake} onChange={e=>{ clearTimeout(typingTimeout) ,setFilterMake(e.target.value) }} /></Col>
            <Col span={4}><Input placeholder="Model" style={{margin:10, width:"90%"}} allowClear value={filterModel} onChange={e=>{ clearTimeout(typingTimeout) ,setFilterModel(e.target.value) }} /></Col>
            <Col span={4}><Input placeholder="Year" style={{margin:10, width:"90%"}} allowClear value={filterYear} onChange={e=>{ clearTimeout(typingTimeout) ,setFilterYear(e.target.value) }} /></Col>
            <Col span={4}><Input placeholder="Code" style={{margin:10, width:"90%"}} allowClear value={filterCode} onChange={e=>{ clearTimeout(typingTimeout) ,setFilterCode(e.target.value) }} /></Col>
          </Row>
          <div className={'container'}> 
          {showTwo?
          <>
          <Button type="warning" onClick={() => {setShowDeleteModal(true) }}>Delete</Button> 
          </>
          :null}
      <Table dataSource={data} columns={columns} rowKey="id"  
       rowSelection={rowSelection}
         onClick={ (record) => {
           selectRow(record);
         }}
       onChange={(p, f, s)=>{
         if(p){
           setPage(p.current)
         }
         if(s){
           if(Array.isArray(s)){
           }else{
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

       }} style={{marginTop:20}}
        />
      </div>
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
