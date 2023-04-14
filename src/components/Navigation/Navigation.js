import './Navigation.css'
import {Menu, Layout} from 'antd'
import {getNavigateItem} from '../../utils/utils'
import {UserOutlined} from '@ant-design/icons'
const {Sider} = Layout
const navigationLinks = [
  getNavigateItem('sub1', 'Profile', '/profile', <UserOutlined />),
]

function Navigation() {
  return (
    <Sider style={{backgroundColor: 'transparent'}}>
      <Menu
        theme={'dark'}
        defaultSelectedKeys={['sub1']}
        items={navigationLinks}
      />
    </Sider>
  )
}

export default Navigation
