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
  if(Cookie.get('userInfo')){
    userInfo= JSON.parse(Cookie.get('userInfo'))
    userInfo.roles = userInfo.user.roles //for feathers
  }
  
  
  return (
    <Sider
      // collapsible={true}
      width={170}
      style={{
      //   background: 'black',
        overflow: 'auto',
        height: '100%',
        position: 'fixed',
        left: 0,
      }}
    >
      <Menu theme="light" mode="inline" selectedKeys={[props.activeMenu]}>
        <div style={{ height: '50px', width: '100%', backgroundColor: "bledge", padding: '20%' }}><h3><span style={{fontWeight:'bolder'}}>Car</span><span>CMS</span></h3></div>

        {userInfo.roles?<>
          {/* <Menu.Item key="1" onClick={()=>router.push('/dashboard')} icon={<HomeOutlined />}>
            Home
            </Menu.Item> */}
            {userInfo.roles.indexOf('admin') >= 0?<>
              {/* <Menu.Item key="2" onClick={()=>router.push('/ads')} icon={<CarFilled />}>
              Car Ads
              </Menu.Item> */}
            <Menu.Item key="3" onClick={()=>router.push('/specs')} icon={<PlusSquareOutlined />}>
              Models
            </Menu.Item>
            {/* <Menu.Item key="4" onClick={()=>router.push('/ads-review')} icon={<BookOutlined />}>
              Ads Review
            </Menu.Item> */}
            <Menu.Item key="5" onClick={()=>router.push('/users')} icon={<UserOutlined />}>
              Users
              </Menu.Item>
            {/* <Menu.Item key="6" onClick={()=>router.push('/banners/manage')} icon={<FileImageOutlined />}>
              Banner
              </Menu.Item> */}
            {/* <Menu.Item key="7" onClick={()=>router.push('/coming-soon')} icon={<UnorderedListOutlined />}>
              Coming Soon
              </Menu.Item> */}
            </>:null}
  
            {userInfo.roles.indexOf('user') >= 0?<>
              <Menu.Item key="2" onClick={()=>router.push('/ads')} icon={<CarFilled />}>
                Car Ads
                </Menu.Item>
              </>:null}
  
            {userInfo.roles.indexOf('superadmin') >= 0?<>
              <Menu.Item key="9" onClick={()=>router.push('/banners')} icon={<UnorderedListOutlined />}>
                Banners
                </Menu.Item>
              </>:null}
        </>
        :null
        }
        
        <Menu.Item key="8" onClick={()=>{router.push('/')}} icon={<LogoutOutlined />}>
          Logout
          </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideBar

