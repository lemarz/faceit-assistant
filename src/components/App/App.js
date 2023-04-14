import './App.css'
import {NavLink, Route, Routes} from 'react-router-dom'
import {useEffect, useState} from 'react'
import logo from '../../images/logo.svg'
import {ConfigProvider, Layout, theme, Image, Avatar, Typography} from 'antd'
import Main from '../Main/Main'
import Authorization from '../Authorization/Authorization'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Profile from '../Profile/Profile'
import Navigation from '../Navigation/Navigation'

const {Header, Content} = Layout
const {Text} = Typography

const appTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    fontFamily: 'Manrope',
    colorPrimary: '#b37feb',
    colorBgBase: '#20242a',
  },
}

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuth')
    if (authStatus) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      setUserInfo(userInfo)
      setIsAuth(true)
    }
  }, [])

  return (
    <ConfigProvider theme={appTheme}>
      <Layout className='app'>
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
                    {userInfo.nickname}
                  </Text>
                  <Avatar src={userInfo.avatar} size={'large'} />
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
                  <Route
                    path='/profile'
                    element={
                      <Profile userInfo={userInfo} setIsAuth={setIsAuth} />
                    }
                  />
                </Route>
                <Route
                  element={
                    <ProtectedRoute isAuth={!isAuth} navigateTo='/profile' />
                  }>
                  <Route path='/' element={<Main />}></Route>

                  <Route
                    path='/authorization'
                    element={
                      <Authorization
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        setIsAuth={setIsAuth}
                      />
                    }></Route>
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
