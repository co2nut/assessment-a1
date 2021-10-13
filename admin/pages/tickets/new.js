import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Layout, Card, Row, Col, Form, Input, Button, Alert } from 'antd';
import SideBar from '../../components/SideBar'
import axios from "axios"
import Cookie from "js-cookie";
import { parseCookies } from "../../lib/parseCookies";
import TicketForm  from '../../components/tickets/form'

const { Header, Content} = Layout;

const New = () => {
  return (
    <>
      <Head>
        <title>Ticketing System</title>
      </Head>
      <Layout>
        <SideBar activeMenu='1' />
        <Layout className="site-layout" style={{ marginLeft: 150 }}>
          <Header></Header>
          <Content style={{minHeight:'100vh',margin:10, padding:20, backgroundColor:'#fff'}}>
          <Row>
            <Col span={20}>
              <h3 style={{margin:0}}>Create Ticket</h3>
            </Col>

            <Col span={12} >
              <TicketForm  data={{ticketType:'', severity:'', priority:'', summary:'', descriptions:''}} mode="new"/>
              
            </Col>
          </Row>
            
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default New