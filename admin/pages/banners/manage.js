import { Upload, Col, Layout, Modal, Row } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { API_URL } from '../../api';
import SideBar from '../../components/SideBar';
import { parseCookies } from "../../lib/parseCookies";
import Cookie from "js-cookie";
var FormData = require('form-data');

const { Header, Content } = Layout;

const Index = (props) => {
  const { userInfo } = props
  const router = useRouter()
  const [data, setData] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [activeObj, setActiveObj] = useState(null)
  const [typingTimeout, setTypingTimeout] = useState(0)

  const [selectedRow, setSelectedRow] = useState([])

  const getData = () => {
    axios.get(`${API_URL}api/banners`,
      {
        headers: {
          'Authorization': `Bearer ${JSON.parse(userInfo).access_token}`
        }
      },
    )
      .then((res) => {
        const { data } = res.data
        setData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const uploadImage = async options => {
    if (options) {
      const { file } = options;
      const fmData = new FormData();
      const config = {
        headers: { "content-type": "multipart/form-data", 'Authorization': `Bearer ${JSON.parse(Cookie.get("userInfo")).access_token}` },
      };
      fmData.append("documents", file.originFileObj);
      try {
        const res = await axios.post(`${API_URL}uploadBanner/`,
          fmData,
          config
        );

        if (res.data.length > 0) {
          //update banner url
          axios.put(`${API_URL}api/banners/${activeId}`,
            {
              Url: res.data[0],
            },
            {
              headers: { 'Authorization': `Bearer ${JSON.parse(Cookie.get("userInfo")).access_token}` }
            })
            .then((res2) => {
              if (res2.data.success) {
                let index = _.findIndex(data, ['id', activeId])
                let tmpData = _.cloneDeep(data)
                if (index >= 0) {
                  tmpData[index].url = res.data[0]
                  setData(tmpData)
                }
              }
            })
            .catch((err) => { })
        }
      } catch (err) { }
    }
  };

  useEffect(() => {
    clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(() => { uploadImage(activeObj) }, 500))
  }, [activeObj])

  useEffect(() => {
    getData()
  }, [])

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
          <Content style={{ minHeight: '100vh', margin: 10, padding: 20, backgroundColor: '#fff' }}>
            <Modal
              title="Delete Model"
              visible={showDeleteModal}
              onOk={() => !_.isEmpty(selectedRow) && selectedRow[0] != undefined ? deleteMulti() : deleteRec()}
              onCancel={() => {
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
            </Row>
            <Row>
              <Col span={20}>
                {data.map(i => {
                  return <div key={i.id}><h3>{i.title}</h3><Upload
                    style={{ width: '100px' }}
                    name={i.title}
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    // beforeUpload={beforeUpload}
                    onChange={(e) => { clearTimeout(typingTimeout), setActiveObj(e), setActiveId(i.id) }}
                  >
                    {i.url ? <img src={i.url} alt="avatar" style={{ width: '100%' }} /> : <div style={{ marginTop: 8 }}>Upload</div>}
                  </Upload></div>
                })}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>

    </>
  )
}

export default Index

export async function getServerSideProps({ req }) {
  const cookies = parseCookies(req);
  return {
    props: {
      userInfo: cookies.userInfo
    }
  }
}
