import {
  CarFilled, LogoutOutlined, PlusSquareOutlined, UnorderedListOutlined, UserOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Cookie from "js-cookie";
import { useRouter } from 'next/router';
import React from 'react';

const { Sider } = Layout

const SideBar = (props) => {
  const router = useRouter()
  let userInfo = {}
  if (Cookie.get('userInfo')) {
    userInfo = JSON.parse(Cookie.get('userInfo'))
    userInfo.roles = userInfo.user.roles

    // console.log({userInfo})
  }


  return (
    <Sider
      width={170} 
      style={{
        overflow: 'auto',
        height: '100%',
        position: 'fixed',
        left: 0,
      }}
    >
      <Menu theme="light" mode="inline" selectedKeys={[props.activeMenu]}>
        <div style={{ height: '50px', width: '100%', backgroundColor: "bledge", padding: '20%' }}><h3><span style={{ fontWeight: 'bolder' }}>Menu</span></h3></div>

        {userInfo.roles ? <>
          {userInfo.roles.indexOf('admin') >= 0 ? <>
            <Menu.Item key="1" onClick={() => router.push('/parameters')} icon={<UserOutlined />}>
              Parameters
            </Menu.Item>
            <Menu.Item key="2" onClick={() => router.push('/users')} icon={<UserOutlined />}>
              Users
            </Menu.Item>
            <Menu.Item key="3" onClick={() => router.push('/tickets')} icon={<PlusSquareOutlined />}>
              Tickets
            </Menu.Item>
          </> : <Menu.Item key="3" onClick={() => router.push('/tickets')} icon={<PlusSquareOutlined />}>
              Tickets
            </Menu.Item>}
        </>
          : null
        }

        <Menu.Item key="8" onClick={() => { router.push('/') }} icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideBar

