import './Navigation.css'

import {Menu, Layout} from 'antd'
import {UserOutlined} from '@ant-design/icons'

import {getNavigateItem} from '../../utils/utils'
const navigationLinks = [
  getNavigateItem('sub1', 'Profile', '/profile', <UserOutlined />),
]

function Navigation() {
  const {Sider} = Layout
  return (
    <Sider
      style={{backgroundColor: 'transparent'}}
      width={150}
      theme={'dark'}
      // collapsible={true}
      breakpoint={'md'}>
      <Menu
        theme={'dark'}
        defaultSelectedKeys={['sub1']}
        items={navigationLinks}
      />
    </Sider>
  )
}

export default Navigation
