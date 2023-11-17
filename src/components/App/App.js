import './App.css'

import { useEffect } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import {
  ConfigProvider,
  Layout,
  theme,
  Image,
  Avatar,
  Typography,
  message,
} from 'antd'

import Authorization from '../Authorization/Authorization'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Main from '../Main/Main'
import Profile from '../Profile/Profile'
import Navigation from '../Navigation/Navigation'

import { api } from '../../utils/Api'
import logo from '../../images/logo.svg'
import defaultAvatar from '../../images/avatar-default.jpeg'
import CommonMatches from '../CommonMatches/CommonMatches'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectIsAuth,
  selectUserInfo,
} from '../../redux/authorization/authorization.selectors'
import {
  setIsAuth,
  setUserInfo,
} from '../../redux/authorization/authorization.slice'

const APP_THEME = {
  algorithm: theme.darkAlgorithm,
  token: {
    fontFamily: 'Manrope',
    colorPrimary: '#b37feb',
    colorBgBase: '#20242a',
  },
}

function App() {
  const { Header, Content } = Layout
  const { Text } = Typography
  const [messageApi, contextHolder] = message.useMessage()

  const dispatch = useDispatch()
  const userInfo = useSelector(selectUserInfo)
  const isAuth = useSelector(selectIsAuth)

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuth')
    if (authStatus) {
      api
        .getUserInfo(userInfo?.nickname)
        .then((data) => {
          dispatch(setUserInfo(data))
          localStorage.setItem('userInfo', JSON.stringify(data))
        })
        .catch((err) => {
          messageApi.error('Произошла ошибка обновления профиля!')
          console.error(err)
        })
      dispatch(setIsAuth(true))
    }
  }, [])

  return (
    <ConfigProvider theme={APP_THEME}>
      <Layout className='app'>
        {contextHolder}
        <Header className='app__header'>
          <div className='app__header-container'>
            <NavLink to='/' className='app__logo-container'>
              <Image
                src={logo}
                height={64}
                preview={false}
                className='app__logo-img'
                alt='Логотип'
              />
              <Text className='app__logo-text'>Faceit Assistant</Text>
            </NavLink>
            <div className='app__profile'>
              {isAuth && (
                <NavLink to='/profile' className='header__profile'>
                  <Text underline={false} className='header__profile-nickname'>
                    {userInfo?.nickname}
                  </Text>
                  <Avatar
                    src={userInfo?.avatar || defaultAvatar}
                    size={'large'}
                  />
                </NavLink>
              )}
            </div>
          </div>
        </Header>
        <Layout className='app__content'>
          {isAuth && <Navigation />}
          <Layout className='app__content-layout'>
            <Content className='app__content-container'>
              <Routes>
                <Route
                  element={<ProtectedRoute isAuth={isAuth} navigateTo='/' />}>
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/common-matches' element={<CommonMatches />} />
                </Route>
                <Route
                  element={
                    <ProtectedRoute isAuth={!isAuth} navigateTo='/profile' />
                  }>
                  <Route path='/' element={<Main />}></Route>

                  <Route
                    path='/authorization'
                    element={<Authorization />}></Route>
                </Route>
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default App
