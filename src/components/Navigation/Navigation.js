import './Navigation.css'

import { Menu, Layout } from 'antd'
import { BlockOutlined, UserOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'

import { getNavigateItem } from '../../utils/utils'

const navigationLinks = [
  getNavigateItem('Профиль', '/profile', <UserOutlined />),
  getNavigateItem('Общие матчи', '/common-matches', <BlockOutlined />),
]

function Navigation() {
  const { Sider } = Layout
  const location = useLocation()

  return (
    <Sider
      style={{ backgroundColor: 'transparent', height: '100%' }}
      width={170}
      theme={'dark'}
      // collapsible={true}
      breakpoint={'lg'}>
      <Menu
        theme={'dark'}
        defaultSelectedKeys={['sub1']}
        selectedKeys={location.pathname}
        items={navigationLinks}
      />
    </Sider>
  )
}

export default Navigation
