import './Authorization.css'

import { useNavigate } from 'react-router-dom'
import { Avatar, Button, Form, Input, Modal, Typography, message } from 'antd'

import { Api } from '../../utils/Api'

import { getLevelBadge, preventInvalidInput } from '../../utils/utils'
import defaultAvatar from '../../images/avatar-default.jpeg'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectIsAuthorizationConfirmModalOpen,
  selectIsAuthorizationPreloaderActive,
  selectUserInfo,
} from '../../redux/authorization/authorization.selectors'
import {
  setIsAuth,
  setIsAuthorizationConfirmModalOpen,
  setIsAuthorizationPreloaderActive,
  setUserInfo,
} from '../../redux/authorization/authorization.slice'

function Authorization() {
  const { Title, Text } = Typography
  const dispatch = useDispatch()
  const userInfo = useSelector(selectUserInfo)
  const isAuthorizationPreloaderActive = useSelector(
    selectIsAuthorizationPreloaderActive
  )
  const isAuthorizationConfirmModalOpen = useSelector(
    selectIsAuthorizationConfirmModalOpen
  )

  const navigate = useNavigate()
  const [authForm] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const onCancelModal = () => {
    dispatch(setIsAuthorizationConfirmModalOpen(false))
    authForm.setFieldsValue({
      nickname: '',
    })
  }

  const onConfirmModal = () => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    localStorage.setItem('isAuth', 'true')
    dispatch(setIsAuth(true))
    navigate('/profile')
  }

  const onLogin = ({ nickname, token }) => {
    dispatch(setIsAuthorizationPreloaderActive(true))
    const api = new Api(token)
    localStorage.setItem('faceitToken', token)
    api
      .getUserInfo(nickname)
      .then((data) => {
        dispatch(setUserInfo(data))
        dispatch(setIsAuthorizationPreloaderActive(false))
        dispatch(setIsAuthorizationConfirmModalOpen(true))
      })
      .catch((err) => {
        if (err.status === 404) {
          messageApi.error('Пользователь не найден!')
          dispatch(setIsAuthorizationPreloaderActive(false))
        } else if (err.status === 401) {
          messageApi.error('Токен не верный!')
          localStorage.removeItem('faceitToken')
          dispatch(setIsAuthorizationPreloaderActive(false))
        } else {
          messageApi.error('Что-то пошло не так. Повторите попытку позже')
          dispatch(setIsAuthorizationPreloaderActive(false))
        }
      })
  }

  return (
    <div className='authorization'>
      {contextHolder}
      <Title className='authorization__title'>Авторизация</Title>
      <Form
        form={authForm}
        layout='vertical'
        name='auth-form'
        requiredMark={false}
        onFinish={onLogin}
        className='authorization__form'
        labelCol={{ span: 8 }}
        initialValues={{ remember: true }}>
        <Form.Item
          label='Faceit nickname'
          name='nickname'
          rules={[{ required: true, min: 3, message: 'Введите никнейм!' }]}>
          <Input prefix={<UserOutlined />} onKeyPress={preventInvalidInput} />
        </Form.Item>

        <Form.Item
          label='Api token'
          name='token'
          rules={[
            { required: true, message: 'Введите токен!' },
            { min: 24, max: 48, message: 'Проверьте правильность токена!' },
          ]}>
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item className='authorization__button-container'>
          <Button
            type='primary'
            htmlType='submit'
            loading={!!isAuthorizationPreloaderActive}>
            Авторизация
          </Button>
        </Form.Item>
      </Form>
      <Modal
        open={!!isAuthorizationConfirmModalOpen}
        className='authorization__modal'
        closable={false}
        keyboard={false}
        maskClosable={false}
        okText='Это я'
        cancelText='Это не мой профиль'
        onOk={onConfirmModal}
        onCancel={onCancelModal}>
        <Title level={4} className='authorization__modal-title'>
          Это вы?
        </Title>
        <div className='authorization__modal-container'>
          <Avatar
            src={userInfo?.avatar || defaultAvatar}
            size='large'
            className='authorization__modal-avatar'
          />
          <Text>{userInfo?.nickname}</Text>
          <Avatar
            src={getLevelBadge(userInfo?.games.csgo.skill_level)}
            className='authorization__modal-avatar'
          />
          <Text>{`${userInfo?.games.csgo.faceit_elo} ELO`}</Text>
        </div>
      </Modal>
    </div>
  )
}

export default Authorization
